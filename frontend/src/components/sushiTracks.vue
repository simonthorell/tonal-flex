<template>

    <div class="tracks-container">
        <div class="track">
          <div class="track-title">
            Main
          </div>
          <div class="volume-slider">
            <div class="mixer-ticks left">
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
            </div>
            <div class="slider-container">
            <input type="range" min="1" orient="vertical" max="100" value="75" class="slider" id="myRange">
            </div>
            <div class="mixer-ticks right">
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
              <div class="mixer-tick"></div>
            </div>

          </div>
          <!--
          <div class="channels-btn-container">
            <button class="channels-btn" >Channels</button>
          </div>
          -->
        </div>
    </div>

</template>

<script lang="ts">
import thumbImage from '@/assets/thumb.png';
export default {
  data() {
    return {
      thumbImage,
    };
  },
};
</script>

<style scoped>
.tracks-container{
  width: 100vw;
  height: 100%;
  color: white;
}

.track{
  display:grid;
  grid-template-columns:auto;
  grid-template-rows: 50px 300px 100px;
  grid-template-areas:
    "title"
    "slider"
    "button";
  width: 150px;
  height:100%;
  border: 1px solid rgb(198, 66, 13);
}

.track-title{
  width:100%;
  grid-area: title;
}

.volume-slider{
  display: grid;
  height:300px;
  overflow: hidden;
}

.mixer-ticks {
  position: absolute;
  width: 20px;
  height: 300px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mixer-ticks.left {
  position: absolute;
  left: 35px;
}

.mixer-ticks.right {
  position: absolute;
  left: 100px;
}

.mixer-tick {
  position: relative;
  width: 15px;
  height: 1px;
  border-radius: 12px;
  background: #4d4d4d;
}

.slider-container{
  height:300px;
  width:35px;
  grid-area: slider;
  background-color:#656565;
}

.slider{
  height:300px;
  width:10px;
  background-color:rgb(36, 36, 36);
}

.slider::-webkit-slider-thumb {
  width: 35px;
  height: 35px;
  background-image: url("@/assets/thumb.png");
  background-size:cover;
}

.slider::-moz-range-progress {
  background: #a83c0a;
  width:10px;
}

.slider::-moz-range-thumb {
  width: 35px;
  height: 70px;
  background-image: url("@/assets/thumb.png");
  background-size: cover;
}

.channels-btn-container{
  grid-area: button;
  bottom: 0;
  position:relative;
}

.channels-btn{
  width:100%;
  height:40px;
  border-radius: 0px;
}

</style>
