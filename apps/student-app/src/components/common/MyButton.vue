<template>
  <button class="my-button">
    <MyIcon :name="icon" class="my-button-radius"></MyIcon>
    <div class="my-button-slot">
      <slot></slot>
    </div>
    <div class="my-button-background" :style="{backgroundColor: color}"></div>
  </button>
</template>
<script setup lang="ts">
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import {iconNamesType} from '@aipbl/common/components/MyIcon/iconPath'
defineProps({
  color: {
    type: String,
    default: '#63a2fd'
  },
  icon: {
    type: String as () => iconNamesType,
    default: 'whiteRadius'
  }
})
</script>
<style scoped>
.my-button {
  position: relative;
  border: none;
  border-radius: 27px;
  padding: 0 10px;
  width: 249px;
  height: 51px;
  color: white;
  background: transparent;
  font-size: 18px;
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
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: inherit;
  box-shadow: 0 6px 12px rgba(64, 128, 255, 0.3);
  transition: all 0.3s ease;
}
.my-button:hover > .my-button-background {
  box-shadow: 0 8px 15px rgba(58, 115, 233, 0.4);
}
.my-button:active > .my-button-background {
  box-shadow: 0 8px 15px rgba(58, 115, 233, 0.4);
}
</style>
