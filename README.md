# Customized Information Box
Enable user to show their customized HTML elements in the center of screen.  

- A screen cover will be created to block mouse event to the original page.
- Clicking outside the body of the info-box will close the info-box. This feature can be disabled manually.

![preview](https://raw.githubusercontent.com/Rendxx/InfoBox/master/preview.png "Preview")

*Sample: [http://www.rendxx.com/Lib/Sample/6](http://www.rendxx.com/Lib/Sample/6 "Sample")*  
*Download: [InfoBox v3.0](https://github.com/Rendxx/InfoBox/releases/tag/3.0 "Download")*

# Dependency
- [jQuery][]

#API
    $$.info(ele, hideOnClick, bgColor, opts, onHide)      

Create and show a customized infomation box in the center of screen.  
 Short cut of **$$.info.show(...)**  

######  &nbsp;

    $$.info.show(ele, hideOnClick, bgColor, opts, onHide)
Create and show a customized infomation box in the center of screen. 

- **ele**: info-window jQuery element  
- **hideOnClick**: close when click on the background if true  
- **bgColor**: background color in (rr,gg,bb,aa)  
- **opts**:  extral options:  
    + width: width value, need to be set to "100%" if you want the info-window expand as window re-sizes  
    + height: same as width
- **onHide**: callback function when info-window hides
      
######  &nbsp;
     
    $$.info.alert(content, title, hideOnClick, bgColor, callback)
Create and show a preset alert-box in the center of screen.

- **content**: alert content
- **title**: alert title
- hideOnClick: *[same as above]*  
- bgColor: *[same as above]*  
- **callback**: function be called after clicking OK

######  &nbsp;

    $$.info.check(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 
Create and show a preset check-box in the center of screen.

- content: *[same as above]*  
- title: *[same as above]*  
- hideOnClick: *[same as above]*  
- bgColor: *[same as above]*  
- **callbackYes**: function be called after clicking YES
- **callbackNo**: function be called after clicking NO
     
######  &nbsp;

    $$.info.alert2(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 
Create and show a preset alert-box (Brief-line-style) in the center of screen.  
API is as same as **$$.info.alert(...)**.
     
######  &nbsp;

    $$.info.check2(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 
Create and show a preset check-box (Brief-line-style) in the center of screen.  
API is as same as **$$.info.alert(...)**.
     
######  &nbsp;

# Preset API
Please see the note in **InfoBox.js** for more details.

# Compatibility
- Chrome
- Fire Fox
- Safari
- Edge
- IE 9-11
- IE 7,8

[jQuery]: https://jquery.com/ "jQuery Home Page"