<template>
  <button class="my-button">
    <MyIcon name="radius" class="my-button-radius"></MyIcon>
    <div class="my-button-slot">
      <slot></slot>
    </div>
    <div class="my-button-background"></div>
  </button>
</template>
<script setup lang="ts">
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
</script>
<style scoped>
.my-button {
  position: relative;
  border: none;
  border-radius: 21px;
  padding: 0 10px;
  width: 249px;
  height: 51px;
  color: white;
  background: transparent;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
.my-button-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}
.my-button-radius {
  position: absolute;
  left: 8px;
  top: 15%;
  z-index: 1;
}
.my-button-background {
  background-color: #63a2fd;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: inherit;
  transition: all 0.3s;
}
.my-button:hover > .my-button-background {
  background-color: #73adfe;
}
.my-button:active > .my-button-background {
  background-color: #5b9cf7;
}
</style>
