# Customized Information Box
Enable user to show their customized HTML elements in the center of screen.  

- A screen cover will be created to block mouse event to the original page.
- Clicking outside the body of the info-box will close the info-box. This feature can be disabled manually.

# Dependency
- [jQuery][]

#API
    $$.info(ele, hideOnClick, bgColor, opts, onHide)      

- Short cut of **$$.info.show(...)**  

---

    $$.info.show(ele, hideOnClick, bgColor, opts, onHide)

- **ele**: info-window jQuery element  
- **hideOnClick**: close when click on the background if true  
- **bgColor**: background color in (rr,gg,bb,aa)  
- **opts**:  extral options:  
    + width: width value, need to be set to "100%" if you want the info-window expand as window re-sizes  
    + height: same as width
- **onHide**: callback function when info-window hides
       
---
     
    $$.info.alert(content, title, hideOnClick, bgColor, callback)
 
- **content**: alert content
- **title**: alert title
- hideOnClick: *[same as above]*  
- bgColor: *[same as above]*  
- **callback**: function be called after clicking OK

---

    $$.info.check(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 

- content: *[same as above]*  
- title: *[same as above]*  
- hideOnClick: *[same as above]*  
- bgColor: *[same as above]*  
- **callbackYes**: function be called after clicking YES
- **callbackNo**: function be called after clicking NO
     
---

    $$.info.alert2(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 

- API is as same as **$$.info.alert(...)**. This is a Brief-line-style version of it.
     
---

    $$.info.check2(content, title, hideOnClick, bgColor, callbackYes, callbackNo) 

- API is as same as **$$.info.check(...)**. This is a Brief-line-style version of it.
     
# Compatibility:
- Chrome
- Fire Fox
- Safari
- Edge
- IE 9-11
- IE 7,8

[jQuery]: https://jquery.com/ "jQuery Home Page"