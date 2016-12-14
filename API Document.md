
# API Document

### <a name="info">$$.info (opts)</a>
### $$.info.show (opts)
Create and show a customized information box in the center of screen.  

- **content** ```DOM-node | string```  
  Content you want to show in the info-box.   
  Available value includes DOM-node or a string representing a DOM-node.

- **hideOnClick** ```boolean```  
  Hide the information box when click outside the box.

- **bg** ```string```  
  Change the style of the screen cover.  
  Receive a string following the rule of the CSS ```background``` property.

- **style** ```object```  
  Customize style. Defining the show / hide animation and info-box style.  
  See [Style](#style) for more detail

- **onHide** ```function```  
  Callback function. Triggered when info-window hides.   


### $$.info.hide ()
close the information box.
<h1></h1>

### $$.info.alert (opts)

Show alert with customized HTML in the center of screen.

- **content** ```string```  
  Custom content, string in HTML format.

- **title** ```string```  
  Title of the info-box.

- **callback** ```function```  
  Callback function. Triggered after click **OK**.


*[[Properties below are as same as __$$.info__]](#info)*
- **hideOnClick** ```boolean```  
- **bg** ```string```  
- **style** ```object```  
- **onHide** ```function```

<h1></h1>

#### $$.info.check (opts)

Show check-box with customized HTML in the center of screen.

- **content** ```string```  
  Custom content, string in HTML format

- **title** ```string```  
  Title of the info-box.

- **callbackYes** ```function```  
  Callback function. Triggered after "Yes" being clicked.

- **callbackNo** ```function```  
  Callback function. Triggered after "No" being clicked.


*[[Properties below are as same as __$$.info__]](#info)*
- **hideOnClick** ```boolean```  
- **bg** ```string```  
- **style** ```object```  
- **onHide** ```function```


<h1></h1>

### $$.info.input (opts)

Show input-box in the center of screen for user to enter text.
- **para** ```object```  
  Parameters to define input box.
  + **type** ```string```   
    text / password / ... (avilable type for input dom element)
  + **maxlength** ```number```   
    max length of the input
  + **instruction** ```string```   
    instruction shows below the input box
  + **errorMsg** ```function(data)```   
    A function be called right after confirming input. Be used to produce error message when the input is illegal.  
Return null indicates no error occur. Otherwise a string of error message will be returned, this message will be shown below the input box.  
The input will not complele if an error is occur.

- **title** ```string```  
  Title of the info-box.

- **callback** ```function(data)```  
  Callback function. Triggered after input completes. The input value will be passed to the function as argument.


*[[Properties below are as same as __$$.info__]](#info)*
- **hideOnClick** ```boolean```  
- **bg** ```string```  
- **style** ```object```  
- **onHide** ```function```


<h1></h1>

### <a name="style">Style</a>

It defines the show / hide animation of the info-box by setting the style before / after showing.  
It receive either a predefined style name or an object of css properties.


- **before** ```string | object```  
  The css style before info-box show up.

- **show** ```string | object```  
  The css style of the info-box container.

- **hide** ```string | object```  
  The css style after the info-box hide.
