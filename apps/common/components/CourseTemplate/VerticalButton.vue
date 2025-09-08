<template>
  <div class="vertical-button">
    <MyIcon name="whiteRadius" class="vertical-button-radius"></MyIcon>
    <span><slot></slot></span>
  </div>
</template>

<script setup lang="ts">
import MyIcon from '../MyIcon/index.vue'
</script>

<style scoped>
.vertical-button {
  position: relative;
  writing-mode: vertical-rl;
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  background: linear-gradient(182.56deg, #ff7f00 1.43%, #ffc000 93.64%);
  border-radius: 27px;
}
.vertical-button > span {
  display: inline-block;
}
.vertical-button-radius {
  position: absolute;
  top: 8px;
  right: 8px;
  transform: rotateY(180deg);
}
</style>
