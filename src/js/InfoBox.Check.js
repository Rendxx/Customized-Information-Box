/************************************************
Show a check box

API:
    $$.info.check(content, title, hideOnClick, bgColor, callbackYes, callbackNo)
        - callbackYes: function be called after click YES
        - callbackNo: function be called after click NO
************************************************/

var Basic = require('./InfoBox.Basic.js');
require('../less/InfoBox.Check.less');

"use strict";
var Check = function(container, style, opts, onHide) {
    Basic.call(this, container, style, opts, onHide);
};
Check.prototype = Object.create(Basic.prototype);
Check.prototype.constructor = Check;

Check.prototype._buildContent = function (opts){
    var that =this;
    var title = opts.title,
        content = opts.content,
        callbackYes = opts.callbackYes,
        callbackNo = opts.callbackNo;
    var wrap = document.createElement("DIV");
    wrap.className = '_check _innerWrap';
    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content">#content#</div><div class="_line"></div><div class="_btn _yes _left">YES</div><div class="_btn _no _right">NO</div>'.replace('#title#', title||'').replace('#content#', content);

    var btnYES = wrap.querySelector('._yes');
    var btnNO = wrap.querySelector('._no');

    btnYES.addEventListener("click", function(e){
        callbackYes && callbackYes(e);
        that.hide();
    }, false);

    btnNO.addEventListener("click", function(e){
        callbackNo && callbackNo(e);
        that.hide();
    }, false);
    return wrap;
};

module.exports = Check;
