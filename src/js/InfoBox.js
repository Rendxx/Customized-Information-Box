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
var Style = require('./Style.js');

require('../less/InfoBox.less');

var InfoBox = function (PACKAGE){
    var outside = null;
    var container = null;
    var bg = null;
    var setuped = false;

    var currentBox = null;

    // callback --------------------------------------------------------------------------------
    var beforeShow = function (hideOnClick){
        outside.style.display = 'block';
    };
    var afterHide = function (){
        outside.style.display = 'hidden';
    };

    // private -------------------------------------------------------------------------------
    var addHideOnClick = function (hideOnClick){
        bg.removeEventListener('click');
        if (hideOnClick) bg.addEventListener('click', function (e) {currentBox.hide();}, false);
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
              {
                beforeShow: beforeShow,
                afterHide: afterHide
              },
              title,
              content,
              onOK);
            addHideOnClick(hideOnClick);
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
