
$(function () {
    var btn1 = $(".btn-1");
    var btn2 = $(".btn-2");
    var btn3 = $(".btn-3");
    var btn4 = $(".btn-4");

    btn1.click(function () {
        $$.info.alert("Alert Sample. <br />Click <b>OK</b> to close.", "ALERT", false, "rgba(0,0,0,0.6)", null);
    });

    btn2.click(function () {
        $$.info.check("Check Sample.<br/>Click outside the box to cancel it.<br />Result will be shown in the button.", "CHECK", true, "rgba(0,0,0,0.6)",
            function () {
                btn2.find(".rst").html("(YES)");
            }, function () {
                btn2.find(".rst").html("(NO)");
            });
    });

    btn3.click(function () {
        var ele = $("<div class='cusInfo'>Customize Information Box Sample</div>");
        $$.info(ele, true, "rgba(255, 255, 255, 0.3)");
    });

    btn4.click(function () {
        $$.info.input({
            instruction: 'Please input number bigger than 100',
            maxlength: 5,
            errorMsg: function (data) {
                if (!/^[0-9]*$/g.test(data)) return 'Error: Only number is available';
                else if (Number(data) < 100) return 'Error: Lower than 100!';
                return null;
            }
        }, null, false, "rgba(0,0,0,0.6)", function (data) {
            btn4.find(".rst").html("input: "+data);
        });
    });
});