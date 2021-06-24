<template>
  <div class="hello">
    <canvas id="lumagl-canvas"></canvas>
  </div>
</template>

<script>
import {loop} from '../../static/js/luma.js'
// import {AppAnimationLoop} from '../../static/js/app.js'
export default {
  name: 'city_luma',
  data(){
    return{
     
    }
  },
  methods:{

  },
  mounted(){    
    loop.start({canvas: 'lumagl-canvas'});
    // loop.start();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#lumagl-canvas{
  width: 800px;
  height: 625px;
}
</style>
