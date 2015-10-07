﻿/// <binding BeforeBuild='_build' ProjectOpened='_watch' />
var gulp = require('gulp'),
    fs = require("fs"),
    path = require('path'),
    del = require("del"),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    lzmajs = require('gulp-lzmajs');

// configuration --------------------------------------------------
var project = {
    webroot: '.'
};

var paths = {
    // less
    less: {
        src: 'src/less',
        dest: project.webroot + '/css/'
    },

    // js
    js: {
        src: 'src/js',
        dest: project.webroot + '/js/',
    },

    // test
    test: {
        src: 'test',
        dest: project.webroot + '/js/',
    },

    // bower
    bower: {
        src: 'bower_components',
        dest: project.webroot + '/lib/'
    }
};

eval("var filePaths = " + String(fs.readFileSync("./bundle.json"))
    .replace(/#bower#/g, paths.bower.src)
    .replace(/#less#/g, paths.less.src)
    .replace(/#js#/g, paths.js.src));

// task --------------------------------------------------
// copy lib from bower to www-root
gulp.task("_copyBower", ['_cleanLib'], function (cb) { 
    // bower
    var filePath = filePaths.bower;
    for (var destinationDir in filePath) {
        gulp.src(filePath[destinationDir])
          .pipe(gulp.dest(paths.bower.dest));
    }
});

// watch modifying of less files
gulp.task('_watch', function () {
    watch(paths.less.src + "/**/*.less", function () {
        gulp.start('less');
    });
    watch(paths.js.src + "/**/*.js", function () {
        gulp.start('js');
    });
    watch(paths.test.src + "/**/*.less", function () {
        gulp.start('test-less');
    });
    watch(paths.test.src + "/**/*.js", function () {
        gulp.start('test-js');
    });
});

// Clean task
gulp.task('_cleanLib', function (cb) {
    del([paths.bower.dest], cb);
    cb(null);
});


var processJs = function (filePath) {
    for (var destFile in filePath) {
        gulp.src(filePath[destFile])
            .pipe(plumber())
            .pipe(concat(destFile + '.js'))
            .pipe(gulp.dest(paths.js.dest))
    }
    for (var destFile in filePath) {
        gulp.src(filePath[destFile])
            .pipe(plumber())
            .pipe(concat(destFile + '.min.js'))
            .pipe(uglify())
            .pipe(lzmajs())
            .pipe(gulp.dest(paths.js.dest));
    }
};

var processLess = function (filePath) {
    for (var destFile in filePath) {
        gulp.src(filePath[destFile])
            .pipe(plumber())
            .pipe(less())
            .pipe(concat(destFile + '.css'))
            .pipe(gulp.dest(paths.less.dest));
    }
};

// .............................. Handle style file
// transfrom less to css file
// combine multiple files
gulp.task('less', function () {
    processLess(filePaths.less);
});
// .............................. Handle js file
// combine & minimize js file
gulp.task('js', function () {
    processJs(filePaths.js);
});

// test
// .............................. Handle style file
// transfrom less to css file
// combine multiple files
gulp.task('test_less', function () {
    processLess(filePaths["test-less"]);
});

// .............................. Handle js file
// combine & minimize js file
gulp.task('test-js', function () {
    processJs(filePaths["test-js"]);
});