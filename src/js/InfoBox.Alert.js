/************************************************
API:
    $$.info.alert(opts)
        - content: content
        - title: title
        - callback: function be called after click OK
        - other: ...
************************************************/

var Style = require('JS/Style.js');
var Basic = require('JS/InfoBox.Basic.js');
require('LESS/InfoBox.Alert.less');

"use strict";
var Alert = function(container, style, opts, onHide) {
    Basic.call(this, container, style, opts, onHide);
};
Alert.prototype = Object.create(Basic.prototype);
Alert.prototype.constructor = Alert;

Alert.prototype._buildContent = function (opts){
    var title = opts.title||'',
        content = opts.content||'',
        callback = opts.callback||null;

    var wrap = document.createElement("DIV");
    wrap.className = '_alert _innerWrap';
    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content">#content#</div><div class="_line"></div><div class="_ok">OK</div>'.replace(/#title#/g, title).replace(/#content#/g, content);

    var that =this;
    var btnOK = wrap.querySelector('._ok');
    btnOK.addEventListener("click", function(e){
        callback && callback(e);
        that.hide();
    }, false);
    return wrap;
};

Alert.__create = function (container, opts, afterCreate, hideContainer){
    var content = opts.content,
        title = opts.title,
        callback = opts.callback,
        hideOnClick = opts.hideOnClick,
        bgVal = opts.bg,
        style = opts.style,
        onHide = opts.onHide;

    var currentBox = new Alert(
        container,
        Style.createAnimationStyle(style),
        {
          title: title,
          content: content,
          callback: callback
        },
        function (){
            hideContainer();
            if(onHide) setTimeout(onHide,1);
        }
    );
    afterCreate && afterCreate(currentBox);
};

module.exports = Alert;
