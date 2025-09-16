<template>
  <div class="card">
    <h2 class="title">个人中心</h2>
    <p class="desc">这里将展示用户个人信息与偏好设置（占位）。</p>
  </div>
  
</template>

<script setup lang="ts">
defineOptions({ name: 'ProfilePage' })
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(46, 70, 128, 0.08);
  padding: 16px;
}
.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
}
.desc {
  color: #666;
}
</style>
