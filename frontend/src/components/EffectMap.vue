<template>
  <div class="charter-container">
    <div class="nav-bar">
      <NavBar />
    </div>
    <div class="effect-map">
      <div class="line"></div>
      <div class="box" id="first">
        <OhVueIcon name="co-plus" class="icon" />
      </div>
      <div class="line"></div>
      <div class="box" id="second">
        <OhVueIcon name="co-plus" class="icon" />
      </div>
      <div class="line"></div>
      <div class="box" id="third">
        <OhVueIcon name="co-plus" class="icon" />
      </div>
      <div class="line"></div>
      <div class="box" id="fourth">
        <OhVueIcon name="co-plus" class="icon" />
      </div>
      <div class="line"></div>
      <div class="box" id="fifth">
        <OhVueIcon name="co-plus" class="icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from '@/components/NavBar.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoPlus } from "oh-vue-icons/icons";

addIcons(CoPlus);

export default defineComponent({
  name: "charter-map",
  components: { NavBar, OhVueIcon},
});
</script>

<style scoped>
.charter-container{
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 95%;
}

.nav-bar{
  width: 100%;
}

.effect-map{
  display:grid;
  grid-template-rows: 10fr 10fr 10fr 10fr 10fr 10fr 10fr 10fr 10fr 10fr;
  width:100%;
  justify-content: center;
}

.line{
  width:2px;
  background-color:rgba(245, 5, 5, 0.7);
  justify-self: center;
  margin: 5px;
  border-radius: 12px;
  box-shadow: 1px 2px 10px rgb(214, 73, 73);
}

.box{
  display:flex;
  width:200px;
  border: 1px solid rgba(245, 5, 5, 0.9);
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 0px 7px rgb(214, 73, 73);
  background-color:rgba(111, 16, 16, 0.1);
}

.icon {
  width: 60px;
  height: 60px;
  color: rgba(245, 5, 5, 0.8);
  justify-self: center;
}

</style>
