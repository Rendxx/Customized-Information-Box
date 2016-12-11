var TransitionEnd = function (){
  var getEventName = function () {
      var el = document.createElement('div');
      var transEndEventNames = {
          'WebkitTransition': 'webkitTransitionEnd',
          'MozTransition': 'transitionend',
          'OTransition': 'oTransitionEnd otransitionend',
          'transition': 'transitionend'
      };

      for (var name in transEndEventNames) {
          if (el.style[name] !== undefined) {
              return transEndEventNames[name];
          }
      }

      return null;
  };
  var _transitionEnd = null;
  this.name = function (){
      if (_transitionEnd==null) _transitionEnd=getEventName();
      return _transitionEnd;
  };
};

module.exports = new TransitionEnd();
