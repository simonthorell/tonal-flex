<template>

  <div class="side-bar">
    <div class="menu-buttons">
      <button class="btn"><OhVueIcon name="fa-user-alt" class="btn-icon" /></button>
      <button class="btn">2</button>
      <button class="btn">3</button>
      <button class="btn">4</button>
    </div>
    <div class="volume-headphone">
      <OhVueIcon name="bi-headphones" class="icon" />
      <input type="range" min="1" orient="vertical" max="100" value="75" class="slider" id="myRange">
    </div>
    <div class="volume-master">
      <OhVueIcon name="bi-volume-up" class="icon" />
      <input type="range" min="1" orient="vertical" max="100" value="75" class="slider" id="myRange">
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiHeadphones } from "oh-vue-icons/icons";
import { BiVolumeUp } from "oh-vue-icons/icons";
import { FaUserAlt } from "oh-vue-icons/icons";

// Register the icon
addIcons(BiHeadphones);
addIcons(BiVolumeUp);
addIcons(FaUserAlt);

export default defineComponent({
  name: "LeftPanel",
  components: {
    OhVueIcon, // Register the OhVueIcon component globally
  },
});
</script>

<style scoped>
.side-bar{
  display: grid;
  grid-template-columns: 80px;
  grid-template-rows: 3fr 3fr 3fr;
  height: 100vh;
  justify-content: center;
  border-right: 1px solid rgba(216, 22, 15, 0.7);
}

.menu-buttons{
  display: grid;
  gap: 15px;
  padding: 15px;
  justify-content: center;

}

.btn{
  width:40px;
  height: 40px;
  background: linear-gradient(to bottom, #444, #222);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(142, 142, 142, 0.3);
  border-radius: 6px;
}

.btn-icon{
  width:30px;
  height: 30px;
  color:#09dc0d;
}

.icon {
  width: 40px;
  height: 40px;
  color: red;
  justify-self: center;
}

.volume-headphone{
  display: grid; /* Use grid layout */
  grid-template-rows: auto 1fr; /* Two rows: icon at the top, slider fills remaining space */
  justify-content: center; /* Center items horizontally */
  align-items: start; /* Align the icon at the top of its row */
}

.volume-master{
  display: grid; /* Use grid layout */
  grid-template-rows: auto 1fr; /* Two rows: icon at the top, slider fills remaining space */
  justify-content: center; /* Center items horizontally */
  align-items: start; /* Align the icon at the top of its row */
}

.slider{
  width:10px;
  background-color:rgb(36, 36, 36);
  border: 1px solid rgba(142, 142, 142, 0.3);
  height: 95%;
  justify-self: center;
}

.slider::-webkit-slider-thumb {
  width: 35px;
  height: 35px;
  background: linear-gradient(to bottom, #444, #222);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(142, 142, 142, 0.3);
}

.slider::-moz-range-thumb {
  width: 35px;
  height: 70px;
  background: linear-gradient(to bottom, #444, #222);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(142, 142, 142, 0.3);
}

.slider::-moz-range-progress {
  background-color: rgba(68, 242, 10, 0.5);
  width:10px;
}
</style>
