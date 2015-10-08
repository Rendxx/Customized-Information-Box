/// <binding BeforeBuild='_build' ProjectOpened='_watch' />
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

eval("var pathData = " + String(fs.readFileSync("./bundle.json")));

var filePath = {};
var paths = {};
var reg = {};
for (var pathName in pathData.path) {
    reg[pathName] = new RegExp('#' + pathName + '#', 'g');
}
var replacePath = function (data) {
    for (var pathName in reg) {
        data = data.replace(reg[pathName], pathData.path[pathName]);
    }
    return data;
};

for (var bundleGroup in pathData.bundle) {
    filePath[bundleGroup] = {};
    paths[bundleGroup] = {};
    for (var bundleName in pathData.bundle[bundleGroup]) {
        if (typeof pathData.bundle[bundleGroup][bundleName] == 'string') {
            pathData.bundle[bundleGroup][bundleName] = project.webroot + replacePath(pathData.bundle[bundleGroup][bundleName]);
        } else {
            for (var i = 0, l = pathData.bundle[bundleGroup][bundleName].length; i < l; i++) {
                pathData.bundle[bundleGroup][bundleName][i] = project.webroot + replacePath(pathData.bundle[bundleGroup][bundleName][i]);
            }
        }

        var idx = bundleName.lastIndexOf('/');
        var bundleName_dest = '/';
        var bundleName_file = bundleName;
        if (idx < 0) {
            bundleName_dest = '/';
            bundleName_file = bundleName;
        } else {
            bundleName_dest = bundleName.substring(0, idx + 1);
            bundleName_file = bundleName.substring(idx + 1);
        }

        bundleName_dest = project.webroot + replacePath(bundleName_dest);
        if (!(bundleName_dest in filePath[bundleGroup])) filePath[bundleGroup][bundleName_dest] = {};
        filePath[bundleGroup][bundleName_dest][bundleName_file] = pathData.bundle[bundleGroup][bundleName];
    }
}


// task --------------------------------------------------
// copy lib from bower to www-root
gulp.task("_copyBower", ['_cleanLib'], function (cb) { 
    // bower
    var f = filePath.bower;
    for (var dest in f) {
        for (var pkg in f[dest]) {
            gulp.src(f[dest][pkg])
              .pipe(gulp.dest(dest));
        }
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
});

// Clean task
gulp.task('_cleanLib', function (cb) {
    del([paths.bower.dest], cb);
    cb(null);
});


var processJs = function (f) {
    for (var dest in f) {
        for (var bundle in f[dest]) {
            gulp.src(f[dest][bundle])
                .pipe(plumber())
                .pipe(concat(bundle + '.js'))
                .pipe(gulp.dest(dest))

                .pipe(concat(bundle + '.min.js'))
                .pipe(uglify())
                .pipe(lzmajs())
                .pipe(gulp.dest(dest));
        }
    }
};

var processLess = function (f, dest) {
    for (var dest in f) {
        for (var bundle in f[dest]) {
            gulp.src(f[dest][bundle])
                .pipe(plumber())
                .pipe(less())
                .pipe(concat(bundle + '.css'))
                .pipe(gulp.dest(dest));
        }
    }
};

// .............................. Handle style file
// transfrom less to css file
// combine multiple files
gulp.task('less', function () {
    processLess(filePath.less, paths.less.dest);
    processLess(filePath["test-less"], paths.test.dest);
});
// .............................. Handle js file
// combine & minimize js file
gulp.task('js', function () {
    processJs(filePath.js, paths.js.dest);
    processJs(filePath["test-js"], paths.test.dest);
});
