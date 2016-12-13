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

var Style = require('JS/Style.js');
var Basic = require('JS/InfoBox.Basic.js');
require('LESS/InfoBox.Input.less');

"use strict";
var Input = function(container, style, opts, onHide) {
    Basic.call(this, container, style, opts, onHide);
};
Input.prototype = Object.create(Basic.prototype);
Input.prototype.constructor = Input;

Input.prototype._buildContent = function (opts){
    var that = this;
    var title = opts.title||'',
        para = opts.para||{},
        callback = opts.callback;
    // init paramenters
    var inputType = para.type||'text',
        maxlength = para.maxlength||null,
        instruction = para.instruction||'',
        errorMsg = para.errorMsg||null;

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
        if (callback != null) setTimeout(function () { callback(v); },1);
    };

    var btnYES = wrap.querySelector('._yes');
    var btnNO = wrap.querySelector('._no');

    var that =this;
    btnYES.addEventListener("click", function(e){
        confirm(e);
    }, false);

    btnNO.addEventListener("click", function(e){
        that.hide();
    }, false);
    return wrap;
};

Input.__create = function (container, opts, afterCreate, hideContainer){
    var para = opts.para,
        title = opts.title,
        callback = opts.callback,
        hideOnClick = opts.hideOnClick,
        bgVal = opts.bg,
        style = opts.style,
        onHide = opts.onHide;

    var currentBox = new Input(
        container,
        Style.createAnimationStyle(style),
        {
          para: para,
          callback: callback
        },
        function (){
            hideContainer();
            if(onHide) setTimeout(onHide,1);
        }
    );
    afterCreate && afterCreate(currentBox);
};

module.exports = Input;
