var Func = {
    addClass: function (dom, className){
      dom.className += ' ' +className;
    },
    removeClass: function (dom, className){
      dom.className = dom.className
        .replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ')
        .replace(/'\\s+'/g, ' ');
    }
};

module.exports = Func;
