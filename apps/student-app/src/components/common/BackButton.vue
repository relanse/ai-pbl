<template>
  <button class="back-button" @click="$router.back()">
    <MyIcon name="backArrow" class="back-icon"></MyIcon>
    <span class="back-text">返回</span>
  </button>
</template>
<script setup lang="ts">
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
</script>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  border: 0.5px solid #6696ff;
  background: transparent;
  cursor: pointer;
  border-radius: 29px;
  height: 35px;
  width: 72px;
  justify-content: center;
}
.back-text {
  color: #026bff;
  font-size: 16px;
}
</style>
