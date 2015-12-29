(function () {
    "use strict";
    if (window.$$ == null || window.$$.info == null) throw new Error('Relied component missing.');
    var Preset = function (info) {
        // setup css
        var css = function (name, cssObj) {
            var style = document.createElement('style');
            var text = "";
            style.type = 'text/css';

            // Add css in setup data
            for (var j in cssObj) {
                text += ".r-info ." + name + " ." + j + ", .r-info ." + name + "." + j + "{";
                for (var k in cssObj[j])
                    text += k + ":" + cssObj[j][k] + ";";
                text += "}";
            }

            if (style.styleSheet) style.styleSheet.cssText = text;  // ie 7-8
            else style.innerHTML = text;                            // Others
            document.getElementsByTagName('head')[0].appendChild(style);
        };

        // create $ content
        var html = function (name, htmlStr) {
            return $(htmlStr).addClass(name);
        };

        // Initialize 
        var init = function () {
            var preset = {
                css: css,
                html: html
            };

            info.preset = preset;
        };
        init();
    };
    var preset = new Preset(window.$$.info);
})();