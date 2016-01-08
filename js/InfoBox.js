/************************************************ 
Customized Information Box
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.6.4
Update: 2016-01-08

Description:
    Enable user to show their customized HTML elements in the center of screen.
        - A screen cover will be created to block mouse event to the original page.
        - Clicking outside the body of the info-box will close the info-box. This feature can be disabled manually.

    CSS3 is used. 
    
Compatibility:
    Fully support Chrome; Fire Fox; Safari; Edge; IE 10-11; IE9;
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
************************************************/

(function () {
    "use strict";
    var InfoBox = function ($$) {
        var that = this,
            _onHide = null,         // callback fired after hide this info box
            _focusEle = null,       // the element focus before showing info box. This is used to recover focus.
            _html = {},             // html elements 

            // flag
            _isSetuped = false,      // whether the info box html has setuped
            _isShown = false,        // whether the info box is shown or not
            _transitionEnd = true;   // css3 transition end callback name, null means not available

        // -------------------------------------------------------------------------------------------------------------

        // Show information-box
        var show = function (content, hideOnClick, bgColor, onHide) {
            htmlSetup();

            // callback hide
            _onHide = onHide;

            // handle the focus element
            _focusEle = $(document.activeElement);

            // reset basic element
            _html["container"].html("");
            animateSetup();

            // Set background
            if (bgColor == null) {
                _html["bg"].css("background-color", "rgba(0,0,0,0)");
            } else {
                _html["bg"].css("background-color", bgColor);
            }

            // handle main content and make it vertical center
            _html["content"] = content;
            _html["container"].css('height', '100%');
            content.appendTo(_html["container"]);
            content.css('margin', '0 auto');
            _html["container"].css('height', 'auto');
            var h = _html["container"].height();
            _html["container"].height(h);
            _html["container"].css("margin-top", "-" + (h / 2) + "px");

            // stop propagation when click on the box
            content.click(function (e) {
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });

            // Bind/Unbind mouse event on background
            _html["wrap"].unbind("click");
            if (hideOnClick) _html["wrap"].click(hide);

            // show the box
            _isShown = true;
            animateShow()

            _html["wrap"].focus();
        };

        // Hide information-box
        var hide = function () {
            if (!_isShown) return;
            _isShown = false;            
            _html["wrap"].unbind("click"); // unbind function            
            animateHide(); // hide the box
            if (_focusEle) _focusEle.focus(); // handle the focus element
            _focusEle = null;

            if (_onHide != null) setTimeout(_onHide, 1); // callback hide
        };

        // html animate handle --------------------------------------------------
        // setup css for showing
        var animateSetup = function () {
            if (_transitionEnd!=null) {
                _html["wrap"][0].removeEventListener(_transitionEnd, hideWrap, false);
                _html["wrap"].css({
                    'display': 'block',
                    'opacity': 0,
                    '-moz-transition': '0',
                    '-o-transition': '0',
                    '-webkit-transition': '0',
                    'transition': '0'
                });
            } else {
                _html["wrap"].css({
                    'display': 'block',
                    'visibility': 'hidden'
                });
            }
        };

        // show the info-box
        var animateShow = function () {
            if (_transitionEnd!=null) {
                _html["wrap"].css({
                    'opacity': 1,
                    '-moz-transition': '0.2s',
                    '-o-transition': '0.2s',
                    '-webkit-transition': '0.2s',
                    'transition': '0.2s'
                });
            } else {
                _html["wrap"].css({
                    'visibility': 'visible',
                    'display': 'none'
                }).fadeIn(200);
            }
        };

        // hide the info-box
        var animateHide = function () {
            if (_transitionEnd!=null) {
                _html["wrap"].css({
                    "opacity": 0,
                    '-moz-transition': '0.2s',
                    '-o-transition': '0.2s',
                    '-webkit-transition': '0.2s',
                    'transition': '0.2s'
                });
                _html["wrap"][0].addEventListener(_transitionEnd, hideWrap, false);
            } else {
                _html["wrap"].fadeOut(200);
            }
        };

        var hideWrap = function () {
            if (!_isShown) _html["wrap"].css({
                "display": "none"
            });
        };

        // Add Basic elements into Dom-tree
        // this should only run once
        var htmlSetup = function () {
            if (_isSetuped) return;
            _isSetuped = true;

            // Setup elements of information box
            _html["wrap"] = $('<div tabindex="-1" class="r-info" style="width:100%; height:100%; display:none; position:fixed; left:0px; top:0px; z-index:99990; margin:0px; padding:0px; border:0px; outline: none!important; outline-width: 0!important;"></div>').appendTo($("body"));
            _html["container"] = $('<div style="position:fixed; left:0px; top:50%; z-index:2; width:100%; height:100%;"></div>').appendTo(_html["wrap"]);
            _html["bg"] = $('<div style="position:fixed; left:0px; top:0px; z-index:1; width:100%; height:100%;"></div>').appendTo(_html["wrap"]);

            // check transition end callback, null means transition not available
            _transitionEnd = (function () {
                var el = document.createElement('div');
                var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd otransitionend',
                    'transition': 'transitionend'
                };

                for (var name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name];
                    }
                }

                return null;
            })();
        };

        // Initialize 
        var init = function () {
            $$.info = function (content, hideOnClick, bgColor, onHide) {
                show(content, hideOnClick, bgColor, onHide);
            };
            $$.info.hide = hide;
            $$.info.show = show;
        };
        init();
    };
    var infobox = new InfoBox(window.$$ = window.$$ || {});
})();
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
/************************************************ 
Customized Information Box - Preset Alert
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Update: 2016-01-08

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
/************************************************ 
Customized Information Box - Preset Input
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Update: 2016-01-08

Show a window with an input field.

API:
    $$.info.input(inputPara, title, hideOnClick, bgColor, callback)
        - inputPara: parameters to define input
            + type: text / password / ... (avilable type for input dom element)
            + maxlength : max length of the input
            + instruction: instruction shows below the input box
            + errorMsg: A function be called right after confirming input. Be used to produce error message when the input is illegal.
                        Return null indicates no error occur. Otherwise a string of error message will be returned, this message will be shown below the input box.
                        The input will not complele if an error is occur.
        - callback: function be called after input completes
************************************************/

(function () {
    "use strict";
    if (window.$$ == null || window.$$.info == null || window.$$.info.preset == null) throw new Error('Relied component missing.');
    var Input = function (info) {
        var _setuped = false;       // whether this infobox has been setuped

        // setup css, this should only run only
        var setupCss = function () {
            if (_setuped) return;
            _setuped = true;
            info.preset.css(_name, _css);
        };

        var show = function (inputPara, title, hideOnClick, bgColor, callback) {
            setupCss();
            // init paramenters
            var inputType = 'text',
                maxlength = null,
                instruction = null,
                errorMsg = null;

            if (inputPara!=null){
                if (inputPara.type) inputType = inputPara.type;
                if (inputPara.maxlength) maxlength = inputPara.maxlength;
                if (inputPara.instruction) instruction = inputPara.instruction;
                if (inputPara.errorMsg) errorMsg = inputPara.errorMsg;
            }

            // build html
            var ele = info.preset.html(_name, _html.replace(/#title#/g, title).replace(/#instruction#/g, instruction)),
                input = ele.find("input"),
                err = ele.find(".r-info-error");

            if (title == null) ele.find(".r-info-title").html("").height(0);
            if (instruction == null) ele.find(".r-info-instruction").html("").css('margin-top', 0);

            input.attr('type', inputType || 'text');
            if (maxlength) input.attr('maxlength', maxlength);

            // confirm function
            var confirm = function (e) {
                var v = input.val();
                if (errorMsg != null) {
                    var errMsg = errorMsg(v);
                    if (errMsg != null) {
                        err.html(errMsg).css('margin-top', '5px');
                        return;
                    }
                }

                info.hide(e);
                if (callback != null) setTimeout(function () { callback(v); },1);
            };

            // bind callback function
            input.keyup(function (e) {
                if (e.keyCode == 13) {
                    confirm();
                }
            });
            ele.find(".r-info-btn-yes").click(function (e) {
                confirm();
            });
            ele.find(".r-info-btn-no").click(function (e) {
                info.hide(e);
            });

            info.show(ele, hideOnClick, bgColor, null);
        };

        // Initialize the whole function
        var init = function () {
            info.input = show;
        };
        init();

        // data ----------------------------------------------------------------
        var _name = 'r-info-input';
        var _html = '<div class="r-info-wrap"><div class="r-info-innerWrap"><div class="r-info-title">#title#</div><div class="r-info-content"><input  /><div class="r-info-instruction">#instruction#</div><div class="r-info-error"></div></div><div class="r-info-line"></div><div class="r-info-btn r-info-btn-yes">YES</div><div class="r-info-btn r-info-btn-no">NO</div></div></div>';
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

            'r-info-content input': {
                'display': 'block',
                'outline': 'none',
                'resize': 'none',
                'text-align': 'center!important',
                'padding': '8px 10px',
                'background-color': '#fff',
                'border': '1px solid #ccc',
                'margin': '0 auto',
                'width':  '90%'
            },
            '::-webkit-input-placeholder': {
                'text-align': 'center'
            },
            ':-moz-placeholder': {
                'text-align': 'center'
            },
            '::-moz-placeholder': {
                'text-align': 'center'
            },
            ':-ms-input-placeholder': {
                'text-align': 'center'
            },

            'r-info-instruction': {
                'margin': '0px auto',
                'margin-top': '10px',
                'width': '90%',
                'height': 'auto',
                'line-height': '20px',
                'color': '#777'
            },
            'r-info-error': {
                'margin': '0px auto',
                'width': '340px',
                'height': 'auto',
                'line-height': '20px',
                'color': '#600',
                '-moz-transition': '0.2s',
                '-o-transition': '0.2s',
                '-webkit-transition': '0.2s',
                'transition': '0.2s'
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
    var input = new Input(window.$$.info);
})();
//# sourceMappingURL=InfoBox.js.map
