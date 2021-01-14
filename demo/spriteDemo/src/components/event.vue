<template>
  <div id="stage"></div>
</template>

<script>
import { Scene, Label  } from "spritejs";
export default {
  name: "basePage",
  data() {
    return {
      msg: ""
    };
  },
  components: { Scene, Label },
  mounted() {
    const container = document.querySelector("#stage"); //设置容器
    const scene = new Scene({
      container,
      width: 1200,
      height: 600
    });
    const layer = scene.layer();
    const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    for (let i = 0; i < 3; i++) {
      const keyButtons = [...keys[i]];
      for (let j = 0; j < keyButtons.length; j++) {
        const key = new Label({
          id: keyButtons[j],
          text: keyButtons[j],
          pos: [250 + j * 80, 200 + i * 100],
          font: "42px Arial",
          borderWidth: 4,
          borderColor: "black",
          size: [50, 50],
          anchor: [0.5, 0.5],
          textAlign: "center",
          lineHeight: 50
        });

        layer.append(key);
      }
    }

    document.addEventListener("keydown", event => {
      const key = event.key;
      const button = scene.getElementById(key);
      button.attr({
        bgcolor: "grey",
        fillColor: "white"
      });
    });

    document.addEventListener("keyup", event => {
      const key = event.key;
      const button = scene.getElementById(key);
      button.attr({
        bgcolor: "",
        fillColor: "black"
      });
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
