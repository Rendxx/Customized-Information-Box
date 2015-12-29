/************************************************ 
Customized Information Box
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.6.0
Update: 2015-12-04

Description:
    Enable user to show their customized HTML elements in the center of screen.
        - A screen cover will be created to block mouse event to the original page.
        - Clicking outside the body of the info-box will close the info-box. This feature can be disabled manually.

    CSS3 is used. 
    
Compatibility:
    Fully support Chrome; Fire Fox; Safari; Edge; IE 10-11; 
    Half support: IE9
    Limit support: IE 7,8;
 
Dependency:
    jQuery

API:
    $$.info(ele, hideOnClick, bgColor, onHide)
    $$.info.show(ele, hideOnClick, bgColor, onHide)
        - ele: info-window jQuery element
        - hideOnClick: close when click on the background if true
        - bgColor: background color in (rr,gg,bb,aa)
        - onHide: callback function when info-window hide
            
    $$.info.hide()
        close the info box if it is shown

    $$.info.alert(content, title, hideOnClick, bgColor, callback)
        - content: alert content
        - title: alert title
        - callback: function be called after click OK

    $$.info.check(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 
        - callbackYes: function be called after click YES
        - callbackNo: function be called after click NO
        
    $$.info.alert2(content, title, hideOnClick, bgColor, callback)
        - Breif Line style

    $$.info.check2(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 
        - Breif Line style

Preset API:
    These API are only used in preset infobox.

    this.loaded
        - boolean indicate whether the preset has been loaded or not

    this.cssClass
        - css class name of the preset
        - this name is automatically created by the name of the preset

    this.css
        - css object of the preset
        - the structure follow the rules almost as same as the css object in $, expect you can set a hover style with "[class name]:hover"

    this.html
        - html string

    this.buildEle (htmlStr) 
        - create the $ element used to build the infobox
        - the parameter [htmlStr] should contain all content needed
        - It is highly suggested to create the $ element with it. Otherwise you have to deal with all the pre-work by yourself.

    this.show (ele, hideOnClick, bgColor, onHide)
        - as same as the $$.info.show function
    this.hide (e)
        - hide the info box 
        - e is the event argument passed into a click function, pass it into the hide function as well



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

            info.show(ele, hideOnClick, bgColor, callback);
        };

        var hide = function () {
            info.hide();
        };

        // Initialize the whole function
        var init = function () {
            var alert = function (content, title, hideOnClick, bgColor, callback) {
                show(content, title, hideOnClick, bgColor, callback);
            };
            alert.show = show;
            alert.hide = hide;
            info.alert = alert;
        };
        init();

        // data ----------------------------------------------------------------
        var _name = 'r-info-alert';
        var _html = '<div class="r-info-wrap"><div class="r-info-innerWrap"><div class="r-info-title">#title#</div><div class="r-info-content">#content#</div><div class="r-info-ok">OK</div></div></div>';
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
                'margin': '0px',
                'color': '#333',
                'letter-spacing': '2px',
                'padding': '12px 0',
                'margin': '0',
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