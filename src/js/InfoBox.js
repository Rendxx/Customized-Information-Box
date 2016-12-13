/************************************************
Customized Information Box
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.7.0
Update: 2016-12-13

Description:
    Enable user to show their customized HTML elements in the center of screen.
        - A screen cover will be created to block mouse event to the original page.
        - Clicking outside the body of the info-box will close the info-box. This feature can be disabled manually.

Compatibility:
    Fully support Chrome; Fire Fox; Safari; Edge;

API:
    $$.info(opts)
    $$.info.show(opts)
        - hideOnClick: [true | false] close when click on the background if true
        - bg: [string] background style
        - style: {
            before: [string | object] style before box show up
            show: [string | object] style of the box
            hide: [string | object] style after box hide
          }
          It will defined the show/hide animation of the infobox.
          It receive either a predefined style name or an object of css properties.
        - onHide: callback function when info-window hide
        - other: detail in different Infobox module

    $$.info.hide()
        close the info box if it is shown
************************************************/

require('LESS/InfoBox.less');
var Basic = require('JS/InfoBox.Basic.js');
var Alert = require('JS/InfoBox.Alert.js');
var Check = require('JS/InfoBox.Check.js');
var Input = require('JS/InfoBox.Input.js');

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

    var beforeCreate = function (opts){
        var hideOnClick = opts.hideOnClick,
            bgVal = opts.bg;
        setupHtml();
        if (currentBox != null) currentBox.remove();
        container.focus();
        setHideOnClick(hideOnClick);
        setBg(bgVal);
    };

    var afterCreate = function (instance){
        currentBox = instance;
        show();
    };

    // setup --------------------------------------------------------------------------------
    var setupFunc = function() {
        PACKAGE.info = function (opts){
          beforeCreate(opts);
            Basic.__create(container, opts, afterCreate, hide);
        };
        PACKAGE.info.show = PACKAGE.info;
        PACKAGE.info.hide = function(){if (currentBox != null) currentBox.hide();};
        PACKAGE.info.alert = function (opts) {
            beforeCreate(opts);
            Alert.__create(container, opts, afterCreate, hide);
        };
        PACKAGE.info.check = function(opts) {
            beforeCreate(opts);
            Check.__create(container, opts, afterCreate, hide);
        };
        PACKAGE.info.input = function(opts) {
            beforeCreate(opts);
            Input.__create(container, opts, afterCreate, hide);
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
