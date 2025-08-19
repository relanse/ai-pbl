<template>
  <div class="ai-image-container">
    <div class="image-placeholder">
      <!-- 这里可以替换为真实的 img 标签 -->
      <span>AI生成的插图</span>
    </div>
    <el-button type="primary" @click="regenerateImage">重新生成</el-button>
  </div>
</template>

<script setup lang="ts">
import {ElButton} from 'element-plus'

// 点击“重新生成”按钮时触发的函数
const regenerateImage = () => {
  console.log('正在请求重新生成图片...')
  // 在这里添加调用后端API生成图片的逻辑
}
</script>

<style scoped>
.ai-image-container {
  border: 1px dashed #dcdfe6; /* 虚线边框 */
  border-radius: 8px; /* 圆角 */
  padding: 20px; /* 内边距 */
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
  gap: 16px; /* 元素之间的间距 */
  background-color: #fafafa;
}

.image-placeholder {
  width: 100%;
  height: 150px;
  background-color: #e9ecef; /* 灰色背景 */
  border-radius: 4px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  color: #606266; /* 文字颜色 */
  font-size: 16px;
}
</style>
