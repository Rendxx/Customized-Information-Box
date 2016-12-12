"use strict";
var Basic = function(container, style, onHide) {
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

Basic.prototype._buildContent = function (){
};

module.exports = Basic;
