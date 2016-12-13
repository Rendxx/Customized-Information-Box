/************************************************
Customized Information Box
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.6.5
Update: 2016-07-06

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

require('LESS/InfoBox.less');
var Basic = require('JS/InfoBox.Basic.js');
var Alert = require('JS/InfoBox.Alert.js');
var Check = require('JS/InfoBox.Check.js');
var Input = require('JS/InfoBox.Input.js');
var Style = require('JS/Style.js');

var InfoBox = function(PACKAGE) {
    var outside = null;
    var container = null;
    var bg = null;

    var currentBox = null;
    var bgClickListener = null;
    var containerListener = null;

    // callback --------------------------------------------------------------------------------
    var show = function() {
        outside.style.visibility = 'visible';
        bg.style.opacity = 1;
        currentBox && currentBox.show();
    };

    var hide = function() {
        bg.style.opacity = 0;
        outside.style.visibility = 'hidden';
    };

    // private -------------------------------------------------------------------------------
    var setBg = function(bgVal) {
        bg.style.background = bgVal;
    };

    var setHideOnClick = function(hideOnClick) {
        if (bgClickListener != null) bg.removeEventListener('click', bgClickListener);
        if (hideOnClick===true) {
            bgClickListener = function(e) {
                currentBox.hide();
            };
            bg.addEventListener('click', bgClickListener, false);
        } else {
            bgClickListener = null;
        }
    };

    var createAnimationStyle = function(css) {
        var css = css || {};
        css.before = css.before || 'fade';
        css.show = css.show || 'none';
        css.hide = css.hide || 'fade';
        css.inner = css.inner || 'none';

        var style = {
            before: {},
            show: {},
            hide: {},
            inner: {}
        };

        // before
        var cssPkg = {};
        if (typeof(css.before) === "string") {
            if (Style.hasOwnProperty(css.before))
                cssPkg = Style[css.before];
        } else {
            cssPkg = css.before;
        }
        for (var i in cssPkg) style.before[i] = cssPkg[i];

        // show
        cssPkg = {};
        if (typeof(css.show) === "string") {
            if (Style.hasOwnProperty(css.show))
                cssPkg = Style[css.show];
        } else {
            cssPkg = css.show;
        }
        for (var i in cssPkg) style.show[i] = cssPkg[i];

        // hide
        cssPkg = {};
        if (typeof(css.hide) === "string") {
            if (Style.hasOwnProperty(css.hide))
                cssPkg = Style[css.hide];
        } else {
            cssPkg = css.hide;
        }
        for (var i in cssPkg) style.hide[i] = cssPkg[i];

        // inner
        cssPkg = {};
        if (typeof(css.hide) === "string") {
            if (Style.hasOwnProperty(css.inner))
                cssPkg = Style[css.inner];
        } else {
            cssPkg = css.inner;
        }
        for (var i in cssPkg) style.inner[i] = cssPkg[i];

        return style;
    };

    var setupInfoBox = function (hideOnClick, bg){
        setupHtml();
        if (currentBox != null) currentBox.remove();
        container.focus();
        setHideOnClick(hideOnClick);
        setBg(bg);
    };

    // setup --------------------------------------------------------------------------------
    var setupFunc = function() {
        PACKAGE.info = function (opts){
            var content = opts.content,
                hideOnClick = opts.hideOnClick,
                bgVal = opts.bg,
                style = opts.style,
                onHide = opts.onHide;
            setupInfoBox(hideOnClick, bgVal);
            currentBox = new Basic(
                container,
                createAnimationStyle(style),
                {
                  content: content
                },
                function (){
                    hide();
                    onHide && onHide();
                });
            show();
        };
        PACKAGE.info.show = PACKAGE.info;
        PACKAGE.info.hide = function(){if (currentBox != null) currentBox.hide();};
        PACKAGE.info.alert = function (opts) {
            var content = opts.content,
                title = opts.title,
                callback = opts.callback,
                hideOnClick = opts.hideOnClick,
                bgVal = opts.bg,
                style = opts.style,
                onHide = opts.onHide;
            setupInfoBox(hideOnClick, bgVal);
            currentBox = new Alert(
                container,
                createAnimationStyle(style),
                {
                  title: title,
                  content: content,
                  callback: callback
                },
                function (){
                    hide();
                    onHide && onHide();
                });
            show();
        };
        PACKAGE.info.check = function(opts) {
            var content = opts.content,
                title = opts.title,
                callbackYes = opts.callbackYes,
                callbackNo = opts.callbackNo,
                hideOnClick = opts.hideOnClick,
                bgVal = opts.bg,
                style = opts.style,
                onHide = opts.onHide;
            setupInfoBox(hideOnClick, bgVal);
            currentBox = new Check(
                container,
                createAnimationStyle(style),
                {
                  title: title,
                  content: content,
                  callbackYes: callbackYes,
                  callbackNo: callbackNo
                },
                function (){
                    hide();
                    onHide && onHide();
                });
            show();
        };
        PACKAGE.info.input = function(opts) {
            var para = opts.para,
                title = opts.title,
                callback = opts.callback,
                hideOnClick = opts.hideOnClick,
                bgVal = opts.bg,
                style = opts.style,
                onHide = opts.onHide;
            setupInfoBox(hideOnClick, bgVal);
            currentBox = new Input(
                container,
                createAnimationStyle(style),
                {
                  para: para,
                  callback: callback
                },
                hide);
            show();
        };
    };

    var setupHtml = function() {
        if (outside!=null) return;
        outside = document.createElement("DIV");
        outside.className = '__r-info';
        outside.setAttribute('tabindex', -1);
        document.body.appendChild(outside);

        container = document.createElement("DIV");
        container.className = '_container';
        outside.appendChild(container);

        bg = document.createElement("DIV");
        bg.className = '_bg';
        outside.appendChild(bg);

        outside.addEventListener('click', function(e) {
            if (e.stopPropagation)
                e.stopPropagation();
            else
                e.cancelBubble = true;
            e.preventDefault();
            return false;
        }, false);
    };

    // Initialize
    var init = function() {
        setupFunc();
    };
    init();
};

window.$$ = window.$$ || {};
var infoBox = new InfoBox(window.$$);
