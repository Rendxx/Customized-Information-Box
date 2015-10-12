
$(function () {
    var btn1 = $(".btn-1");
    var btn2 = $(".btn-2");
    var btn3 = $(".btn-3");

    btn1.click(function () {
        $$.info.alert2("Alert Sample. <br />Click <b>OK</b> to close.", "ALERT", false, "rgba(0,0,0,0.6)", null);
    });

    btn2.click(function () {
        $$.info.check2("Check Sample.<br/>Click outside the box to cancel it.<br />Result will be shown in the button.", "CHECK", true, "rgba(0,0,0,0.6)",
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
});