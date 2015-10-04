
# API Document

## Create TipBox with Options
    $$.info.show(ele, hideOnClick, bgColor, opts, onHide)
    $$.info(ele, hideOnClick, bgColor, opts, onHide)  
Create and show a customized infomation box in the center of screen. 

- **ele**: info-window jQuery element  
- **hideOnClick**: close when click on the background if true  
- **bgColor**: background color in (rr,gg,bb,aa)  
- **opts**:  extral options:  
    + width: width value, need to be set to "100%" if you want the info-window expand as window re-sizes  
    + height: same as width
- **onHide**: callback function when info-window hides

<div><br></div>


## Show Alert
    $$.info.alert(content, title, hideOnClick, bgColor, callback)
    $$.info.alert2(content, title, hideOnClick, bgColor, callback)
Create and show a preset alert-box in the center of screen.

- **content**: alert content
- **title**: alert title
- hideOnClick: *[same as above]*  
- bgColor: *[same as above]*  
- **callback**: function be called after clicking OK

<div><br></div>


## Show CheckBox
    $$.info.check(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 
    $$.info.check2(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 
Create and show a preset check-box in the center of screen.

- content: *[same as above]*  
- title: *[same as above]*  
- hideOnClick: *[same as above]*  
- bgColor: *[same as above]*  
- **callbackYes**: function be called after clicking YES
- **callbackNo**: function be called after clicking NO
     
<div><br></div>