/************************************************ 
Customized Information Box - Preset Alert
Copyright (c) 2014-2016 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Update: 2016-07-06

Show an alert box.

API:
    $$.info.alert(content, title, hideOnClick, bgColor, callback)
        - content: alert content
        - title: alert title
        - callback: function be called after click OK
************************************************/

(function () {
    "use strict";
    if (window.$$ == null || window.$$.info == null || window.$$.info.preset == null) throw new Error('Relied component missing.');
    var Alert = function (info) {
        var _setuped = false;       // whether this infobox has been setuped

        // setup css, this should only run only
        var setupCss = function () {
            if (_setuped)return;
            _setuped = true;
            info.preset.css(_name, _css);
        };

        var show = function (content, title, hideOnClick, bgColor, callback) {
            setupCss();
            var ele = info.preset.html(_name, _html.replace(/#title#/g, title).replace(/#content#/g, content));
            if (title == null) ele.find(".r-info-title").html("").height(0);
            ele.find(".r-info-ok").click(function (e) {
                info.hide(e);
            });

            // handle max width
            var w = window.innerWidth;
            ele.css('max-width', w - 40 + 'px');
            ele.find('.r-info-innerWrap').css('max-width', w - 60 + 'px');

            info.show(ele, hideOnClick, bgColor, callback);
        };

        // Initialize the whole function
        var init = function () {
            info.alert = show;
        };
        init();

        // data ----------------------------------------------------------------
        var _name = 'r-info-alert';
        var _html = '<div class="r-info-wrap"><div class="r-info-innerWrap"><div class="r-info-title">#title#</div><div class="r-info-content">#content#</div><div class="r-info-line"></div><div class="r-info-ok">OK</div></div></div>';
        var _css = {
            'r-info-wrap': {
                'width': '460px',
                'height': 'auto',
                'background-color': '#f2f2f2',
                'color': '#333',
                'text-align': 'center',
                'font-size': '14px',
                'font-weight': '500',
                'border': '1px solid #fff',
                'font-family': ' Calibri, Helvetica, sans-serif',
                'position': 'relative',
                'top': '0',
                'left': '0'
            },
            'r-info-innerWrap': {
                'width': '440px',
                'height': 'auto',
                'border': '0px',
                'margin': '10px'
            },
            'r-info-title': {
                'width': '100%',
                'height': '40px',
                'line-height': '40px',
                'font-size': '22px',
                'font-weight': '400',
                'color': '#333',
                'letter-spacing': '1px',
                'padding': '12px 0',
                'margin': '0px',
                'margin-left': '-1px'
            },
            'r-info-content': {
                'margin': '0px auto',
                'margin-bottom': '25px',
                'width': '90%',
                'height': 'auto',
                'line-height': '20px'
            },
            'r-info-line': {
                'margin': '0px auto',
                'margin-bottom': '8px',
                'width': '75%',
                'height': '1px',
                'line-height': '1px',
                'background-color': '#ccc'
            },
            'r-info-ok': {
                'margin': '0px auto',
                'margin-bottom': '13px',
                'width': '120px',
                'height': '32px',
                'line-height': '32px',
                'font-size': '20px',
                'font-weight': '300',
                'letter-spacing': '4px',
                'color': '#666',
                'cursor': 'pointer'
            },
            'r-info-ok:hover': {
                'color': '#111'
            }
        };
    };
    var alert = new Alert(window.$$.info);
})();