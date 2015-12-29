/************************************************ 
Customized Information Box - Preset Function
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Update: 2015-12-28

Define functions used in preset.

API:
    $$.info.preset.css (name, cssObj)
        - name: preset name
        - cssObj: css object

    $$.info.preset.html (name, htmlStr)
        - name: preset name
        - htmlStr: html format string
************************************************/

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