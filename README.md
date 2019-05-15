# practise_canvas_drawStars


![Image of Yaktocat](./docs/assets/shortcut.png)

[参考栗子-画星星](http://www.jq22.com/jquery-info13901)
[参考栗子-缩放拖拽](https://codepen.io/techslides/pen/zowLd?editors=0010)
[参考栗子-鼠标移动](http://www.htmleaf.com/html5/html5-canvas/201505041778.html)

#部分设置
``` javascript
//sky.js
//注释掉就不转了
  this.timePassed += this.speed;  
  //跟着鼠标走的镜头效果
  $(canvas).mousemove(function (e) {
      //缩放过高就取消效果, 注释掉就所有级别都有了
    if (ctx.curScale > 2) {
        return
    }
    var $this = $(this);

    var offset = $this.offset();
    var width = $this.width();
    var height = $this.height();

    var centerX = width / 2;
    var centerY = height / 2;

    var distanceX = ((e.pageX - offset.left) - centerX);
    var distanceY = ((e.pageY - offset.top) - centerY);

    deltaX = Math.round(settings.mouseScale * (distanceX / 40));
    deltaY = Math.round(settings.mouseScale * (distanceY / 40));
});
```
``` javascript
//panl.js
  if(ctx.curScale*factor <1){ //这个条件永远为false就可以无限缩放了
            ctx.scale(1, 1);
            ctx.translate(-pt.x, -pt.y);
        }else{
            ctx.scale(factor, factor);
            ctx.translate(-pt.x, -pt.y);
            ctx.curScale = ctx.curScale*factor
        }       
```
#具体讲解
<span style="color:#d1d1d1">TODO: 有缘完善</span>
## scale 缩放
## translate 平移
## drawimage
## clearRect 结合缩放的清空
## globalCompositeOperation 合成模式(很像拓扑)