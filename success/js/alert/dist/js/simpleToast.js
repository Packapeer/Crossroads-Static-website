'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * simpleToast -- jquery
 * version - v0.1.0
 * https://github.com/anxu1212/jquery.simpleToast
 */
(function ($, window) {
    'use strict';

    var simpleToast = function () {
        function simpleToast(ele, opt) {
            _classCallCheck(this, simpleToast);

            this.$element = $(ele);
            this.options = opt;
            this.init();
        }
        /**/


        _createClass(simpleToast, [{
            key: 'init',
            value: function init() {
                var toast = this.initToast(),
                    container = this.initContainer(),
                    icon = this.initIcon(),
                    text = this.initText();
                container.append(icon).append(text).appendTo(toast);
                this.$element.append(toast);
                setTimeout(function () {
                    toast.remove();
                }, this.options.duration);
            }
        }, {
            key: 'initToast',
            value: function initToast() {
                return $("<div>").addClass('toast').css({
                    "z-index": this.options.zIndex
                });
            }
        }, {
            key: 'initContainer',
            value: function initContainer() {
                return $("<div>").addClass('animated').css({
                    'animation-duration': this.options.animateDuration / 1000 + 's',
                    'background': this.options.background,
                    'opacity': this.options.opacity,
                    'min-width': this.options.minWidth,
                    'max-width': this.options.maxWidth,
                    'font-size': this.options.fontSize,
                    'padding': this.options.padding,
                    'border-radius': this.options.borderRadius
                }).addClass(this.options.animateIn);
            }
        }, {
            key: 'initIcon',
            value: function initIcon() {
                return $("<i>").addClass(this.options.icon);
            }
        }, {
            key: 'initText',
            value: function initText() {
                return $("<span>").css({
                    'color': this.options.color
                }).html(this.options.content);
            }
        }]);

        return simpleToast;
    }();

    simpleToast.DEFAULTS = {
        minWidth: "100px",
        maxWidth: "200px",
        padding: "10px",
        background: "#2b2a2a",
        opacity: 0.9,
        zIndex: 9999, //层级
        borderRadius: "6px", //圆角
        duration: 2000, //toast 显示时间
        animateIn: "boxBounceIn", //进入的动画
        animateDuration: 500, //执行动画时间
        color: "#ffffff",
        fontSize: "16px", //字体大小
        icon: "icon-success", //loading|success|error|info|refresh
        content: "this is a message!" //提示内容


        // Plugin definition.
    };$.fn.simpleToast = function (option) {
        var options = $.extend({}, simpleToast.DEFAULTS, option);
        return new simpleToast(this, options);
    };
})(jQuery, window);