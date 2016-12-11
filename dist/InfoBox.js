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
	var TransitionEnd = __webpack_require__(/*! ./TransitionEnd.js */ 7);
	var Style = __webpack_require__(/*! ./Style.js */ 8);
	
	var s = __webpack_require__(/*! ../less/InfoBox.less */ 9);
	
	var InfoBox = function (PACKAGE) {
	    var outside = null;
	    var container = null;
	    var bg = null;
	    var setuped = false;
	
	    var currentBox = null;
	    var bgClickListener = null;
	    var containerListener = null;
	
	    // callback --------------------------------------------------------------------------------
	    var show = function () {
	        var eventName = TransitionEnd.name();
	        if (eventName != null) {
	            if (containerListener) container.removeEventListener(eventName, containerListener);
	            containerListener = function () {};
	            container.addEventListener(eventName, containerListener, false);
	        } else {
	            containerListener();
	        }
	
	        outside.style.display = 'block';
	        bg.style.opacity = 1;
	    };
	
	    var hide = function () {
	        var eventName = TransitionEnd.name();
	        if (eventName != null) {
	            if (containerListener) container.removeEventListener(eventName, containerListener);
	            containerListener = function () {
	                outside.style.display = 'none';
	            };
	            container.addEventListener(eventName, containerListener, false);
	        } else {
	            containerListener();
	        }
	
	        bg.style.opacity = 0;
	    };
	
	    // private -------------------------------------------------------------------------------
	    var setBgColor = function (bgColor) {
	        bg.style.backgroundColor = bgColor;
	    };
	
	    var setHideOnClick = function (hideOnClick) {
	        if (bgClickListener != null) bg.removeEventListener('click', bgClickListener);
	        if (hideOnClick) {
	            bgClickListener = function (e) {
	                currentBox.hide();
	            };
	            bg.addEventListener('click', bgClickListener, false);
	        } else {
	            bgClickListener = null;
	        }
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
	            currentBox = new Alert(container, createAnimationStyle(styleOpt), title, content, onOK, hide);
	            setHideOnClick(hideOnClick);
	            setBgColor(bgColor);
	            currentBox.show();
	            show();
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
	var Style = __webpack_require__(/*! ../less/InfoBox.Alert.less */ 3);
	
	"use strict";
	var Alert = function (container, style, title, content, onOK, onHide) {
	    var domNode = this._buildContent(title, content);
	    container.appendChild(domNode);
	    this.onOK = onOK;
	    Basic.call(this, container, style, onHide);
	};
	Alert.prototype = Object.create(Basic.prototype);
	Alert.prototype.constructor = Alert;
	
	Alert.prototype._buildContent = function (title, content) {
	    var wrap = document.createElement("DIV");
	    wrap.className = '_alert _innerWrap';
	    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content">#content#</div><div class="_line"></div><div class="_ok">OK</div>'.replace('#title#', title).replace('#content#', content);
	
	    var btnOK = wrap.querySelector('._ok');
	    btnOK.addEventListener("click", function (e) {
	        this.onOK && this.onOK(e);
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
/***/ function(module, exports) {

	"use strict";
	
	var Basic = function (container, style, onHide) {
	    style = style || {};
	    this.style = {};
	    this.style.before = style.before || {};
	    this.style.show = style.show || {};
	    this.style.hide = style.hide || style.before;
	
	    this.container = container;
	    this.onHide = onHide;
	
	    this._addStyle(this.style.before);
	    this._style = {};
	};
	
	Basic.prototype = Object.create(null);
	Basic.prototype.constructor = Basic;
	
	Basic.prototype.show = function () {
	    /* TODO: show the content */
	    this._addStyle(this.style.show);
	};
	
	Basic.prototype.hide = function () {
	    /* TODO: hide the content */
	    this._addStyle(this.style.hide);
	    this.onHide();
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
/*!*************************************!*\
  !*** ./src/less/InfoBox.Alert.less ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/less-loader!./InfoBox.Alert.less */ 4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./InfoBox.Alert.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./InfoBox.Alert.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/*!********************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/less/InfoBox.Alert.less ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "._alert {\n  width: 460px;\n  height: auto;\n  background-color: #f2f2f2;\n  color: #333;\n  text-align: center;\n  font-size: 14px;\n  font-weight: 500;\n  border: 1px solid #fff;\n  font-family: Calibri, Helvetica, sans-serif;\n  box-sizing: border-box;\n}\n._alert ._title {\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  font-size: 22px;\n  font-weight: 400;\n  color: #333;\n  letter-spacing: 1px;\n  padding: 12px 0;\n  margin: 0 0 0 -1px;\n}\n._alert ._content {\n  margin: 0 auto 25px;\n  width: 90%;\n  height: auto;\n  line-height: 20px;\n}\n._alert ._line {\n  margin: 0 auto 8px;\n  width: 75%;\n  height: 1px;\n  line-height: 1px;\n  background-color: #ccc;\n}\n._alert ._ok {\n  margin: 0 auto 13px;\n  width: 120px;\n  height: 32px;\n  line-height: 32px;\n  font-size: 20px;\n  font-weight: 300;\n  letter-spacing: 4px;\n  color: #666;\n  cursor: pointer;\n}\n._alert ._ok:hover {\n  color: #111;\n}\n", ""]);
	
	// exports


/***/ },
/* 5 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
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
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/less-loader!./InfoBox.less */ 10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./InfoBox.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./InfoBox.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/*!**************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/less/InfoBox.less ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, ".__r-info {\n  width: 100%;\n  height: 100%;\n  display: none;\n  position: fixed;\n  left: 0;\n  top: 0;\n  z-index: 99990;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: none!important;\n  outline-width: 0!important;\n}\n.__r-info ._container {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n}\n.__r-info ._container ._innerWrap {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: translate(-50%, -50%);\n  transition: 0.2s;\n}\n.__r-info ._bg {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=InfoBox.js.map