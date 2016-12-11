var TransitionEnd = require('./TransitionEnd.js');

"use strict";
var Basic = function(container, style, cb) {
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

Basic.prototype.show = function (){
    this.beforeShow && this.beforeShow();
    /* TODO: show the content */
    var eventName = TransitionEnd.name();
    if (eventName!=null){
        this.container.removeEventListener(eventName);
        if (this.afterShow)
            this.container.addEventListener(eventName, this.afterShow, false);
    }
    this._addStyle(this.style.show);
};

Basic.prototype.hide = function (){
    this.beforeHide && this.beforeHide();
    /* TODO: hide the content */
    this._addStyle(this.style.hide);
    var eventName = TransitionEnd.name();
    if (eventName!=null){
        this.container.removeEventListener(eventName);
        if (this.afterHide)
            this.container.addEventListener(eventName, this.afterHide, false);
    }
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

Basic.prototype._buildContent = function (){
};

module.exports = Basic;
