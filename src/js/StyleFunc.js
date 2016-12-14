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
            if (this.hasOwnProperty(css.before))
                cssPkg = this[css.before];
        } else {
            cssPkg = css.before;
        }
        for (var i in cssPkg) style.before[i] = cssPkg[i];

        // show
        cssPkg = {};
        if (typeof(css.show) === "string") {
            if (this.hasOwnProperty(css.show))
                cssPkg = this[css.show];
        } else {
            cssPkg = css.show;
        }
        for (var i in cssPkg) style.show[i] = cssPkg[i];

        // hide
        cssPkg = {};
        if (typeof(css.hide) === "string") {
            if (this.hasOwnProperty(css.hide))
                cssPkg = this[css.hide];
        } else {
            cssPkg = css.hide;
        }
        for (var i in cssPkg) style.hide[i] = cssPkg[i];

        // inner
        cssPkg = {};
        if (typeof(css.hide) === "string") {
            if (this.hasOwnProperty(css.inner))
                cssPkg = this[css.inner];
        } else {
            cssPkg = css.inner;
        }
        for (var i in cssPkg) style.inner[i] = cssPkg[i];

        return style;
    }
};

module.exports = StyleFunc;
