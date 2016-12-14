# Customized Information Box
Enable user to show their customized HTML elements in the center of screen.  

- A screen cover will be created to block mouse event to the original page.
- Clicking outside the body of the info-box will close the info-box. This feature can be disabled manually.

![preview](https://raw.githubusercontent.com/Rendxx/InfoBox/master/preview.png "Preview")  

*Sample: [http://www.rendxx.com/Lib/Sample/6](http://www.rendxx.com/Lib/Sample/6 "Sample")*  
*Download: [InfoBox v0.7.0](https://github.com/Rendxx/InfoBox/releases/tag/0.7.0 "Download")*

## Install
Download the package from bower
```
bower install InfoBox --save
```

Including the file in your webpage
```HTML
<script type="text/javascript" src="/bower_components/InfoBox/dist/InfoBox.js"></script>
```

See **Code Sample** below for more details.

## API
[API Document](https://github.com/Rendxx/InfoBox/blob/master/API%20Document.md)


## Code Sample
JavaScript:

```javascript
$$.info.alert({
   content: "Alert Sample. <br />Click <b>OK</b> to close.",
   title: "ALERT",
   hideOnClick: true,
   bg: "rgba(0,0,0,0.6)"
});
// Create an alert window.
```

## Compatibility
```Chrome``` ```Fire Fox``` ```Safari``` ```Edge``` ```IE 9-11```  

## License
Copyright &copy; 2016, Rendxx. (MIT License)  
See [LICENSE][] for more info.

[LICENSE]: https://github.com/Rendxx/InfoBox/blob/master/LICENSE
