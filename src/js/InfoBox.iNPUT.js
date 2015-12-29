/************************************************ 
Customized Information Box - Preset Input
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Update: 2015-12-29

Show a window with an input field.

API:
    $$.info.input(inputPara, title, hideOnClick, bgColor, callback)
        - inputPara: parameters to define input
            + type: text / password / ... (avilable type for input dom element)
            + maxlength : max length of the input
            + instruction: instruction shows below the input box
            + errorMsg: A function be called right after confirming input. Be used to produce error message when the input is illegal.
                        Return null indicates no error occur. Otherwise a string of error message will be returned, this message will be shown below the input box.
                        The input will not complele if an error is occur.
        - callback: function be called after input completes
************************************************/

(function () {
    "use strict";
    if (window.$$ == null || window.$$.info == null || window.$$.info.preset == null) throw new Error('Relied component missing.');
    var Input = function (info) {
        var _setuped = false;       // whether this infobox has been setuped

        // setup css, this should only run only
        var setupCss = function () {
            if (_setuped) return;
            _setuped = true;
            info.preset.css(_name, _css);
        };

        var show = function (inputPara, title, hideOnClick, bgColor, callback) {
            setupCss();
            // init paramenters
            var inputType = 'text',
                maxlength = null,
                instruction = null,
                errorMsg = null;

            if (inputPara!=null){
                if (inputPara.type) inputType = inputPara.type;
                if (inputPara.maxlength) maxlength = inputPara.maxlength;
                if (inputPara.instruction) instruction = inputPara.instruction;
                if (inputPara.errorMsg) errorMsg = inputPara.errorMsg;
            }

            // build html
            var ele = info.preset.html(_name, _html.replace(/#title#/g, title).replace(/#instruction#/g, instruction)),
                input = ele.find("input"),
                err = ele.find(".r-info-error");

            if (title == null) ele.find(".r-info-title").html("").height(0);
            if (instruction == null) ele.find(".r-info-instruction").html("").css('margin-top', 0);

            input.attr('type', inputType || 'text');
            if (maxlength) input.attr('maxlength', maxlength);

            // confirm function
            var confirm = function (e) {
                var v = input.val();
                if (errorMsg != null) {
                    var errMsg = errorMsg(v);
                    if (errMsg != null) {
                        err.html(errMsg).css('margin-top', '5px');
                        return;
                    }
                }

                info.hide(e);
                if (callback != null) setTimeout(function () { callback(v); },1);
            };

            // bind callback function


            ele.find(".r-info-btn-yes").click(function (e) {
                confirm();
            });
            ele.find(".r-info-btn-no").click(function (e) {
                info.hide(e);
            });

            info.show(ele, hideOnClick, bgColor, null);
        };

        // Initialize the whole function
        var init = function () {
            info.input = show;
        };
        init();

        // data ----------------------------------------------------------------
        var _name = 'r-info-input';
        var _html = '<div class="r-info-wrap"><div class="r-info-innerWrap"><div class="r-info-title">#title#</div><div class="r-info-content"><input  /><div class="r-info-instruction">#instruction#</div><div class="r-info-error"></div></div><div class="r-info-line"></div><div class="r-info-btn r-info-btn-yes">YES</div><div class="r-info-btn r-info-btn-no">NO</div></div></div>';
        var _css= {
            'r-info-wrap': {
                'width': '460px',
                'height': 'auto',
                'background-color': '#f2f2f2',
                'color': '#333',
                'text-align': 'center',
                'font-size': '14px',
                'font-weight': '500',
                'border': '1px solid #fff',
                'font-family': ' Calibri, Helvetica, sans-serif',
                'position': 'relative',
                'top': '0',
                'left': '0'
            },
            'r-info-innerWrap': {
                'width': '440px',
                'height': 'auto',
                'border': '0px',
                'margin': '10px'
            },
            'r-info-title': {
                'width': '100%',
                'height': '40px',
                'line-height': '40px',
                'font-size': '22px',
                'font-weight': '400',
                'margin': '0px',
                'color': '#333',
                'letter-spacing': '2px',
                'padding': '12px 0',
                'margin': '0',
                'margin-left': '-1px'
            },
            'r-info-content': {
                'margin': '0px auto',
                'margin-bottom': '25px',
                'width': '90%',
                'height': 'auto',
                'line-height': '20px'
            },

            'r-info-content input': {
                'display': 'block',
                'outline': 'none',
                'resize': 'none',
                'text-align': 'center!important',
                'padding': '8px 10px',
                'background-color': '#fff',
                'border': '1px solid #ccc',
                'margin': '0 auto',
                'width':  '90%'
            },
            '::-webkit-input-placeholder': {
                'text-align': 'center'
            },
            ':-moz-placeholder': {
                'text-align': 'center'
            },
            '::-moz-placeholder': {
                'text-align': 'center'
            },
            ':-ms-input-placeholder': {
                'text-align': 'center'
            },

            'r-info-instruction': {
                'margin': '0px auto',
                'margin-top': '10px',
                'width': '90%',
                'height': 'auto',
                'line-height': '20px',
                'color': '#999'
            },
            'r-info-error': {
                'margin': '0px auto',
                'width': '340px',
                'height': 'auto',
                'line-height': '20px',
                'color': '#600',
                '-moz-transition': '0.2s',
                '-o-transition': '0.2s',
                '-webkit-transition': '0.2s',
                'transition': '0.2s'
            },
            'r-info-line': {
                'margin': '0px auto',
                'margin-bottom': '53px',
                'width': '75%',
                'height': '1px',
                'line-height': '1px',
                'background-color': '#ccc'
            },
            'r-info-btn': {
                'position': 'absolute',
                'bottom': '13px',
                'margin': '0px',
                'width': '100px',
                'height': '32px',
                'line-height': '32px',
                'font-size': '20px',
                'font-weight': '300',
                'letter-spacing': '4px',
                'color': '#666',
                'cursor': 'pointer'
            },
            'r-info-btn:hover': {
                'color': '#111'
            },
            'r-info-btn-yes': {
                'left': '80px'
            },
            'r-info-btn-no': {
                'right': '80px'
            }
        };
    };
    var input = new Input(window.$$.info);
})();