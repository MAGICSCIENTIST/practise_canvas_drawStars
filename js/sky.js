//宇宙特效
"use strict";
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,

    hue = 217,
    stars = [],
    count = 0,
    maxStars = 1300;//星星数量
//maxStars = 2;//星星数量

var canvasBg = document.createElement('canvas')
canvasBg.width = window.innerWidth;
canvasBg.height = window.innerHeight;
var ctxbg = canvasBg.getContext('2d');
ctxbg.globalCompositeOperation = 'destination-over';
ctxbg.globalAlpha = 0.5; //尾巴
// ctxbg.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
ctxbg.fillStyle = 'red';
ctxbg.fillRect(0, 0, 100, 100)

//每个球
var canvas2 = document.createElement('canvas')
var ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2
var gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

var settings = {
    // starDensity: 1.0,
    mouseScale: 2.0,
    seedMovement: true
}
var curScale = 1;
var scaleRadius = .1 //一次一倍
var deltaX = 0
var deltaY = 0
// EVENT HANDLERS
$(canvas).mousemove(function (e) {

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
// window.addEventListener("wheel", function (event) {
//     return
//     var $this = $(this)
//     var width = $this.width();
//     var height = $this.height();
//     var delta = Math.sign(event.deltaY);
//     if (delta > 0) {
//         // 放大
//         var radius = 1 + scaleRadius

//         if (curScale * radius > 2) {
//             radius = 2 / curScale
//             curScale = 2
//         } else {
//             curScale = curScale * radius
//         }
//         //缩放
//         ctx.scale(radius, radius)
//         //中心点对齐
//         deltaX -= (width * radius / 2) - width / 2
//         deltaY -= (height * radius / 2) - height / 2
//         //反向移动到鼠标点
//         deltaX -= (event.x - width / 2) * radius
//         deltaY -= (event.y - height / 2) * radius

//         // deltaX = deltaX * radius //放大
//         // deltaX += (event.x - width / 2) * radius                     //平移        
//         // deltaY = deltaY * radius //放大
//         // deltaY += (event.y - height / 2) * radius                     //平移        
//     }
//     else {
//         var radius = 1 / (1 + scaleRadius)
//         if (curScale * radius < 1) {
//             // 阻止缩小
//             radius = 1 / curScale
//             curScale = 1
//         }
//         else {
//             curScale = curScale * radius
//         }

//         //缩放
//         ctx.scale(radius, radius)
//         //中心点对齐
//         deltaX += (width * radius / 2) - width / 2
//         deltaY += (height * radius / 2) - height / 2
//         //反向移动到鼠标点
//         deltaX += (event.x - width / 2) * radius
//         deltaY += (event.y - height / 2) * radius


//         // ctx.scale(radius, radius)
//         // deltaX = deltaX * radius //放大
//         // deltaX += (event.x - width / 2) * radius                     //平移        
//         // deltaY = deltaY * radius //放大
//         // deltaY += (event.y - height / 2) * radius                     //平移        

//     }
//     console.log(curScale)
//     console.log(deltaX)
//     console.log(deltaY)
// });
canvas.addEventListener('click', function (event) {
    var x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;

    console.log(event)
    // Collision detection between clicked offset and element.
    for (let i = 1; i < stars.length; i++) {
        const element = stars[i];
        if (y > element.top && y < element.top + element.radius
            && x > element.left && x < element.left + element.radius) {
            $("#infoPanel .id").text(element.id);
            $("#infoPanel .number").text("这是第" + i + "颗星星");
            break
        }
    }

}, false);
// EVENT HANDLERS end


// End cache

function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }

    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y) {
    var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
    //星星移动范围，值越大范围越小，
}

var Star = function () {

    this.id = Math.random()
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 8;
    //星星大小
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 50000;
    //星星移动速度
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
}

Star.prototype.draw = function () {
    //test
    // var gkhead = new Image;
    // gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';
    // return
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX + deltaX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY + deltaY,
        twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
    }

    //console.log(this.radius)
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
    this.left = x - this.radius / 2;
    this.top = y - this.radius / 2;
}

for (var i = 0; i < maxStars; i++) {
    new Star();
}

function animation() {

    // var p1 = ctx.transformedPoint(0, 0);
    // var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    // ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    // ctx.save();
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.restore();
    ctxbg.fillStyle = 'red';
    ctxbg.fillRect(0, 0, w, h)


    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.5; //尾巴
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
    ctx.fillRect(-w, -h, 3 * w, 3 * h)
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
    };


    window.requestAnimationFrame(animation);
}

animation();
initCanvas(canvas, function () {
    return
    var p1 = ctx.transformedPoint(0, 0);
    var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
})