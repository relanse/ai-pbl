<template>
  <div
    v-if="isEdit || item.found"
    class="find-item"
    :style="{left: `${item.x}%`, top: `${item.y}%`}"
  >
    <div class="item-text">{{ item.text }}</div>
    <div class="item-image-container">
      <img :src="item.img" alt="" />
    </div>
    <el-button
      v-if="isEdit"
      class="delete-btn"
      type="danger"
      :icon="Delete"
      circle
      size="default"
      @click.stop="$emit('delete', item.id)"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ElButton} from 'element-plus'
import {Delete} from '@element-plus/icons-vue'
import {FindItemType} from '../type'

const props = defineProps<{
  item: FindItemType
  isEdit: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()
</script>

<style scoped>
.find-item {
  position: absolute;
  transform: translate(-50%, -20px); /* 向上偏移，让指针对准物品中心 */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
}
.item-text {
  background-color: #409eff;
  color: white;
  font-weight: 700;
  padding: 20px 16px; /* 稍微增加内边距，让气泡更饱满 */
  border-radius: 16px; /* 更圆的圆角 */
  font-size: 16px;
  position: relative; /* 必须是相对定位，作为箭头的定位基准 */
  z-index: 1;
  white-space: nowrap;
  margin-bottom: 5px;
}

/* 使用 ::after 伪元素创建向下的三角形箭头 */
.item-text::after {
  content: '';
  position: absolute;
  /* 定位到父元素底部中间 */
  bottom: -7px; /* 向上移动1px，与父元素边框无缝连接 */
  left: 50%;
  transform: translateX(-50%);
  /* 使用边框技巧创建三角形 */
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #409eff; /* 三角形的颜色与父元素背景色一致 */
}

.item-image-container {
  width: 80px;
  height: 80px;
  background-color: #ff9a2e;
  border: 1px solid white;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.item-image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.delete-btn {
  display: flex;
}
</style>
