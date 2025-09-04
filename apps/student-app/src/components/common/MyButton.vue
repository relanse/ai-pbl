<template>
  <button class="my-button" :style="buttonStyle">
    <MyIcon name="radius" class="my-button-radius" :style="iconStyle"></MyIcon>
    <div
      :class="[
        writingMode?.includes('horizontal') && 'my-button-slot',
        writingMode?.includes('vertical') && 'my-button-slot-vertical'
      ]"
      :style="slotStyle"
    >
      <slot></slot>
    </div>
    <div class="my-button-background"></div>
  </button>
</template>
<script setup lang="ts">
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import {computed, useSlots, type PropType, type CSSProperties} from 'vue'

const props = defineProps({
  background: {
    type: String,
    default: '#63a2fd'
  },
  writingMode: {
    type: String as PropType<CSSProperties['writingMode']>,
    default: 'horizontal-tb'
  },
  width: {
    type: String,
    default: '200px'
  },
  height: {
    type: String,
    default: 'auto'
  },
  iconPosition: {
    type: String,
    default: 'top-right'
  }
})
const slots = useSlots()
const hasDefaultSlot = computed(() => !!slots.default)

const buttonStyle = computed(() => ({
  background: props.background,
  width: props.width,
  height: props.height,
  padding: hasDefaultSlot.value ? '0 10px' : '0'
}))

const slotStyle = computed(() => ({
  writingMode: props.writingMode
}))
const iconStyle = computed(() => {
  const styles: {[key: string]: string} = {}
  const offset = '8px'
  let rotation = '0deg'
  if (props.iconPosition.includes('top')) {
    styles.top = offset
  }
  if (props.iconPosition.includes('bottom')) {
    styles.bottom = offset
  }
  if (props.iconPosition.includes('left')) {
    styles.left = offset
  }
  if (props.iconPosition.includes('right')) {
    styles.right = offset
  }
  switch (props.iconPosition) {
    case 'top-left':
      rotation = '0deg'
      break
    case 'top-right':
      rotation = '90deg'
      break
    case 'bottom-right':
      rotation = '180deg'
      break
    case 'bottom-left':
      rotation = '270deg'
      break
  }
  styles.transform = `rotate(${rotation})`
  return styles
})
</script>
<style scoped>
.my-button {
  position: relative;
  border: none;
  border-radius: 27px;
  padding: 0 10px;
  color: white;
  background: transparent;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden; /* 防止图标在某些情况下溢出 */
}
.my-button-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  white-space: nowrap;
}
.my-button-slot-vertical {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
}
.my-button-radius {
  position: absolute;
  z-index: 2;
}
.my-button-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: inherit;
  transition: all 0.3s;
}
.my-button:hover {
  filter: brightness(1.1);
}

.my-button:active {
  filter: brightness(0.9);
}
</style>
