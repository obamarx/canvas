# 一.canvas简介

## 1.1什么是canvas?

`Canvas` 是由 `HTML` 代码配合高度和宽度属性而定义出的可绘制区域。`JavaScript` 代码可以访问该区域，类似于其他通用的二维 `API`，通过一套完整的绘图函数来动态生成图形。

# 二.canvas绘图

## 2.1canvas标签

### 2.1.1 canvas 标签语法和属性 

- 标签名 canvas，需要进行闭合。就是一普通的 html 标签。
- 可以设置 width 和 height 属性，但是属性值**单位必须是 px**，否则忽略。
- 注意：
  - 不要用 CSS 控制它的宽和高,会走出图片拉伸，
  - 重新设置 canvas 标签的宽高属性会让画布擦除所有的内容。
  - 可以给 canvas 画布设置背景色

### 2.1.2浏览器兼容性问题

- ie9 以上才支持 canvas, 其他现代浏览器等都支持
- 移动端的兼容情况很好，基本全部都可使用
- 2d 的支持的都非常好，3d（webgl）ie11 才支持，其他都支持

- 如果浏览器不兼容，最好进行提示

```html
例如：
<canvas id="canvasDemo">
  若浏览器显示此行文本，则该浏览器不支持canvas。
</canvas>
```

## 2.2 绘图上下文 context

- Canvas 会创建一个固定大小的画布，会公开一个或多个**渲染上下文**(画笔)，使用**渲染上下文**来绘制和处理要展示的内容。
- Canvas 自身无法绘制任何内容。Canvas 的绘图是使用 JavaScript 操作的。
- Context 对象就是 JavaScript 操作 Canvas 的接口。

```js
let canvas = document.getElementById('canvasDemo'); //获得画布（canvsa标签）
let ctx = canvas.getContext('2d'); 
```

## 2.3路径绘制

### 2.3.1canvas坐标系

而在canvas的坐标体系中,是以左上角为坐标原点，向右为x轴正方向，向下为y轴正方向，如下图

![](D:\canvas\img\坐标系.png)

### 2.3.2绘制起点

```
* 语法：ctx.moveTo(x, y);
* 解释：设置上下文绘制路径的起点。相当于移动画笔到某个位置
* 参数：x,y 都是相对于 canvas盒子的最左上角的位置坐标。
* 注意：**绘制线段前必须先设置起点。**
```

### 2.3.3绘制直线

```
* 语法：ctx.lineTo(x2, y2);
* 解释：从x2,y2的位置绘制一条直线到起点或者上一个线头点。
* 参数：x2,y2 线头点坐标。
```

### 2.3.4 路径开始和闭合

```
* 开始路径：ctx.beginPath();
* 闭合路径：ctx.closePath();
* 解释：如果是绘制不同状态的线段或者形状，必须使用开始新路径的方法把不同的绘制操作隔开。闭合路径会自动把最后的线头和开始的线头连在一起。
* beginPath: 核心的作用是将 不同绘制的形状进行隔离，
  每次执行此方法，表示重新绘制一个路径,跟之前的绘制的墨迹可以进行分开样式设置和管理。
```

### 2.3.5 描边(stroke)

```
* 语法：ctx.stroke();
* 解释：根据路径绘制线。路径只是草稿，没有实际画出来，真正绘制线必须执行stroke
```

- canvas 绘制的基本步骤小结：
  - 第一步：获得上下文 =>canvasElem.getContext('2d');
  - 第二步：开始路径规划 =>ctx.beginPath()
  - 第三步：移动起始点 =>ctx.moveTo(x, y)
  - 第四步：绘制线 =>ctx.lineTo(x, y)
  - 第五步：闭合路径 =>ctx.closePath();
  - 第六步：绘制描边 =>ctx.stroke();

html 部分：

```html
<canvas id="canvasDemo"> 若浏览器显示此行文本，则该浏览器不支持canvas。 </canvas>
```

javascript 部分：

```js
//===============基本绘制api====================
//获得画布
let canvas = document.querySelector('#canvasDemo');
let ctx = canvas.getContext('2d'); //获得上下文

canvas.width = 900; //设置标签的属性宽高
canvas.height = 600; //设置标签的属性宽高
canvas.style.border = '1px solid #000';

//绘制三角形
ctx.beginPath(); //开始路径
ctx.moveTo(100, 100); //三角形，左顶点
ctx.lineTo(300, 100); //右顶点
ctx.lineTo(300, 300); //底部的点
ctx.closePath(); //结束路径
ctx.stroke(); //描边路径
```

### 2.3.7 填充(fill)

```
* 语法：ctx.fill();
* 解释：填充，是将闭合的路径的内容填充具体的颜色。默认黑色。
* 例：填充红色 ctx.fillStyle="red";//也可填8位颜色码#FF0000
             ctx.fill();

```

### 2.3.4快速创建（rect()）、描边(strokeRect())、填充(fillRect())、清除(fillRect())矩形

```
* 创建语法：ctx.rect(x, y, width, height);
* 解释：x, y是矩形左上角坐标， width和height都是以像素计
* rect方法只是规划了矩形的路径，并没有填充和描边。

* 描边语法： ctx.strokeRect(x, y, width, height);
    - 参数跟创建语法相同，注意此方法绘制完路径后立即进行stroke绘制

* 语法：ctx.fillRect(x, y, width, height);
    - 参数跟创建语法相同， 此方法执行完成后。立即对当前矩形进行fill填充。

* 清除语法：ctx.clearRect(x, y, width, hegiht);
* 解释：清除某个矩形内的绘制的内容，相当于橡皮擦。
```

## 2.4绘制圆形（arc()）

```
语法：ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
解释： - x,y：圆心坐标。 - r：半径大小。 - sAngle:绘制开始的角度。 圆心到最右边点是 0 度，顺时针方向弧度增大。 - eAngel:结束的角度，注意是弧度。 counterclockwise：是否是逆时针。true 是逆时针，false：顺时针 - 弧度和角度的转换公式： rad = deg\*Math.PI/180;
```

![](D:\canvas\img\圆.png)

## 2.5绘制文字

```
* ctx.fillText()      在画布上绘制“被填充的”文本
* ctx.strokeText()    在画布上绘制文本（无填充）
* ctx.measureText()   返回包含指定文本宽度的对象

// 设置字体
ctx.font = "18px bold 黑体";
// 设置颜色
ctx.fillStyle = "#f00";
// 设置水平对齐方式
ctx.textAlign = "center";
// 设置垂直对齐方式
ctx.textBaseline = "middle";
// 绘制文字（参数：要写的字，x坐标，y坐标）
ctx.fillText("要写的文字", 100, 100);
```

## 2.6图像变换

### 2.6.1缩放

```
scale() 方法缩放当前绘图，更大或更小
语法：ctx.scale(scalewidth,scaleheight)
scalewidth : 缩放当前绘图的宽度 (1=100%, 0.5=50%, 2=200%, 依次类推)
scaleheight : 缩放当前绘图的高度 (1=100%, 0.5=50%, 2=200%, etc.) +注意：缩放的是整个画布，缩放后，继续绘制的图形会被放大或缩小，之前绘制的图形不会有变化。
```

### 2.6.2位移画布

```
ctx.translate(x,y) 方法重新映射画布上的 (0,0) 位置
参数说明：
x： 添加到水平坐标（x）上的值
y： 添加到垂直坐标（y）上的值
发生位移后，相当于把画布的 0,0 坐标 更换到新的 x,y 的位置，之前绘制的图形不会有变化。
```

### 2.6.3旋转

- `context.rotate(angle);` 方法旋转当前的绘图
- 注意参数是弧度（PI）
- 如需将角度转换为弧度，请使用 degrees*Math.PI/180 公式进行计算。

### 2.6.4绘制环境的保存和欢迎

- ctx.save() 保存当前环境的状态
  - 可以把当前绘制环境进行保存到缓存中。
- `ctx.restore()` 返回之前保存过的路径状态和属性

# 3.canvas框架

## 3.1框架简介    

 canvas的框架很多，而且侧重不同，

比如 Three.js 是有名的3D框架，d3.js 偏重于数据展示。

| 框架名称                              | 领域  | 移动端 | 文档       | github                                   | 其他                                                         |
| ------------------------------------- | ----- | ------ | ---------- | ---------------------------------------- | :----------------------------------------------------------- |
| [ThreeJS](https://threejs.org/)       | 3D    | 支持   | 全         | https://github.com/mrdoob/three.js       | 强大的绘图引擎                                               |
| [playCanvas](https://playcanvas.com/) | 3D    | 支持   | 全，有中文 |                                          | 游戏引擎，提供了一个可视化的编辑工具 playCanvas Editor       |
| [Egret](https://www.egret.com/)       | 2D+3D | 支持   | 全，有中文 | https://github.com/egret-labs/egret-core | 国产，多端游戏引擎                                           |
| [PixiJS](http://www.pixijs.com/)      | 2D    | 支持   | 全         | https://github.com/pixijs/pixi-particles | WebGL引擎                                                    |
| [Fabric.js](http://fabricjs.com/)     | 2D    | -      | 全         | https://github.com/fabricjs/fabric.js    |                                                              |
| [KONVA](https://konvajs.github.io/)   | 2D    |        | 全         | https://github.com/konvajs/konva         | 有专门的vue和react版本                                       |
| [spritejs](http://spritejs.org/)      | 2D    |        | 全，有中文 | https://github.com/spritejs/spritejs     | 跨平台的高性能图形系统，它能够支持web、node、桌面应用和小程序的图形绘制和实现各种动画效果。有vue版本 |

​                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

## 3.2spritejs学习

### 3.2.1特性

- 像操作DOM对象一样操作画布上的图形元素
- WebGL2渲染
- 多图层处理图形、文本、图像渲染
- DOM事件代理、自定义事件派发
- 使用ES6+语法和面向对象编程
- OffscreenCanvas和Web Worker[多线程渲染](https://spritejs.org/#/zh-cn/guide/worker)
- 结构化对象树，对[d3](https://github.com/d3/d3)引擎友好，能够无缝使用
- [服务端渲染](https://spritejs.org/#/zh-cn/guide/platforms)
- [Vue](http://vue.spritejs.org/)

### 3.2.2架构

SpriteJS Next 提供若干类基础精灵元素，可以像操作DOM元素一样在图层上操作它们。

![](D:\canvas\img\sprites.svg)