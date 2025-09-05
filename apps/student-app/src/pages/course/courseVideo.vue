<template>
  <div class="common-layout">
    <div class="video-goback">
      <el-button @click="goBack" round :icon="ArrowLeftBold" size="large">
        返回
      </el-button>
    </div>
    <div>
      <h1>标题</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ElButton} from 'element-plus'
import {ArrowLeftBold} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>
<style scoped>
.video-goback .el-button {
  margin-left: 20px;
  margin-top: 20px;
  font-size: 16px;
  color: #026bff;
  border: #6696ff solid 0.5px;
}
</style>
