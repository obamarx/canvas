<template>
  <div id="stage"></div>
</template>

<script>
import { Scene, Group, Path } from "spritejs";
export default {
  name: "basePage",
  data() {
    return {
      msg: ""
    };
  },
  components: { Scene, Group, Path },
  mounted() {
    const container = document.querySelector("#stage"); //设置容器
    const scene = new Scene({
      container,
      width: 1200,
      height: 600
    });
    const layer = scene.layer();
    const arcD = "M0 0L 50 0A50 50 0 0 1 43.3 25z";

    const group = new Group();
    group.attr({
      size: [300, 300],
      pos: [600, 300],
      anchor: [0.5, 0.5],
      bgcolor: "#cec",
      borderRadius: 150
    });
    layer.append(group);

    for (let i = 0; i < 6; i++) {
      const arc = new Path();
      arc.attr({
        d: arcD,
        scale: 3,
        anchor: [0, 0.5],
        strokeColor: "red",
        fillColor: `rgb(${(i * 99) % 255}, 0, 0)`,
        rotate: i * 60
      });
      group.append(arc);
    }

    group.animate([{ rotate: 0 }, { rotate: 360 }], {
      duration: 3000,
      iterations: Infinity
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stage {
  height: 1000px;
  border: 1px solid #000;
}
</style>
