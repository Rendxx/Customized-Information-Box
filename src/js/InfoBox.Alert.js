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
    var Alert = function (info) {
        // create $ element
        var create = function () {

        };


        var show = function (content, title, hideOnClick, bgColor, callback) {
            var that = this;
            var ele = that.buildEle(that.html.replace(/#title#/g, title).replace(/#content#/g, content));
            ele.find(".r-info-ok").click(function (e) {
                that.hide(e);
            });

            info.show(ele, hideOnClick, bgColor, callback);

        };
        var hide = function () {

        };

        // Initialize the whole function
        var init = function () {
            info.alert = function (content, hideOnClick, bgColor, onHide) {
                show(content, hideOnClick, bgColor, onHide);
            };
            info.alert.hide = hide;
            info.alert.show = show;
        };
        init();
    };
    if (window.$$ == null || window.$$.info == null) throw new Error('Relied component missing.');
    var alert = new Alert(window.$$.info);


    // Add your template 
    PresetData = {
        alert: {
            html: "<div class='r-info-wrap'><div class='r-info-innerWrap'><div class='r-info-title'>#title#</div><div class='r-info-content'>#content#</div><div class='r-info-ok'>OK</div></div></div>",
            css: {
                'r-info-wrap': {
                    'width': '400px',
                    'height': 'auto',
                    'background-color': '#eee',
                    'color': '#333',
                    'text-align': 'center',
                    'font-size': '13px',
                    'font-weight': 500,
                    'border': '1px solid #fff',
                    'font-family': 'Arial, Helvetica, sans-serif',
                    'position': 'relative',
                    'top': '0',
                    'left': '0'
                },
                'r-info-innerWrap': {
                    'width': '380px',
                    'height': 'auto',
                    'border': '0px',
                    'margin': '10px'
                },
                'r-info-title': {
                    'width': '100%',
                    'height': '40px',
                    'line-height': '40px',
                    'font-size': '18px',
                    'font-weight': '700',
                    'margin': '0px'
                },
                'r-info-content': {
                    'margin': '0px',
                    'margin-top': '10px',
                    'width': '100%',
                    'height': 'auto',
                    'line-height': '20px'
                },
                'r-info-ok': {
                    'margin': '0px auto',
                    'margin-top': '20px',
                    'margin-bottom': '5px',
                    'width': '120px',
                    'height': '32px',
                    'line-height': '32px',
                    'font-size': '14px',
                    'font-weight': '700',
                    'color': '#eee',
                    'background-color': '#333',
                    'cursor': 'pointer'
                },
                'r-info-ok:hover': {
                    'background-color': '#515151'
                }
            },
            // (string)content, (string)title, (bool)hideOnClick, (string in "rgba(#,#,#,#)")bgColor, (function)callback
            create: function (content, title, hideOnClick, bgColor, callback) {
                var that = this;
                var ele = that.buildEle(that.html.replace(/#title#/g, title).replace(/#content#/g, content));
                ele.find(".r-info-ok").click(function (e) {
                    that.hide(e);
                });

                that.show(ele, hideOnClick, bgColor, callback);
            }
        },
        alert2: {
            html: "<div class='r-info-wrap'><div class='r-info-innerWrap'><div class='r-info-title'>#title#</div><div class='r-info-content'>#content#</div><div class='r-info-line'></div><div class='r-info-ok'>OK</div></div></div>",
            css: {
                'r-info-wrap': {
                    'width': '460px',
                    'height': 'auto',
                    'background-color': '#f2f2f2',
                    'color': '#333',
                    'text-align': 'center',
                    'font-size': '13px',
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
                    'font-size': '21px',
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
            },
            // (string)content, (string)title, (bool)hideOnClick, (string in "rgba(#,#,#,#)")bgColor, (function)callback
            create: function (content, title, hideOnClick, bgColor, callback) {
                var that = this;
                var ele = that.buildEle(that.html.replace(/#title#/g, title).replace(/#content#/g, content));
                ele.find(".r-info-ok").click(function (e) {
                    that.hide(e);
                });

                that.show(ele, hideOnClick, bgColor, callback);
            }
        },
        check: {
            html: "<div class='r-info-wrap'><div class='r-info-innerWrap'><div class='r-info-title'>#title#</div><div class='r-info-content'>#content#</div><div class='r-info-yes'>YES</div><div class='r-info-no'>NO</div></div></div>",
            css: {
                'r-info-wrap': {
                    'width': '400px',
                    'height': 'auto',
                    'background-color': '#eee',
                    'color': '#333',
                    'text-align': 'center',
                    'font-size': '13px',
                    'font-weight': '500',
                    'border': '1px solid #fff',
                    'font-family': ' Arial, Helvetica, sans-serif',
                    'position': 'relative',
                    'top': '0',
                    'left': '0'
                },
                'r-info-innerWrap': {
                    'width': '380px',
                    'height': 'auto',
                    'border': '0px',
                    'margin': '10px'
                },
                'r-info-title': {
                    'width': '100%',
                    'height': '40px',
                    'line-height': '40px',
                    'font-size': '18px',
                    'font-weight': '700',
                    'margin': '0px'
                },
                'r-info-content': {
                    'margin': '0px',
                    'margin-top': '10px',
                    'margin-bottom': '70px',
                    'width': '100%',
                    'height': 'auto',
                    'line-height': '20px'
                },
                'r-info-yes': {
                    'position': 'absolute',
                    'bottom': '12px',
                    'left': '60px',
                    'margin': '0px',
                    'width': '120px',
                    'height': '32px',
                    'line-height': '32px',
                    'font-size': '14px',
                    'font-weight': '700',
                    'color': '#eee',
                    'background-color': '#333',
                    'cursor': 'pointer'
                },
                'r-info-yes:hover': {
                    'background-color': '#34502E'
                },
                'r-info-no': {
                    'position': 'absolute',
                    'bottom': '12px',
                    'right': '60px',
                    'margin': '0px',
                    'width': '120px',
                    'height': '32px',
                    'line-height': '32px',
                    'font-size': '14px',
                    'font-weight': '700',
                    'color': '#eee',
                    'background-color': '#333',
                    'cursor': 'pointer'
                },
                'r-info-no:hover': {
                    'background-color': '#3D1111'
                }
            },
            // (string)content, (string)title, (bool)hideOnClick, (string in "rgba(#,#,#,#)")bgColor, (function)callback
            create: function (content, title, hideOnClick, bgColor, callbackYes, callbackNo) {
                var that = this;
                var preventCallback = false;
                var ele = that.buildEle(that.html.replace(/#title#/g, title).replace(/#content#/g, content));
                ele.find(".r-info-yes").click(function (e) {
                    preventCallback = true;
                    that.hide(e);
                    if (callbackYes != null) callbackYes();
                });
                ele.find(".r-info-no").click(function (e) {
                    preventCallback = true;
                    that.hide(e);
                    if (callbackNo != null) callbackNo();
                });

                that.show(ele, hideOnClick, bgColor, function () {
                    if (preventCallback) return;
                    if (callbackNo != null) callbackNo();
                });
            }
        },
        check2: {
            html: "<div class='r-info-wrap'><div class='r-info-innerWrap'><div class='r-info-title'>#title#</div><div class='r-info-content'>#content#</div><div class='r-info-line'></div><div class='r-info-btn r-info-btn-yes'>YES</div><div class='r-info-btn r-info-btn-no'>NO</div></div></div>",
            css: {
                'r-info-wrap': {
                    'width': '460px',
                    'height': 'auto',
                    'background-color': '#f2f2f2',
                    'color': '#333',
                    'text-align': 'center',
                    'font-size': '13px',
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
                    'font-size': '21px',
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
            },
            // (string)content, (string)title, (bool)hideOnClick, (string in "rgba(#,#,#,#)")bgColor, (function)callback
            create: function (content, title, hideOnClick, bgColor, callbackYes, callbackNo) {
                var that = this;
                var preventCallback = false;
                var ele = that.buildEle(that.html.replace(/#title#/g, title).replace(/#content#/g, content));
                ele.find(".r-info-btn-yes").click(function (e) {
                    preventCallback = true;
                    that.hide(e);
                    if (callbackYes != null) callbackYes();
                });
                ele.find(".r-info-btn-no").click(function (e) {
                    preventCallback = true;
                    that.hide(e);
                    if (callbackNo != null) callbackNo();
                });

                that.show(ele, hideOnClick, bgColor, function () {
                    if (preventCallback) return;
                    if (callbackNo != null) callbackNo();
                });
            }
        }
    };
    InfoBox();
})();