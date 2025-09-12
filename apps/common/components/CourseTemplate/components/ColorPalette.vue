<template>
  <div class="color-palette">
    <div
      v-for="color in colors"
      :key="color"
      class="color-swatch"
      :style="{backgroundColor: color}"
      @click="selectColor(color)"
    ></div>
  </div>
</template>

<script setup lang="ts">
const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#A133FF',
  '#33FFA1',
  '#FFC300',
  '#DAF7A6',
  '#FFC0CB',
  '#00FFFF',
  '#FF00FF',
  '#C70039'
]

const emit = defineEmits(['color-selected'])

const selectColor = (color: string) => {
  emit('color-selected', color)
}
</script>

<style scoped>
.color-palette {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  z-index: 999;
}

.color-swatch {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-swatch:hover {
  transform: scale(1.1);
}
</style>
