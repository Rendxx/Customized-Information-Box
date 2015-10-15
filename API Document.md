
# API Document

#### $$.info (content, hideOnClick, bgColor [, opts [, onHide]])  
#### $$.info.show (content, hideOnClick, bgColor [, opts [, onHide]])
Create and show a customized infomation box in the center of screen. 

- **content** ```jQuery Object```  
Custom content, HTML format.

- **hideOnClick** ```boolean```  
Hide the information box when click outside the box if true.

- **bgColor** ```string```  
Background color cover the reset of the page.  
String format is as same as CSS color format:
  1. ```#rgb``` 
  2. ```rgba(r,g,b,a)```

- **onHide** ```function```  
Callback function. Triggered when info-window hides.

<h1></h1>

#### $$.info.alert (content, title, hideOnClick, bgColor [, callback])
#### $$.info.alert2 (content, title, hideOnClick, bgColor [, callback])

Show alert with customized HTML in the center of screen.

- **content** ```string```  
Custom content, HTML format string.

- **title** ```string```  
Title of the alert box.

- **hideOnClick** ```string```  
*[same as above]*

- **bgColor** ```string```  
*[same as above]*

- **callback** ```function```  
Callback function. Triggered when info-window hides.

<h1></h1>

#### $$.info.check (content, title, hideOnClick, bgColor [, callbackYes, callbackNo]) 
#### $$.info.check2 (content, title, hideOnClick, bgColor [, callbackYes, callbackNo]) 

Show check-box with customized HTML in the center of screen.

- **content** ```string```  
 *[same as above]*  

- **title** ```string```  
 *[same as above]* 

- **hideOnClick** ```string```  
*[same as above]*

- **bgColor** ```string```  
*[same as above]* 

- **callbackYes** ```function```  
Callback function. Triggered after "Yes" being clicked.

- **callbackNo** ```function```  
Callback function. Triggered after "No" being clicked.
     