/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************************!*\
  !*** ./src/js/InfoBox.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

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
	
	var Alert = __webpack_require__(/*! ./InfoBox.Alert.js */ 1);
	var Style = __webpack_require__(/*! ./Style.js */ 8);
	
	__webpack_require__(/*! ../less/InfoBox.less */ 9);
	
	var InfoBox = function (PACKAGE) {
	    var outside = null;
	    var container = null;
	    var bg = null;
	    var setuped = false;
	
	    var currentBox = null;
	
	    // callback --------------------------------------------------------------------------------
	    var beforeShow = function (hideOnClick) {
	        outside.style.display = 'block';
	    };
	    var afterHide = function () {
	        outside.style.display = 'hidden';
	    };
	
	    // private -------------------------------------------------------------------------------
	    var addHideOnClick = function (hideOnClick) {
	        bg.removeEventListener('click');
	        if (hideOnClick) bg.addEventListener('click', function (e) {
	            currentBox.hide();
	        }, false);
	    };
	
	    var createAnimationStyle = function (css) {
	        var css = css || {
	            before: 'fade',
	            show: 'none',
	            hide: 'fade'
	        };
	        var style = {
	            before: {},
	            show: {},
	            hide: {}
	        };
	
	        // before
	        var cssPkg = {};
	        if (typeof css.before === "string") {
	            if (Style.hasOwnProperty(css.before)) cssPkg = Style[css.before];
	        } else {
	            cssPkg = css.before;
	        }
	        for (var i in css.before) style.before[i] = css.before[i];
	
	        // show
	        cssPkg = {};
	        if (typeof css.show === "string") {
	            if (Style.hasOwnProperty(css.show)) cssPkg = Style[css.show];
	        } else {
	            cssPkg = css.show;
	        }
	        for (var i in css.show) style.show[i] = css.show[i];
	
	        // hide
	        cssPkg = {};
	        if (typeof css.hide === "string") {
	            if (Style.hasOwnProperty(css.hide)) cssPkg = Style[css.hide];
	        } else {
	            cssPkg = css.hide;
	        }
	        for (var i in css.hide) style.hide[i] = css.hide[i];
	
	        return style;
	    };
	
	    // setup --------------------------------------------------------------------------------
	    var setupFunc = function () {
	        PACKAGE.alert = function (content, title, hideOnClick, bgColor, onOK, styleOpt) {
	            setupHtml();
	            if (currentBox != null) currentBox.remove();
	            container.focus();
	            currentBox = new Alert(container, createAnimationStyle(styleOpt), {
	                beforeShow: beforeShow,
	                afterHide: afterHide
	            }, title, content, onOK);
	            addHideOnClick(hideOnClick);
	        };
	    };
	
	    var setupHtml = function () {
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
	            if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;
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
	
	window.$$ = window.$$ || {};
	window.$$.info = {};
	var infoBox = new InfoBox(window.$$.info);

/***/ },
/* 1 */
/*!*********************************!*\
  !*** ./src/js/InfoBox.Alert.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/************************************************
	API:
	    $$.info.alert(content, title, hideOnClick, bgColor, callback)
	        - content: alert content
	        - title: alert title
	        - callback: function be called after click OK
	************************************************/
	
	var Basic = __webpack_require__(/*! ./InfoBox.Basic.js */ 2);
	var Style = __webpack_require__(/*! ../less/InfoBox.Alert.less */ 4);
	
	"use strict";
	var Alert = function (container, style, cb, title, content, onOK) {
	    var domNode = this._buildContent(title, content);
	    container.appendChild(domNode);
	    Basic.call(this, container, style, cb);
	};
	Alert.prototype = Object.create(Basic.prototype);
	Alert.prototype.constructor = Alert;
	
	Alert.prototype._buildContent = function (title, content) {
	    var wrap = document.createElement("DIV");
	    wrap.className = '_alert _innerWrap';
	    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content">#content#</div><div class="_line"></div><div class="_ok">OK</div>'.replace('#title#', title).replace('#content#', content);
	
	    var btnOK = wrap.querySelector('._ok');
	    btnOK.addEventListener("click", function (e) {
	        onOK && onOK(e);
	        this.hide();
	    }.bind(this), false);
	    return wrap;
	};
	
	module.exports = Alert;

/***/ },
/* 2 */
/*!*********************************!*\
  !*** ./src/js/InfoBox.Basic.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var TransitionEnd = __webpack_require__(/*! ./TransitionEnd.js */ 3);
	
	"use strict";
	var Basic = function (container, style, cb) {
	    style = style || {};
	    cb = cb || {};
	    this.beforeShow = cb.beforeShow;
	    this.afterShow = cb.afterShow;
	    this.beforeHide = cb.beforeHide;
	    this.afterHide = cb.afterHide;
	
	    this.style = {};
	    this.style.before = style.before || {};
	    this.style.show = style.show || {};
	    this.style.hide = style.hide || style.before;
	
	    this.container = container;
	
	    this._addStyle(this.style.before);
	    this._style = {};
	};
	
	Basic.prototype = Object.create(null);
	Basic.prototype.constructor = Basic;
	
	Basic.prototype.show = function () {
	    this.beforeShow && this.beforeShow();
	    /* TODO: show the content */
	    var eventName = TransitionEnd.name();
	    if (eventName != null) {
	        this.container.removeEventListener(eventName);
	        if (this.afterShow) this.container.addEventListener(eventName, this.afterShow, false);
	    }
	    this._addStyle(this.style.show);
	};
	
	Basic.prototype.hide = function () {
	    this.beforeHide && this.beforeHide();
	    /* TODO: hide the content */
	    this._addStyle(this.style.hide);
	    var eventName = TransitionEnd.name();
	    if (eventName != null) {
	        this.container.removeEventListener(eventName);
	        if (this.afterHide) this.container.addEventListener(eventName, this.afterHide, false);
	    }
	};
	
	Basic.prototype.remove = function () {
	    this.container.removeAttribute("style");
	    this.container.innerHTML = '';
	};
	
	Basic.prototype._addStyle = function (style) {
	    this.container.removeAttribute("style");
	    for (var i in style) {
	        this.container.style[i] = style[i];
	    }
	};
	
	Basic.prototype._buildContent = function () {};
	
	module.exports = Basic;

/***/ },
/* 3 */
/*!*********************************!*\
  !*** ./src/js/TransitionEnd.js ***!
  \*********************************/
/***/ function(module, exports) {

	var TransitionEnd = function () {
	    var getEventName = function () {
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
	    };
	    var _transitionEnd = null;
	    this.name = function () {
	        if (_transitionEnd == null) _transitionEnd = getEventName();
	        return _transitionEnd;
	    };
	};
	
	module.exports = new TransitionEnd();

/***/ },
/* 4 */
/*!*************************************!*\
  !*** ./src/less/InfoBox.Alert.less ***!
  \*************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!*************************!*\
  !*** ./src/js/Style.js ***!
  \*************************/
/***/ function(module, exports) {

	var Style = {
	  none: {},
	  fade: {
	    'opacity': 0
	  },
	  slideTop: {
	    'top': '-100%'
	  }
	};
	
	module.exports = Style;

/***/ },
/* 9 */
/*!*******************************!*\
  !*** ./src/less/InfoBox.less ***!
  \*******************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=InfoBox.js.map