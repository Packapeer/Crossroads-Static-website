// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
/* ==========================================================================
FORMALIZE.JS
http://formalize.me/
========================================================================== */
var FORMALIZE=function(e,t,n,r){function i(e){var t=n.createElement("b");return t.innerHTML="<!--[if IE "+e+"]><br><![endif]-->",!!t.getElementsByTagName("br").length}var s="placeholder"in n.createElement("input"),o="autofocus"in n.createElement("input"),u=i(6),a=i(7);return{go:function(){var e,t=this.init;for(e in t)t.hasOwnProperty(e)&&t[e]()},init:{disable_link_button:function(){e(n.documentElement).on("click","a.button_disabled",function(){return!1})},full_input_size:function(){if(!a||!e("textarea, input.input_full").length)return;e("textarea, input.input_full").wrap('<span class="input_full_wrap"></span>')},ie6_skin_inputs:function(){if(!u||!e("input, select, textarea").length)return;var t=/button|submit|reset/,n=/date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;e("input").each(function(){var r=e(this);this.getAttribute("type").match(t)?(r.addClass("ie6_button"),this.disabled&&r.addClass("ie6_button_disabled")):this.getAttribute("type").match(n)&&(r.addClass("ie6_input"),this.disabled&&r.addClass("ie6_input_disabled"))}),e("textarea, select").each(function(){this.disabled&&e(this).addClass("ie6_input_disabled")})},autofocus:function(){if(o||!e(":input[autofocus]").length)return;var t=e("[autofocus]")[0];t.disabled||t.focus()},placeholder:function(){if(s||!e(":input[placeholder]").length)return;FORMALIZE.misc.add_placeholder(),e(":input[placeholder]").each(function(){if(this.type==="password")return;var t=e(this),n=t.attr("placeholder");t.focus(function(){t.val()===n&&t.val("").removeClass("placeholder_text")}).blur(function(){FORMALIZE.misc.add_placeholder()}),t.closest("form").submit(function(){t.val()===n&&t.val("").removeClass("placeholder_text")}).on("reset",function(){setTimeout(FORMALIZE.misc.add_placeholder,50)})})}},misc:{add_placeholder:function(){if(s||!e(":input[placeholder]").length)return;e(":input[placeholder]").each(function(){if(this.type==="password")return;var t=e(this),n=t.attr("placeholder");(!t.val()||t.val()===n)&&t.val(n).addClass("placeholder_text")})}}}}(jQuery,this,this.document);jQuery(document).ready(function(){FORMALIZE.go()});
/* ==========================================================================
Featherlight - ultra slim jQuery lightbox Version 1.3.2 CUSTOM
MIT License
Copyright 2015, Noël Raoul Bossart (http://www.noelboss.com)
http://noelboss.github.io/featherlight/
========================================================================== */
!function(e){"use strict";function t(e,n){if(!(this instanceof t)){var r=new t(e,n);return r.open(),r}this.id=t.id++,this.setup(e,n),this.chainCallbacks(t._callbackChain)}if("undefined"==typeof e)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));var n=[],r=function(t){return n=e.grep(n,function(e){return e!==t&&e.$instance.closest("body").length>0})},o=function(e,t){var n={},r=new RegExp("^"+t+"([A-Z])(.*)");for(var o in e){var i=o.match(r);if(i){var a=(i[1]+i[2].replace(/([A-Z])/g,"-$1")).toLowerCase();n[a]=e[o]}}return n},i={keyup:"onKeyUp",resize:"onResize"},a=function(n){e.each(t.opened().reverse(),function(){return n.isDefaultPrevented()||!1!==this[i[n.type]](n)?void 0:(n.preventDefault(),n.stopPropagation(),!1)})},s=function(n){if(n!==t._globalHandlerInstalled){t._globalHandlerInstalled=n;var r=e.map(i,function(e,n){return n+"."+t.prototype.namespace}).join(" ");e(window)[n?"on":"off"](r,a)}};t.prototype={constructor:t,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:e.noop,beforeContent:e.noop,beforeClose:e.noop,afterOpen:function(){$("body").removeClass("featherlight-closed").addClass("featherlight-open")},afterContent:e.noop,afterClose:function(){$("body").removeClass("featherlight-open").addClass("featherlight-closed")},onKeyUp:e.noop,onResize:e.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(t,n){"object"!=typeof t||t instanceof e!=0||n||(n=t,t=void 0);var r=e.extend(this,n,{target:t}),o=r.resetCss?r.namespace+"-reset":r.namespace,i=e(r.background||['<div class="'+o+"-loading "+o+'">','<div class="'+o+'-content">','<span class="'+o+"-close-icon "+r.namespace+'-close">',r.closeIcon,"</span>",'<div class="'+r.namespace+'-inner">'+r.loading+"</div>","</div>","</div>"].join("")),a="."+r.namespace+"-close"+(r.otherClose?","+r.otherClose:"");return r.$instance=i.clone().addClass(r.variant),r.$instance.on(r.closeTrigger+"."+r.namespace,function(t){var n=e(t.target);("background"===r.closeOnClick&&n.is("."+r.namespace)||"anywhere"===r.closeOnClick||n.closest(a).length)&&(t.preventDefault(),r.close())}),this},getContent:function(){if(this.persist!==!1&&this.$content)return this.$content;var t=this,n=this.constructor.contentFilters,r=function(e){return t.$currentTarget&&t.$currentTarget.attr(e)},o=r(t.targetAttr),i=t.target||o||"",a=n[t.type];if(!a&&i in n&&(a=n[i],i=t.target&&o),i=i||r("href")||"",!a)for(var s in n)t[s]&&(a=n[s],i=t[s]);if(!a){var c=i;if(i=null,e.each(t.contentFilters,function(){return a=n[this],a.test&&(i=a.test(c)),!i&&a.regex&&c.match&&c.match(a.regex)&&(i=c),!i}),!i)return"console"in window&&window.console.error("Featherlight: no content filter found "+(c?' for "'+c+'"':" (no target specified)")),!1}return a.process.call(t,i)},setContent:function(t){var n=this;return(t.is("iframe")||e("iframe",t).length>0)&&n.$instance.addClass(n.namespace+"-iframe"),n.$instance.removeClass(n.namespace+"-loading"),n.$instance.find("."+n.namespace+"-inner").not(t).slice(1).remove().end().replaceWith(e.contains(n.$instance[0],t[0])?"":t),n.$content=t.addClass(n.namespace+"-inner"),n},open:function(t){var r=this;if(r.$instance.hide().appendTo(r.root),!(t&&t.isDefaultPrevented()||r.beforeOpen(t)===!1)){t&&t.preventDefault();var o=r.getContent();if(o)return n.push(r),s(!0),r.$instance.fadeIn(r.openSpeed),r.beforeContent(t),e.when(o).always(function(e){r.setContent(e),r.afterContent(t)}).then(r.$instance.promise()).done(function(){r.afterOpen(t)})}return r.$instance.detach(),e.Deferred().reject().promise()},close:function(t){var n=this,o=e.Deferred();return n.beforeClose(t)===!1?o.reject():(0===r(n).length&&s(!1),n.$instance.fadeOut(n.closeSpeed,function(){n.$instance.detach(),n.afterClose(t),o.resolve()})),o.promise()},chainCallbacks:function(t){for(var n in t)this[n]=e.proxy(t[n],this,e.proxy(this[n],this))}},e.extend(t,{id:0,autoBind:"[data-featherlight]",defaults:t.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(t){return t instanceof e&&t},process:function(t){return this.persist!==!1?e(t):e(t).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp)(\?\S*)?$/i,process:function(t){var n=this,r=e.Deferred(),o=new Image,i=e('<img src="'+t+'" alt="" class="'+n.namespace+'-image" />');return o.onload=function(){i.naturalWidth=o.width,i.naturalHeight=o.height,r.resolve(i)},o.onerror=function(){r.reject(i)},o.src=t,r.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(t){return e(t)}},ajax:{regex:/./,process:function(t){var n=e.Deferred(),r=e("<div></div>").load(t,function(e,t){"error"!==t&&n.resolve(r.contents()),n.fail()});return n.promise()}},iframe:{process:function(t){var n=new e.Deferred,r=e("<iframe/>").hide().attr("src",t).css(o(this,"iframe")).on("load",function(){n.resolve(r.show())}).appendTo(this.$instance.find("."+this.namespace+"-content")).wrap('<div class="featherlight-custom-iframe"></div>');return n.promise()}},text:{process:function(t){return e("<div>",{text:t})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(t,n){var r=this,o=new RegExp("^data-"+n+"-(.*)"),i={};return t&&t.attributes&&e.each(t.attributes,function(){var t=this.name.match(o);if(t){var n=this.value,a=e.camelCase(t[1]);if(e.inArray(a,r.functionAttributes)>=0)n=new Function(n);else try{n=e.parseJSON(n)}catch(s){}i[a]=n}}),i},extend:function(t,n){var r=function(){this.constructor=t};return r.prototype=this.prototype,t.prototype=new r,t.__super__=this.prototype,e.extend(t,this,n),t.defaults=t.prototype,t},attach:function(t,n,r){var o=this;"object"!=typeof n||n instanceof e!=0||r||(r=n,n=void 0),r=e.extend({},r);var i,a=r.namespace||o.defaults.namespace,s=e.extend({},o.defaults,o.readElementConfig(t[0],a),r);return t.on(s.openTrigger+"."+s.namespace,s.filter,function(a){var c=e.extend({$source:t,$currentTarget:e(this)},o.readElementConfig(t[0],s.namespace),o.readElementConfig(this,s.namespace),r),l=i||e(this).data("featherlight-persisted")||new o(n,c);"shared"===l.persist?i=l:l.persist!==!1&&e(this).data("featherlight-persisted",l),l.open(a)}),t},current:function(){var e=this.opened();return e[e.length-1]||null},opened:function(){var t=this;return r(),e.grep(n,function(e){return e instanceof t})},close:function(){var e=this.current();return e?e.close():void 0},_onReady:function(){var t=this;t.autoBind&&(t.attach(e(document),{filter:t.autoBind}),e(t.autoBind).filter("[data-featherlight-filter]").each(function(){t.attach(e(this))}))},_callbackChain:{onKeyUp:function(e,t){return 27===t.keyCode?(this.closeOnEsc&&this.$instance.find("."+this.namespace+"-close:first").click(),!1):e(t)},onResize:function(e,t){if(this.$content.naturalWidth){var n=this.$content.naturalWidth,r=this.$content.naturalHeight;this.$content.css("width","").css("height","");var o=Math.max(n/parseInt(this.$content.parent().css("width"),10),r/parseInt(this.$content.parent().css("height"),10));o>1&&this.$content.css("width",""+n/o+"px").css("height",""+r/o+"px")}return e(t)},afterContent:function(e,t){var n=e(t);return this.onResize(t),n}}}),e.featherlight=t,e.fn.featherlight=function(e,n){return t.attach(this,e,n)},e(document).ready(function(){t._onReady()})}(jQuery);
/* ==========================================================================
jPanelMenu 1.4.1 (http://jpanelmenu.com)
MIT License
By Anthony Colangelo (http://acolangelo.com)
https://github.com/acolangelo/jPanelMenu
========================================================================== */
!function(n){n.jPanelMenu=function(e){("undefined"==typeof e||null==e)&&(e={});var t={options:n.extend({menu:"#menu",panel:"body",trigger:".menu-trigger",excludedPanelContent:"style, script",clone:!0,keepEventHandlers:!1,direction:"left",openPosition:"250px",animated:!0,closeOnContentClick:!0,keyboardShortcuts:[{code:27,open:!1,close:!0},{code:37,open:!1,close:!0},{code:39,open:!0,close:!0},{code:77,open:!0,close:!0}],duration:150,openDuration:e.duration||150,closeDuration:e.duration||150,easing:"ease-in-out",openEasing:e.easing||"ease-in-out",closeEasing:e.easing||"ease-in-out",before:function(){},beforeOpen:function(){},beforeClose:function(){},after:function(){},afterOpen:function(){},afterClose:function(){},beforeOn:function(){},afterOn:function(){},beforeOff:function(){},afterOff:function(){}},e),settings:{transitionsSupported:"WebkitTransition"in document.body.style||"MozTransition"in document.body.style||"msTransition"in document.body.style||"OTransition"in document.body.style||"Transition"in document.body.style,transformsSupported:"WebkitTransform"in document.body.style||"MozTransform"in document.body.style||"msTransform"in document.body.style||"OTransform"in document.body.style||"Transform"in document.body.style,cssPrefix:"",panelPosition:"static",positionUnits:"px"},menu:"#jPanelMenu-menu",panel:".jPanelMenu-panel",timeouts:{},clearTimeouts:function(){clearTimeout(t.timeouts.open),clearTimeout(t.timeouts.afterOpen),clearTimeout(t.timeouts.afterClose)},setPositionUnits:function(){for(var n=!1,e=["%","px","em"],o=0;o<e.length;o++){var i=e[o];t.options.openPosition.toString().substr(-i.length)==i&&(n=!0,t.settings.positionUnits=i)}n||(t.options.openPosition=parseInt(t.options.openPosition)+t.settings.positionUnits)},computePositionStyle:function(n,e){var o=n?t.options.openPosition:"0"+t.settings.positionUnits,i={};if(t.settings.transformsSupported){var s=n&&"right"==t.options.direction?"-":"",r="translate3d("+s+o+",0,0)",a="transform";e?(i="",""!=t.settings.cssPrefix&&(i=t.settings.cssPrefix+a+":"+r+";"),i+=a+":"+r+";"):(""!=t.settings.cssPrefix&&(i[t.settings.cssPrefix+a]=r),i[a]=r)}else e?(i="",i=t.options.direction+": "+o+";"):i[t.options.direction]=o;return i},setCSSPrefix:function(){t.settings.cssPrefix=t.getCSSPrefix()},setjPanelMenuStyles:function(){var e="background:#fff",o=n("html").css("background-color"),i=n("body").css("background-color"),s=function(e){var t=[];return n.each(["background-color","background-image","background-position","background-repeat","background-attachment","background-size","background-clip"],function(n,o){""!==e.css(o)&&t.push(o+":"+e.css(o))}),t.join(";")};"transparent"!==i&&"rgba(0, 0, 0, 0)"!==i?e=s(n("body")):"transparent"!==o&&"rgba(0, 0, 0, 0)"!==o&&(e=s(n("html"))),0==n("#jPanelMenu-style-master").length&&n("body").append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;'+t.options.direction+":0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;"+t.options.direction+":0;top:0;z-index:2;width:100%;min-height:100%;"+e+";}</style>")},setMenuState:function(e){var o=e?"open":"closed";n(t.options.panel).attr("data-menu-position",o)},getMenuState:function(){return n(t.options.panel).attr("data-menu-position")},menuIsOpen:function(){return"open"==t.getMenuState()?!0:!1},setMenuStyle:function(e){n(t.menu).css(e)},setPanelStyle:function(e){n(t.panel).css(e)},showMenu:function(){t.setMenuStyle({display:"block"}),t.setMenuStyle({"z-index":"1"})},hideMenu:function(){t.setMenuStyle({"z-index":"-1"}),t.setMenuStyle({display:"none"})},enableTransitions:function(e,o){var i=e/1e3,s=t.getCSSEasingFunction(o);t.disableTransitions(),n("body").append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{'+t.settings.cssPrefix+"transition: all "+i+"s "+s+"; transition: all "+i+"s "+s+";}</style>")},disableTransitions:function(){n("#jPanelMenu-style-transitions").remove()},getCSSEasingFunction:function(n){switch(n){case"linear":return n;case"ease":return n;case"ease-in":return n;case"ease-out":return n;case"ease-in-out":return n;default:return"ease-in-out"}},getJSEasingFunction:function(n){switch(n){case"linear":return n;default:return"swing"}},getVendorPrefix:function(){if("result"in arguments.callee)return arguments.callee.result;var n=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,e=document.getElementsByTagName("script")[0];for(var t in e.style)if(n.test(t))return arguments.callee.result=t.match(n)[0];return arguments.callee.result="WebkitOpacity"in e.style?"Webkit":"KhtmlOpacity"in e.style?"Khtml":""},getCSSPrefix:function(){var n=t.getVendorPrefix();return""!=n?"-"+n.toLowerCase()+"-":""},openMenu:function(e){("undefined"==typeof e||null==e)&&(e=t.options.animated),t.clearTimeouts(),t.options.before(),t.options.beforeOpen(),t.setMenuState(!0),t.showMenu();var o={none:e?!1:!0,transitions:e&&t.settings.transitionsSupported?!0:!1};if(o.transitions||o.none){o.none&&t.disableTransitions(),o.transitions&&t.enableTransitions(t.options.openDuration,t.options.openEasing);var i=t.computePositionStyle(!0);t.setPanelStyle(i),t.timeouts.afterOpen=setTimeout(function(){t.options.after(),t.options.afterOpen(),t.initiateContentClickListeners()},t.options.openDuration)}else{var s=t.getJSEasingFunction(t.options.openEasing),r={};r[t.options.direction]=t.options.openPosition,n(t.panel).stop().animate(r,t.options.openDuration,s,function(){t.options.after(),t.options.afterOpen(),t.initiateContentClickListeners()})}},closeMenu:function(e){("undefined"==typeof e||null==e)&&(e=t.options.animated),t.clearTimeouts(),t.options.before(),t.options.beforeClose(),t.setMenuState(!1);var o={none:e?!1:!0,transitions:e&&t.settings.transitionsSupported?!0:!1};if(o.transitions||o.none){o.none&&t.disableTransitions(),o.transitions&&t.enableTransitions(t.options.closeDuration,t.options.closeEasing);var i=t.computePositionStyle();t.setPanelStyle(i),t.timeouts.afterClose=setTimeout(function(){t.disableTransitions(),t.hideMenu(),t.options.after(),t.options.afterClose(),t.destroyContentClickListeners()},t.options.closeDuration)}else{var s=t.getJSEasingFunction(t.options.closeEasing),r={};r[t.options.direction]=0+t.settings.positionUnits,n(t.panel).stop().animate(r,t.options.closeDuration,s,function(){t.hideMenu(),t.options.after(),t.options.afterClose(),t.destroyContentClickListeners()})}},triggerMenu:function(n){t.menuIsOpen()?t.closeMenu(n):t.openMenu(n)},initiateClickListeners:function(){n(document).on("click touchend",t.options.trigger,function(n){t.triggerMenu(t.options.animated),n.preventDefault()})},destroyClickListeners:function(){n(document).off("click touchend",t.options.trigger,null)},initiateContentClickListeners:function(){return t.options.closeOnContentClick?void n(document).on("click touchend",t.panel,function(n){t.menuIsOpen()&&t.closeMenu(t.options.animated),n.preventDefault()}):!1},destroyContentClickListeners:function(){return t.options.closeOnContentClick?void n(document).off("click touchend",t.panel,null):!1},initiateKeyboardListeners:function(){var e=["input","textarea","select"];n(document).on("keydown",function(o){var i=n(o.target),s=!1;if(n.each(e,function(){i.is(this.toString())&&(s=!0)}),s)return!0;for(mapping in t.options.keyboardShortcuts)if(o.which==t.options.keyboardShortcuts[mapping].code){var r=t.options.keyboardShortcuts[mapping];r.open&&r.close?t.triggerMenu(t.options.animated):!r.open||r.close||t.menuIsOpen()?!r.open&&r.close&&t.menuIsOpen()&&t.closeMenu(t.options.animated):t.openMenu(t.options.animated),o.preventDefault()}})},destroyKeyboardListeners:function(){n(document).off("keydown",null)},setupMarkup:function(){n("html").addClass("jPanelMenu"),n(t.options.panel+" > *").not(t.menu+", "+t.options.excludedPanelContent).wrapAll('<div class="'+t.panel.replace(".","")+'"/>');var e=t.options.clone?n(t.options.menu).clone(t.options.keepEventHandlers):n(t.options.menu);e.attr("id",t.menu.replace("#","")).insertAfter(t.options.panel+" > "+t.panel)},resetMarkup:function(){n("html").removeClass("jPanelMenu"),n(t.options.panel+" > "+t.panel+" > *").unwrap(),n(t.menu).remove()},init:function(){t.options.beforeOn(),t.setPositionUnits(),t.setCSSPrefix(),t.initiateClickListeners(),"[object Array]"===Object.prototype.toString.call(t.options.keyboardShortcuts)&&t.initiateKeyboardListeners(),t.setjPanelMenuStyles(),t.setMenuState(!1),t.setupMarkup(),t.setPanelStyle({position:t.options.animated&&"static"===t.settings.panelPosition?"relative":t.settings.panelPosition}),t.setMenuStyle({width:t.options.openPosition}),t.closeMenu(!1),t.options.afterOn()},destroy:function(){t.options.beforeOff(),t.closeMenu(),t.destroyClickListeners(),"[object Array]"===Object.prototype.toString.call(t.options.keyboardShortcuts)&&t.destroyKeyboardListeners(),t.resetMarkup();var n={};n[t.options.direction]="auto",t.options.afterOff()}};return{on:t.init,off:t.destroy,trigger:t.triggerMenu,open:t.openMenu,close:t.closeMenu,isOpen:t.menuIsOpen,menu:t.menu,getMenu:function(){return n(t.menu)},panel:t.panel,getPanel:function(){return n(t.panel)},setPosition:function(n){("undefined"==typeof n||null==n)&&(n=t.options.openPosition),t.options.openPosition=n,t.setMenuStyle({width:t.options.openPosition})}}}}(jQuery);
/* ==========================================================================
jRespond.js v 0.10
MIT License
Author: Jeremy Fields [jeremy.fields@viget.com], 2013
https://github.com/ten1seven/jRespond
========================================================================== */
!function(a,b,c){"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=c:(a[b]=c,"function"==typeof define&&define.amd&&define(b,[],function(){return c}))}(this,"jRespond",function(a,b,c){"use strict";return function(a){var b=[],d=[],e=a,f="",g="",i=0,j=100,k=500,l=k,m=function(){var a=0;return a="number"!=typeof window.innerWidth?0!==document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth:window.innerWidth},n=function(a){if(a.length===c)o(a);else for(var b=0;b<a.length;b++)o(a[b])},o=function(a){var e=a.breakpoint,h=a.enter||c;b.push(a),d.push(!1),r(e)&&(h!==c&&h.call(null,{entering:f,exiting:g}),d[b.length-1]=!0)},p=function(){for(var a=[],e=[],h=0;h<b.length;h++){var i=b[h].breakpoint,j=b[h].enter||c,k=b[h].exit||c;"*"===i?(j!==c&&a.push(j),k!==c&&e.push(k)):r(i)?(j===c||d[h]||a.push(j),d[h]=!0):(k!==c&&d[h]&&e.push(k),d[h]=!1)}for(var l={entering:f,exiting:g},m=0;m<e.length;m++)e[m].call(null,l);for(var n=0;n<a.length;n++)a[n].call(null,l)},q=function(a){for(var b=!1,c=0;c<e.length;c++)if(a>=e[c].enter&&a<=e[c].exit){b=!0;break}b&&f!==e[c].label?(g=f,f=e[c].label,p()):b||""===f||(f="",p())},r=function(a){if("object"==typeof a){if(a.join().indexOf(f)>=0)return!0}else{if("*"===a)return!0;if("string"==typeof a&&f===a)return!0}},s=function(){var a=m();a!==i?(l=j,q(a)):l=k,i=a,setTimeout(s,l)};return s(),{addFunc:function(a){n(a)},getBreakpoint:function(){return f}}}}(this,this.document));

// Place any jQuery/helper plugins in here.

/**
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = 'master';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _pars/*	$('a.need-help-email').click(function (e) {
		e.preventDefault();
		$(this).closest('.need-help').children('.overlay-email').fadeIn();
	});
	$('a.need-help-phone').click(function (e) {
		e.preventDefault();
		$(this).closest('.need-help').children('.overlay-phone').fadeIn();
	});
	$('.need-help a.close').click(function (e) {
		e.preventDefault();
		$('.need-help .overlay').fadeOut();
	});*/eOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});
