var StyleFunc = function() {};
StyleFunc.prototype = {
    createAnimationStyle: function(css) {
        var css = css || {};
        css.before = css.before || 'fade';
        css.show = css.show || 'none';
        css.hide = css.hide || 'fade';
        css.inner = css.inner || 'none';

        var style = {
            before: {},
            show: {},
            hide: {},
            inner: {}
        };

        // before
        var cssPkg = {};
        if (typeof(css.before) === "string") {
            if (Style.hasOwnProperty(css.before))
                cssPkg = Style[css.before];
        } else {
            cssPkg = css.before;
        }
        for (var i in cssPkg) style.before[i] = cssPkg[i];

        // show
        cssPkg = {};
        if (typeof(css.show) === "string") {
            if (Style.hasOwnProperty(css.show))
                cssPkg = Style[css.show];
        } else {
            cssPkg = css.show;
        }
        for (var i in cssPkg) style.show[i] = cssPkg[i];

        // hide
        cssPkg = {};
        if (typeof(css.hide) === "string") {
            if (Style.hasOwnProperty(css.hide))
                cssPkg = Style[css.hide];
        } else {
            cssPkg = css.hide;
        }
        for (var i in cssPkg) style.hide[i] = cssPkg[i];

        // inner
        cssPkg = {};
        if (typeof(css.hide) === "string") {
            if (Style.hasOwnProperty(css.inner))
                cssPkg = Style[css.inner];
        } else {
            cssPkg = css.inner;
        }
        for (var i in cssPkg) style.inner[i] = cssPkg[i];

        return style;
    }
};

var Style = new StyleFunc();
Style['none'] = {};
Style['fade'] = {
    'opacity': 0
};
Style['slideTop'] = {
    'top': '-50%'
};
module.exports = Style;
