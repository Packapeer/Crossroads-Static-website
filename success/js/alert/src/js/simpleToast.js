/*!
 * simpleToast -- jquery
 * version - v0.1.0
 * https://github.com/anxu1212/jquery.simpleToast
 */
(function ($, window) {
    'use strict';

  
    class simpleToast {
        constructor(ele, opt) {
            this.$element = $(ele);
            this.options = opt;
            this.init();
        }
        /**/
        init() {
            let toast = this.initToast(), container = this.initContainer(), icon = this.initIcon(), text = this.initText();
            container.append(icon).append(text).appendTo(toast);
            this.$element.append(toast);
            setTimeout(function () {
                toast.remove();
            }, this.options.duration);
        }
        initToast() {
            return $("<div>").addClass('toast').css({
                "z-index": this.options.zIndex
            });
        }
        initContainer() {
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
        initIcon() {
            return $("<i>").addClass(this.options.icon);
        }
        initText() {
            return $("<span>").css({
                'color': this.options.color
            }).html(this.options.content);
        }
    }
    
    simpleToast.DEFAULTS={
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
        icon: "icon-success",//loading|success|error|info|refresh
        content: "this is a message!", //提示内容
    }

    // Plugin definition.
    $.fn.simpleToast = function (option) {
        let options = $.extend({}, simpleToast.DEFAULTS, option);
        return new simpleToast(this, options);
    };

})(jQuery, window);