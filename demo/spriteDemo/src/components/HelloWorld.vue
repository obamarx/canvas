<template>
  <div>
    <div id="stage"></div>
  </div>
</template>

<script>
import {Scene, Sprite} from 'spritejs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: { Scene, Sprite },
  mounted(){

const container = document.querySelector('#stage');
const scene = new Scene({container, width: 3080, height: 800, mode: 'stickyTop'});

const layer = scene.layer();

const robot = new Sprite('https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png');

robot.attr({
  anchor: [0, 0.5],
  pos: [0, 0],
});

robot.animate([
  {pos: [0, 0]},
  {pos: [0, 300]},
  {pos: [2700, 300]},
  {pos: [2700, 0]},
], {
  duration: 5000,
  iterations: Infinity,
  direction: 'alternate',
});

layer.append(robot);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
