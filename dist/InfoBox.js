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
	Version: 0.7.0
	Update: 2016-12-14
	
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
	          It defines the show / hide animation of the info-box by setting the style before / after showing.
	          It receive either a predefined style name or an object of css properties.
	        - onHide: callback function when info-window hide
	        - other: detail in different Infobox module
	
	    $$.info.hide()
	        close the info box if it is shown
	************************************************/
	
	__webpack_require__(/*! LESS/InfoBox.less */ 1);
	var Basic = __webpack_require__(/*! JS/InfoBox.Basic.js */ 5);
	var Alert = __webpack_require__(/*! JS/InfoBox.Alert.js */ 9);
	var Check = __webpack_require__(/*! JS/InfoBox.Check.js */ 12);
	var Input = __webpack_require__(/*! JS/InfoBox.Input.js */ 15);
	
	var InfoBox = function (PACKAGE) {
	    var outside = null;
	    var container = null;
	    var bg = null;
	
	    var currentBox = null;
	    var bgClickListener = null;
	    var containerListener = null;
	
	    // callback --------------------------------------------------------------------------------
	    var show = function () {
	        outside.style.visibility = 'visible';
	        bg.style.opacity = 1;
	        currentBox && currentBox.show();
	    };
	
	    var hide = function () {
	        bg.style.opacity = 0;
	        outside.style.visibility = 'hidden';
	    };
	
	    // private -------------------------------------------------------------------------------
	    var setBg = function (bgVal) {
	        bg.style.background = bgVal;
	    };
	
	    var setHideOnClick = function (hideOnClick) {
	        if (bgClickListener != null) bg.removeEventListener('click', bgClickListener);
	        if (hideOnClick === true) {
	            bgClickListener = function (e) {
	                currentBox.hide();
	            };
	            bg.addEventListener('click', bgClickListener, false);
	        } else {
	            bgClickListener = null;
	        }
	    };
	
	    var beforeCreate = function (opts) {
	        var hideOnClick = opts.hideOnClick,
	            bgVal = opts.bg;
	        setupHtml();
	        if (currentBox != null) currentBox.remove();
	        container.focus();
	        setHideOnClick(hideOnClick);
	        setBg(bgVal);
	    };
	
	    var afterCreate = function (instance) {
	        currentBox = instance;
	        show();
	    };
	
	    // setup --------------------------------------------------------------------------------
	    var setupFunc = function () {
	        PACKAGE.info = function (opts) {
	            beforeCreate(opts);
	            Basic.__create(container, opts, afterCreate, hide);
	        };
	        PACKAGE.info.show = PACKAGE.info;
	        PACKAGE.info.hide = function () {
	            if (currentBox != null) currentBox.hide();
	        };
	        PACKAGE.info.alert = function (opts) {
	            beforeCreate(opts);
	            Alert.__create(container, opts, afterCreate, hide);
	        };
	        PACKAGE.info.check = function (opts) {
	            beforeCreate(opts);
	            Check.__create(container, opts, afterCreate, hide);
	        };
	        PACKAGE.info.input = function (opts) {
	            beforeCreate(opts);
	            Input.__create(container, opts, afterCreate, hide);
	        };
	    };
	
	    var setupHtml = function () {
	        if (outside != null) return;
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
	var infoBox = new InfoBox(window.$$);

/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./src/less/InfoBox.less ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/less-loader!./InfoBox.less */ 2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
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
/* 2 */
/*!**************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/less/InfoBox.less ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, ".__r-info {\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n  position: fixed;\n  left: 0;\n  top: 0;\n  z-index: 99990;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: none!important;\n  outline-width: 0!important;\n}\n.__r-info ._container {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  transition: 0.2s;\n  pointer-events: none;\n  backface-visibility: hidden;\n}\n.__r-info ._container ._innerWrap {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: translate(-50%, -50%);\n  transition: none;\n  pointer-events: auto;\n}\n.__r-info ._container._noTransition {\n  transition: none !important;\n}\n.__r-info ._bg {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  backface-visibility: hidden;\n  transition: 0.2s;\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
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
/* 4 */
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
/* 5 */
/*!*********************************!*\
  !*** ./src/js/InfoBox.Basic.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/************************************************
	API:
	    $$.info(opts)
	        - content: [string | dom node] receive either a string represented content or a dom
	        - other: ...
	************************************************/
	
	var Func = __webpack_require__(/*! JS/Func.js */ 6);
	var Style = __webpack_require__(/*! JS/Style.js */ 7);
	
	"use strict";
	var Basic = function (container, style, opts, onHide) {
	    var inner = this._buildContent(opts);
	    container.appendChild(inner);
	
	    style = style || {};
	    this.style = {};
	    this.style.before = style.before || {};
	    this.style.show = style.show || {};
	    this.style.hide = style.hide || style.before;
	    this.style.inner = style.inner || {};
	
	    this.container = container;
	    this.inner = inner;
	    this.onHide = onHide;
	
	    this._setupStyle();
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
	    this.onHide();
	    this._addStyle(this.style.hide);
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
	
	Basic.prototype._addInnerStyle = function (style) {
	    for (var i in style) {
	        this.inner.style[i] = style[i];
	    }
	};
	
	Basic.prototype._buildContent = function (opts) {
	    var content = opts.content || '';
	
	    var dom = null;
	    if (typeof content === 'string') {
	        var wrap = document.createElement("DIV");
	        wrap.innerHTML = content;
	        dom = wrap.children[0];
	    } else {
	        dom = content;
	    }
	    dom.className += ' _innerWrap';
	    return dom;
	};
	
	Basic.prototype._setupStyle = function () {
	    Func.addClass(this.container, '_noTransition');
	    this._addStyle(this.style.before);
	    this._addInnerStyle(this.style.inner);
	    this.container.offsetHeight;
	    Func.removeClass(this.container, '_noTransition');
	};
	
	Basic.__create = function (container, opts, afterCreate, hideContainer) {
	    var content = opts.content,
	        hideOnClick = opts.hideOnClick,
	        bgVal = opts.bg,
	        style = opts.style,
	        onHide = opts.onHide;
	
	    var currentBox = new Basic(container, Style.createAnimationStyle(style), {
	        content: content
	    }, function () {
	        hideContainer();
	        if (onHide) setTimeout(onHide, 1);
	    });
	    afterCreate && afterCreate(currentBox);
	};
	
	module.exports = Basic;

/***/ },
/* 6 */
/*!************************!*\
  !*** ./src/js/Func.js ***!
  \************************/
/***/ function(module, exports) {

	var Func = {
	  addClass: function (dom, className) {
	    dom.className += ' ' + className;
	  },
	  removeClass: function (dom, className) {
	    dom.className = dom.className.replace(new RegExp('(?:^|\\s)' + className + '(?:\\s|$)'), ' ').replace(/'\\s+'/g, ' ');
	  }
	};
	
	module.exports = Func;

/***/ },
/* 7 */
/*!*************************!*\
  !*** ./src/js/Style.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	var StyleFunc = __webpack_require__(/*! JS/StyleFunc.js */ 8);
	var Style = new StyleFunc();
	Style['none'] = {};
	Style['fade'] = {
	    'opacity': 0
	};
	Style['slideTop'] = {
	    'top': '-50%'
	};
	module.exports = Style;

/***/ },
/* 8 */
/*!*****************************!*\
  !*** ./src/js/StyleFunc.js ***!
  \*****************************/
/***/ function(module, exports) {

	var StyleFunc = function () {};
	StyleFunc.prototype = {
	    createAnimationStyle: function (css) {
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
	        if (typeof css.before === "string") {
	            if (this.hasOwnProperty(css.before)) cssPkg = this[css.before];
	        } else {
	            cssPkg = css.before;
	        }
	        for (var i in cssPkg) style.before[i] = cssPkg[i];
	
	        // show
	        cssPkg = {};
	        if (typeof css.show === "string") {
	            if (this.hasOwnProperty(css.show)) cssPkg = this[css.show];
	        } else {
	            cssPkg = css.show;
	        }
	        for (var i in cssPkg) style.show[i] = cssPkg[i];
	
	        // hide
	        cssPkg = {};
	        if (typeof css.hide === "string") {
	            if (this.hasOwnProperty(css.hide)) cssPkg = this[css.hide];
	        } else {
	            cssPkg = css.hide;
	        }
	        for (var i in cssPkg) style.hide[i] = cssPkg[i];
	
	        // inner
	        cssPkg = {};
	        if (typeof css.hide === "string") {
	            if (this.hasOwnProperty(css.inner)) cssPkg = this[css.inner];
	        } else {
	            cssPkg = css.inner;
	        }
	        for (var i in cssPkg) style.inner[i] = cssPkg[i];
	
	        return style;
	    }
	};
	
	module.exports = StyleFunc;

/***/ },
/* 9 */
/*!*********************************!*\
  !*** ./src/js/InfoBox.Alert.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/************************************************
	API:
	    $$.info.alert(opts)
	        - content: content
	        - title: title
	        - callback: function be called after click OK
	        - other: ...
	************************************************/
	
	var Style = __webpack_require__(/*! JS/Style.js */ 7);
	var Basic = __webpack_require__(/*! JS/InfoBox.Basic.js */ 5);
	__webpack_require__(/*! LESS/InfoBox.Alert.less */ 10);
	
	"use strict";
	var Alert = function (container, style, opts, onHide) {
	    Basic.call(this, container, style, opts, onHide);
	};
	Alert.prototype = Object.create(Basic.prototype);
	Alert.prototype.constructor = Alert;
	
	Alert.prototype._buildContent = function (opts) {
	    var title = opts.title || '',
	        content = opts.content || '',
	        callback = opts.callback || null;
	
	    var wrap = document.createElement("DIV");
	    wrap.className = '_alert _innerWrap';
	    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content">#content#</div><div class="_line"></div><div class="_ok">OK</div>'.replace(/#title#/g, title).replace(/#content#/g, content);
	
	    var that = this;
	    var btnOK = wrap.querySelector('._ok');
	    btnOK.addEventListener("click", function (e) {
	        callback && callback(e);
	        that.hide();
	    }, false);
	    return wrap;
	};
	
	Alert.__create = function (container, opts, afterCreate, hideContainer) {
	    var content = opts.content,
	        title = opts.title,
	        callback = opts.callback,
	        hideOnClick = opts.hideOnClick,
	        bgVal = opts.bg,
	        style = opts.style,
	        onHide = opts.onHide;
	
	    var currentBox = new Alert(container, Style.createAnimationStyle(style), {
	        title: title,
	        content: content,
	        callback: callback
	    }, function () {
	        hideContainer();
	        if (onHide) setTimeout(onHide, 1);
	    });
	    afterCreate && afterCreate(currentBox);
	};
	
	module.exports = Alert;

/***/ },
/* 10 */
/*!*************************************!*\
  !*** ./src/less/InfoBox.Alert.less ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/less-loader!./InfoBox.Alert.less */ 11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
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
/* 11 */
/*!********************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/less/InfoBox.Alert.less ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "._alert {\n  width: 460px;\n  height: auto;\n  background-color: #f2f2f2;\n  color: #333;\n  text-align: center;\n  font-size: 14px;\n  font-weight: 500;\n  border: 1px solid #fff;\n  font-family: Calibri, Helvetica, sans-serif;\n  box-sizing: border-box;\n  padding: 14px 10px;\n}\n._alert ._title {\n  width: 100%;\n  line-height: 26px;\n  font-size: 22px;\n  font-weight: 400;\n  color: #333;\n  letter-spacing: 1px;\n  padding: 16px 0;\n  margin: 0 0 0 -1px;\n}\n._alert ._content {\n  margin: 0 auto 25px;\n  width: 90%;\n  height: auto;\n  line-height: 20px;\n}\n._alert ._line {\n  margin: 0 auto 8px;\n  width: 75%;\n  height: 1px;\n  line-height: 1px;\n  background-color: #ccc;\n}\n._alert ._ok {\n  margin: 0 auto;\n  width: 120px;\n  height: 32px;\n  line-height: 32px;\n  font-size: 20px;\n  font-weight: 300;\n  letter-spacing: 4px;\n  color: #666;\n  cursor: pointer;\n}\n._alert ._ok:hover {\n  color: #111;\n}\n", ""]);
	
	// exports


/***/ },
/* 12 */
/*!*********************************!*\
  !*** ./src/js/InfoBox.Check.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/************************************************
	Show a check box
	
	API:
	    $$.info.check(opts)
	        - content: content
	        - title: title
	        - callbackYes: function be called after click YES
	        - callbackNo: function be called after click NO
	        - other: ...
	************************************************/
	
	var Style = __webpack_require__(/*! JS/Style.js */ 7);
	var Basic = __webpack_require__(/*! JS/InfoBox.Basic.js */ 5);
	__webpack_require__(/*! LESS/InfoBox.Check.less */ 13);
	
	"use strict";
	var Check = function (container, style, opts, onHide) {
	    Basic.call(this, container, style, opts, onHide);
	};
	Check.prototype = Object.create(Basic.prototype);
	Check.prototype.constructor = Check;
	
	Check.prototype._buildContent = function (opts) {
	    var that = this;
	    var title = opts.title || '',
	        content = opts.content || '',
	        callbackYes = opts.callbackYes || null,
	        callbackNo = opts.callbackNo || null;
	
	    var wrap = document.createElement("DIV");
	    wrap.className = '_check _innerWrap';
	    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content">#content#</div><div class="_line"></div><div class="_btn _yes _left">YES</div><div class="_btn _no _right">NO</div>'.replace(/#title#/g, title).replace(/#content#/g, content);
	
	    var btnYES = wrap.querySelector('._yes');
	    var btnNO = wrap.querySelector('._no');
	
	    btnYES.addEventListener("click", function (e) {
	        callbackYes && callbackYes(e);
	        that.hide();
	    }, false);
	
	    btnNO.addEventListener("click", function (e) {
	        callbackNo && callbackNo(e);
	        that.hide();
	    }, false);
	    return wrap;
	};
	
	Check.__create = function (container, opts, afterCreate, hideContainer) {
	    var content = opts.content,
	        title = opts.title,
	        callbackYes = opts.callbackYes,
	        callbackNo = opts.callbackNo,
	        hideOnClick = opts.hideOnClick,
	        bgVal = opts.bg,
	        style = opts.style,
	        onHide = opts.onHide;
	
	    var currentBox = new Check(container, Style.createAnimationStyle(style), {
	        title: title,
	        content: content,
	        callbackYes: callbackYes,
	        callbackNo: callbackNo
	    }, function () {
	        hideContainer();
	        if (onHide) setTimeout(onHide, 1);
	    });
	    afterCreate && afterCreate(currentBox);
	};
	
	module.exports = Check;

/***/ },
/* 13 */
/*!*************************************!*\
  !*** ./src/less/InfoBox.Check.less ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/less-loader!./InfoBox.Check.less */ 14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./InfoBox.Check.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./InfoBox.Check.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/*!********************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/less/InfoBox.Check.less ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "._check {\n  width: 460px;\n  height: auto;\n  background-color: #f2f2f2;\n  color: #333;\n  text-align: center;\n  font-size: 14px;\n  font-weight: 500;\n  border: 1px solid #fff;\n  font-family: Calibri, Helvetica, sans-serif;\n  box-sizing: border-box;\n  padding: 14px 10px 48px;\n}\n._check ._title {\n  width: 100%;\n  line-height: 26px;\n  font-size: 22px;\n  font-weight: 400;\n  color: #333;\n  letter-spacing: 1px;\n  padding: 16px 0;\n  margin: 0 0 0 -1px;\n}\n._check ._content {\n  margin: 0 auto 25px;\n  width: 90%;\n  height: auto;\n  line-height: 20px;\n}\n._check ._line {\n  margin: 0 auto 8px;\n  width: 75%;\n  height: 1px;\n  line-height: 1px;\n  background-color: #ccc;\n}\n._check ._btn {\n  position: absolute;\n  bottom: 14px;\n  width: 120px;\n  height: 32px;\n  line-height: 32px;\n  font-size: 20px;\n  font-weight: 300;\n  letter-spacing: 4px;\n  color: #666;\n  cursor: pointer;\n}\n._check ._btn._left {\n  margin-left: -40px;\n  left: 25%;\n}\n._check ._btn._right {\n  margin-right: -40px;\n  right: 25%;\n}\n._check ._btn:hover {\n  color: #111;\n}\n", ""]);
	
	// exports


/***/ },
/* 15 */
/*!*********************************!*\
  !*** ./src/js/InfoBox.Input.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/************************************************
	Show a window with an input field.
	
	API:
	    $$.info.input(opts)
	        - para: parameters to define input
	            + type: text / password / ... (avilable type for input dom element)
	            + maxlength : max length of the input
	            + instruction: instruction shows below the input box
	            + errorMsg: A function be called right after confirming input. Be used to produce error message when the input is illegal.
	                        Return null indicates no error occur. Otherwise a string of error message will be returned, this message will be shown below the input box.
	                        The input will not complele if an error is occur.
	        - title: title
	        - callback: function be called after input completes
	        - other: ...
	************************************************/
	
	var Style = __webpack_require__(/*! JS/Style.js */ 7);
	var Basic = __webpack_require__(/*! JS/InfoBox.Basic.js */ 5);
	__webpack_require__(/*! LESS/InfoBox.Input.less */ 16);
	
	"use strict";
	var Input = function (container, style, opts, onHide) {
	    Basic.call(this, container, style, opts, onHide);
	};
	Input.prototype = Object.create(Basic.prototype);
	Input.prototype.constructor = Input;
	
	Input.prototype._buildContent = function (opts) {
	    var that = this;
	    var title = opts.title || '',
	        para = opts.para || {},
	        callback = opts.callback;
	    // init paramenters
	    var inputType = para.type || 'text',
	        maxlength = para.maxlength || null,
	        instruction = para.instruction || '',
	        errorMsg = para.errorMsg || null;
	
	    var wrap = document.createElement("DIV");
	    wrap.className = '_input _innerWrap';
	    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content"><input  /><div class="_instruction">#instruction#</div><div class="_error"></div></div><div class="_line"></div><div class="_btn _yes _left">YES</div><div class="_btn _no _right">NO</div>'.replace(/#title#/g, title).replace(/#instruction#/g, instruction);
	
	    var input = wrap.querySelector('input');
	    var err = wrap.querySelector('._error');
	
	    input.setAttribute('type', inputType || 'text');
	    if (maxlength) input.setAttribute('maxlength', maxlength);
	
	    // confirm function
	    var confirm = function (e) {
	        var v = input.value;
	        if (errorMsg != null) {
	            var errMsg = errorMsg(v);
	            if (errMsg != null) {
	                err.innerHTML = errMsg;
	                err.style['margin-top'] = '5px';
	                return;
	            }
	        }
	
	        that.hide(e);
	        if (callback != null) setTimeout(function () {
	            callback(v);
	        }, 1);
	    };
	
	    var btnYES = wrap.querySelector('._yes');
	    var btnNO = wrap.querySelector('._no');
	
	    var that = this;
	    btnYES.addEventListener("click", function (e) {
	        confirm(e);
	    }, false);
	
	    btnNO.addEventListener("click", function (e) {
	        that.hide();
	    }, false);
	    return wrap;
	};
	
	Input.__create = function (container, opts, afterCreate, hideContainer) {
	    var para = opts.para,
	        title = opts.title,
	        callback = opts.callback,
	        hideOnClick = opts.hideOnClick,
	        bgVal = opts.bg,
	        style = opts.style,
	        onHide = opts.onHide;
	
	    var currentBox = new Input(container, Style.createAnimationStyle(style), {
	        para: para,
	        callback: callback
	    }, function () {
	        hideContainer();
	        if (onHide) setTimeout(onHide, 1);
	    });
	    afterCreate && afterCreate(currentBox);
	};
	
	module.exports = Input;

/***/ },
/* 16 */
/*!*************************************!*\
  !*** ./src/less/InfoBox.Input.less ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/less-loader!./InfoBox.Input.less */ 17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./InfoBox.Input.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./InfoBox.Input.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/*!********************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/less/InfoBox.Input.less ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "._input {\n  width: 460px;\n  height: auto;\n  background-color: #f2f2f2;\n  color: #333;\n  text-align: center;\n  font-size: 14px;\n  font-weight: 500;\n  border: 1px solid #fff;\n  font-family: Calibri, Helvetica, sans-serif;\n  box-sizing: border-box;\n  padding: 14px 10px 48px;\n}\n._input ._title {\n  width: 100%;\n  line-height: 26px;\n  font-size: 22px;\n  font-weight: 400;\n  color: #333;\n  letter-spacing: 1px;\n  padding: 16px 0;\n  margin: 0 0 0 -1px;\n}\n._input ._content {\n  margin: 0 auto 25px;\n  width: 90%;\n  height: auto;\n  line-height: 20px;\n}\n._input ._content input {\n  display: block;\n  outline: none;\n  resize: none;\n  text-align: center!important;\n  padding: 8px 10px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  margin: 0 auto;\n  width: 90%;\n}\n._input ._content input::-webkit-input-placeholder {\n  text-align: center;\n}\n._input ._content input:-moz-placeholder {\n  text-align: center;\n}\n._input ._content input::-moz-placeholder {\n  text-align: center;\n}\n._input ._content input:-ms-input-placeholder {\n  text-align: center;\n}\n._input ._content ._instruction {\n  margin: 0px auto;\n  margin-top: 10px;\n  width: 90%;\n  height: auto;\n  line-height: 20px;\n  color: #777;\n}\n._input ._content ._error {\n  margin: 0px auto;\n  width: 340px;\n  height: auto;\n  line-height: 20px;\n  color: #600;\n  -moz-transition: 0.2s;\n  -o-transition: 0.2s;\n  -webkit-transition: 0.2s;\n  transition: 0.2s;\n}\n._input ._line {\n  margin: 0 auto 8px;\n  width: 75%;\n  height: 1px;\n  line-height: 1px;\n  background-color: #ccc;\n}\n._input ._btn {\n  position: absolute;\n  bottom: 14px;\n  width: 120px;\n  height: 32px;\n  line-height: 32px;\n  font-size: 20px;\n  font-weight: 300;\n  letter-spacing: 4px;\n  color: #666;\n  cursor: pointer;\n}\n._input ._btn._left {\n  margin-left: -40px;\n  left: 25%;\n}\n._input ._btn._right {\n  margin-right: -40px;\n  right: 25%;\n}\n._input ._btn:hover {\n  color: #111;\n}\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=InfoBox.js.map