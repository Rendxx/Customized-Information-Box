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

var Style = require('JS/Style.js');
var Basic = require('JS/InfoBox.Basic.js');
require('LESS/InfoBox.Check.less');

"use strict";
var Check = function(container, style, opts, onHide) {
    Basic.call(this, container, style, opts, onHide);
};
Check.prototype = Object.create(Basic.prototype);
Check.prototype.constructor = Check;

Check.prototype._buildContent = function (opts){
    var that =this;
    var title = opts.title||'',
        content = opts.content||'',
        callbackYes = opts.callbackYes||null,
        callbackNo = opts.callbackNo||null;

    var wrap = document.createElement("DIV");
    wrap.className = '_check _innerWrap';
    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content">#content#</div><div class="_line"></div><div class="_btn _yes _left">YES</div><div class="_btn _no _right">NO</div>'.replace(/#title#/g, title).replace(/#content#/g, content);

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

Check.__create = function (container, opts, afterCreate, hideContainer){
    var content = opts.content,
        title = opts.title,
        callbackYes = opts.callbackYes,
        callbackNo = opts.callbackNo,
        hideOnClick = opts.hideOnClick,
        bgVal = opts.bg,
        style = opts.style,
        onHide = opts.onHide;

    var currentBox = new Check(
        container,
        Style.createAnimationStyle(style),
        {
          title: title,
          content: content,
          callbackYes: callbackYes,
          callbackNo: callbackNo
        },
        function (){
            hideContainer();
            if(onHide) setTimeout(onHide,1);
        }
    );
    afterCreate && afterCreate(currentBox);
};

module.exports = Check;
