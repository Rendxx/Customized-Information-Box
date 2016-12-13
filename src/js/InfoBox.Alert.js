/************************************************
API:
    $$.info.alert(content, title, hideOnClick, bgColor, callback)
        - content: alert content
        - title: alert title
        - callback: function be called after click OK
************************************************/

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

module.exports = Alert;
