

```js
$('#t1').on('click',function(){
    $('body').simpleToast({
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
    });
});
```