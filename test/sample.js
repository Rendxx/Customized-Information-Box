
    var btn1 = document.querySelector(".btn-1");
    var btn2 = document.querySelector(".btn-2");
    var btn3 = document.querySelector(".btn-3");
    var btn4 = document.querySelector(".btn-4");

    btn1.addEventListener('click', function(e){
        $$.info.alert({
          content: "Alert Sample. <br />Customize style: slide from top",
          title: "ALERT",
          bg: "rgba(0,0,0,0.6)",
          style:{
            before:{
                'top':'-50%'
            },
            show:{
                'top':0,
                'transition': '0.2s'
            },
            hide:{
                'top':'-50%',
                'transition': '0.2s'
            },
            inner:{
                'transform': 'translate(-50%,0)'
            }
          }
        });
    }, false);

    btn2.addEventListener('click', function(e){
        $$.info.check({
          content: "Check Sample.<br/>Click outside the box to cancel it.<br />Result will be shown in the button.",
          title: "CHECK",
          hideOnClick: true,
          bg: "rgba(0,0,0,0.6)",
          callbackYes: function () {
              btn2.querySelector(".rst").innerHTML="(YES)";
          },
          callbackNo: function () {
              btn2.querySelector(".rst").innerHTML="(NO)";
          }
        });
    }, false);

    btn3.addEventListener('click', function(e){
        var dom = document.createElement('DIV');
        dom.className = "cusInfo";
        dom.innerHTML = 'Customize Information Box Sample.'
        $$.info({
          content: dom,
          hideOnClick: true,
          bg: "rgba(255, 255, 255, 0.3)"
        });
    }, false);

    btn4.addEventListener('click', function(e){
        $$.info.input({
          para:{
              instruction: 'Please input number bigger than 100',
              maxlength: 5,
              errorMsg: function (data) {
                  if (!/^[0-9]*$/g.test(data)) return 'Error: Only number is available';
                  else if (Number(data) < 100) return 'Error: Lower than 100!';
                  return null;
              }
          },
          bg: "rgba(0,0,0,0.6)",
          callback: function (data) {
              btn4.querySelector(".rst").innerHTML="input: "+data;
          }
        });
    }, false);
