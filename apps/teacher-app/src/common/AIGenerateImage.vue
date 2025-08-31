<template>
  <div class="ai-image-container">
    <div>
      <img :src="LogoImg" alt="logo" class="AIImage" />
    </div>
    <el-button type="primary" @click="regenerateImage">重新生成</el-button>
  </div>
</template>

<script setup lang="ts">
import {ElButton} from 'element-plus'
import LogoImg from '@aipbl/common/assets/logo.png'
const regenerateImage = () => {
  console.log('正在请求重新生成图片...')
}
</script>

<style scoped>
.ai-image-container {
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  background-color: #fafafa;
  transition: border-color 0.3s;
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ai-image-container:hover {
  border-color: var(--el-color-primary);
}
.AIImage {
  width: 134px;
  height: 81px;
}
</style>
