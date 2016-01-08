/************************************************ 
Customized Information Box - Preset Check
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Update: 2016-01-08

Show a check box

API:
    $$.info.check(content, title, hideOnClick, bgColor, callbackYes, callbackNo)
        - callbackYes: function be called after click YES
        - callbackNo: function be called after click NO
************************************************/

(function () {
    "use strict";
    if (window.$$ == null || window.$$.info == null || window.$$.info.preset == null) throw new Error('Relied component missing.');
    var Check = function (info) {
        var _setuped = false;       // whether this infobox has been setuped

        // setup css, this should only run only
        var setupCss = function () {
            if (_setuped) return;
            _setuped = true;
            info.preset.css(_name, _css);
        };

        var show = function (content, title, hideOnClick, bgColor, callbackYes, callbackNo) {
            setupCss();
            var preventCallback = false;
            var ele = info.preset.html(_name, _html.replace(/#title#/g, title).replace(/#content#/g, content));
            if (title == null) ele.find(".r-info-title").html("").height(0);
            ele.find(".r-info-btn-yes").click(function (e) {
                preventCallback = true;
                info.hide(e);
                if (callbackYes != null) callbackYes();
            });
            ele.find(".r-info-btn-no").click(function (e) {
                preventCallback = true;
                info.hide(e);
                if (callbackNo != null) callbackNo();
            });

            info.show(ele, hideOnClick, bgColor, function () {
                if (preventCallback) return;
                if (callbackNo != null) callbackNo();
            });
        };

        // Initialize the whole function
        var init = function () {
            info.check = show;
        };
        init();

        // data ----------------------------------------------------------------
        var _name = 'r-info-check';
        var _html = '<div class="r-info-wrap"><div class="r-info-innerWrap"><div class="r-info-title">#title#</div><div class="r-info-content">#content#</div><div class="r-info-line"></div><div class="r-info-btn r-info-btn-yes">YES</div><div class="r-info-btn r-info-btn-no">NO</div></div></div>';
        var _css= {
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
                'margin-bottom': '53px',
                'width': '75%',
                'height': '1px',
                'line-height': '1px',
                'background-color': '#ccc'
            },
            'r-info-btn': {
                'position': 'absolute',
                'bottom': '13px',
                'margin': '0px',
                'width': '100px',
                'height': '32px',
                'line-height': '32px',
                'font-size': '20px',
                'font-weight': '300',
                'letter-spacing': '4px',
                'color': '#666',
                'cursor': 'pointer'
            },
            'r-info-btn:hover': {
                'color': '#111'
            },
            'r-info-btn-yes': {
                'left': '80px'
            },
            'r-info-btn-no': {
                'right': '80px'
            }
        };
    };
    var check = new Check(window.$$.info);
})();