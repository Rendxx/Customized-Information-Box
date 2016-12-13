var Func = require('./Func.js');

"use strict";
var Basic = function(container, style, opts, onHide) {
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

Basic.prototype.show = function (){
    /* TODO: show the content */
    this._addStyle(this.style.show);
};

Basic.prototype.hide = function (){
    /* TODO: hide the content */
    this.onHide();
    this._addStyle(this.style.hide);
};

Basic.prototype.remove = function (){
    this.container.removeAttribute("style");
    this.container.innerHTML = '';
};

Basic.prototype._addStyle = function (style){
    this.container.removeAttribute("style");
    for (var i in style){
      this.container.style[i] = style[i];
    }
};

Basic.prototype._addInnerStyle = function (style){
    for (var i in style){
      this.inner.style[i] = style[i];
    }
};

Basic.prototype._buildContent = function (opts){
    var content = opts.content;

    var wrap = document.createElement("DIV");
    wrap.innerHTML = content;
    var dom = wrap.children[0];
    dom.className += ' _innerWrap';
    return dom;
};

Basic.prototype._setupStyle = function (){
    Func.addClass(this.container, '_noTransition');
    this._addStyle(this.style.before);
    this._addInnerStyle(this.style.inner);
    this.container.offsetHeight;
    Func.removeClass(this.container, '_noTransition');
};

module.exports = Basic;
