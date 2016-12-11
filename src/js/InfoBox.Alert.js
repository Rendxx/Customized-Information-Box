/************************************************
API:
    $$.info.alert(content, title, hideOnClick, bgColor, callback)
        - content: alert content
        - title: alert title
        - callback: function be called after click OK
************************************************/

var Basic = require('./InfoBox.Basic.js');
var Style = require('../less/InfoBox.Alert.less');

"use strict";
var Alert = function(container, style, cb, title, content, onOK) {
    var domNode = this._buildContent(title, content);
    container.appendChild(domNode);
    Basic.call(this, container, style, cb);
};
Alert.prototype = Object.create(Basic.prototype);
Alert.prototype.constructor = Alert;

Alert.prototype._buildContent = function (title, content){
    var wrap = document.createElement("DIV");
    wrap.className = '_alert _innerWrap';
    wrap.innerHTML = '<div class="_title">#title#</div><div class="_content">#content#</div><div class="_line"></div><div class="_ok">OK</div>'.replace('#title#', title).replace('#content#', content);

    var btnOK = wrap.querySelector('._ok');
    btnOK.addEventListener("click", function(e){
        onOK && onOK(e);
        this.hide();
    }.bind(this), false);
    return wrap;
};

module.exports = Alert;
