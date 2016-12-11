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

var Alert = require('./InfoBox.Alert.js');
var TransitionEnd = require('./TransitionEnd.js');
var Style = require('./Style.js');

var s = require('../less/InfoBox.less');

var InfoBox = function (PACKAGE){
    var outside = null;
    var container = null;
    var bg = null;
    var setuped = false;

    var currentBox = null;
    var bgClickListener = null;
    var containerListener = null;

    // callback --------------------------------------------------------------------------------
    var show = function (){
        var eventName = TransitionEnd.name();
        if (eventName!=null){
        if (containerListener) container.removeEventListener(eventName, containerListener);
            containerListener = function (){};
            container.addEventListener(eventName, containerListener, false);
        }else{
            containerListener();
        }

        outside.style.display = 'block';
        bg.style.opacity = 1;
    };

    var hide = function (){
        var eventName = TransitionEnd.name();
        if (eventName!=null){
        if (containerListener) container.removeEventListener(eventName, containerListener);
            containerListener = function (){outside.style.display = 'none';};
            container.addEventListener(eventName, containerListener, false);
        }else{
            containerListener();
        }

        bg.style.opacity = 0;
    };

    // private -------------------------------------------------------------------------------
    var setBgColor = function (bgColor){
        bg.style.backgroundColor = bgColor;
    };

    var setHideOnClick = function (hideOnClick){
        if (bgClickListener!=null) bg.removeEventListener('click', bgClickListener);
        if (hideOnClick){
            bgClickListener = function (e) {currentBox.hide();};
            bg.addEventListener('click', bgClickListener, false);
        } else {
          bgClickListener = null;
        }
    };

    var createAnimationStyle = function (css){
        var css = css || {
          before: 'fade',
          show: 'none',
          hide: 'fade'
        };
        var style = {
          before:{},
          show:{},
          hide:{}
        };

        // before
        var cssPkg = {};
        if (typeof (css.before) === "string") {
            if (Style.hasOwnProperty(css.before))
                cssPkg = Style[css.before];
        } else {
            cssPkg = css.before;
        }
        for (var i in css.before)style.before[i] = css.before[i];

        // show
        cssPkg = {};
        if (typeof (css.show) === "string") {
            if (Style.hasOwnProperty(css.show))
                cssPkg = Style[css.show];
        } else {
            cssPkg = css.show;
        }
        for (var i in css.show)style.show[i] = css.show[i];

        // hide
        cssPkg = {};
        if (typeof (css.hide) === "string") {
            if (Style.hasOwnProperty(css.hide))
                cssPkg = Style[css.hide];
        } else {
            cssPkg = css.hide;
        }
        for (var i in css.hide)style.hide[i] = css.hide[i];

        return style;
    };

    // setup --------------------------------------------------------------------------------
    var setupFunc = function (){
        PACKAGE.alert = function (content, title, hideOnClick, bgColor, onOK, styleOpt){
            setupHtml();
            if (currentBox!=null) currentBox.remove();
            container.focus();
            currentBox = new Alert(
              container,
              createAnimationStyle(styleOpt),
              title,
              content,
              onOK,
              hide);
            setHideOnClick(hideOnClick);
            setBgColor(bgColor);
            currentBox.show();
            show();
        };
    };

    var setupHtml = function (){
        if (setuped) return;
        setuped = true;
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

        outside.addEventListener('click', function (e) {
            if (e.stopPropagation)
                e.stopPropagation();
            else
                e.cancelBubble = true;
            e.preventDefault();
            return false;
        }, false);
    };

    // Initialize
    var init = function () {
        setupFunc();
    };
    init();
};

window.$$ = window.$$||{};
window.$$.info = {};
var infoBox = new InfoBox(window.$$.info );
