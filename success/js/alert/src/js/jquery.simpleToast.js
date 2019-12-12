/*!
 * simpleToast -- jquery
 * version - v0.0.2
 * https://github.com/anxu1212/jquery.simpleToast
 */
(function ($, window) {
    'use strict';

  
    var simpleToast = function (ele, opt) {
        this.$element = ele;
        this.defaults = {
            minWidth: "100px",
            maxWidth: "200px",
            padding: "10px",
            background: "#2b2a2a",
            opacity: 0.9,
            zIndex: 9999, //层级
            borderRadius: "6px", //圆角
            duration: 1000, //toast 显示时间
            animateIn: "boxBounceIn", //进入的动画
            animateDuration: 500, //执行动画时间
            color: "#ffffff",
            fontSize: "16px", //字体大小
            icon: "icon-success",
            content: "this is a message!", //提示内容

        };
        this.options = $.extend({}, this.defaults, opt);
    };

    /**/
    simpleToast.prototype.showBox = function () {

        let container = this.createBox();

        setTimeout(function(){
            container.remove();
        },this.options.duration);

        return this.$element.append(container)
    }

    simpleToast.prototype.createBox = function () {
        let container = $("<div></div>").addClass('toast').css({
            "z-index": this.options.zIndex
        });
        let box = $("<div class='animated'></div>").css({
            'animation-duration': this.options.animateDuration / 1000 + 's',
            'background': this.options.background,
            'opacity': this.options.opacity,
            'min-width': this.options.minWidth,
            'max-width': this.options.maxWidth,
            'font-size': this.options.fontSize,
            'padding': this.options.padding,
            'border-radius': this.options.borderRadius
        }).addClass(this.options.animateIn).appendTo(container);

        $("<i></i>").addClass(this.options.icon).appendTo(box);
        $("<span></span>").css({
            'color': this.options.color
        }).html(this.options.content).appendTo(box);

        return container;
    }

    // Plugin definition.
    $.fn.simpleToast = function (options) {
        var toast = new simpleToast(this, options);
        return toast.showBox();
    };


})(jQuery, window);