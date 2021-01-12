<template>
  <div id="stage"></div>
</template>

<script>
import { Scene, Sprite, Rect } from "spritejs";
export default {
  name: "basePage",
  data() {
    return {
      msg: "",
    };
  },
  components: { Scene, Sprite },
  mounted() {
    const container = document.querySelector("#stage"); //设置容器
    const scene = new Scene({
      container,
      width: 3080,
      height: 800,
      mode: "stickyTop",
    }); //设置场景

    const layer = scene.layer(); //设置分层

    //1.设置一个机器人
    const robot = new Sprite(
      "https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png"
    );

    robot.attr({
      anchor: [0, 0.5],
      pos: [0, 0],
    });

    robot.animate(
      [
        { pos: [0, 0] },
        { pos: [0, 300] },
        { pos: [2700, 300] },
        { pos: [2700, 0] },
      ],
      {
        duration: 5000,
        iterations: Infinity, //重复次数
        direction: "alternate", //方向：交替
      }
    );

    //layer.append(robot); //场景中添加机器人
    //2.设置可拖拽的矩形

    const rect = new Rect({
      normalize: true,
      pos: [600, 300],
      size: [300, 300],
      fillColor: "red",
    });
    layer.append(rect);
    layer.addEventListener("mousemove", (evt) => {
      rect.attr("x", evt.layerX);
      rect.attr("y", evt.layerY);
    console.log(evt)
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stage {
  height: 1000px;
  border: 1px solid #000;
}
</style>
