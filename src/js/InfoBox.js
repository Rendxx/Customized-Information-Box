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