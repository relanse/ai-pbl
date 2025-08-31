<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="logo">
        <img :src="LogoImg" alt="logo" />
        <h2>鸿蒙智启AI学习平台</h2>
      </div>
      <div class="slot-form">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LogoImg from '@aipbl/common/assets/Logo.png'
</script>
<style scoped>
.page-wrapper {
  width: 100%;
  height: 100%;
  background: rgb(231, 240, 255);
}
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 10px;
}
.logo {
  display: flex;
  align-items: center;
  margin-top: 40px;
}
.logo img {
  width: 100px;
  height: 60px;
}
.logo h2 {
  font-weight: 700;
  color: #026bff;
}
.slot-form {
  position: relative; /* 为伪元素提供定位上下文 */
  display: flex;
  justify-content: center;
  max-width: 700px;
  max-height: 650px;
  width: 80%; /* 在小屏幕上留出边距 */
  height: 90vh; /* 高度不超过视口的90% */
  overflow: hidden;
  border-radius: 24px; /* 四角圆角 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  background-color: #ffffff;
}
/* 添加分割线 */
.slot-form::after {
  content: '';
  position: absolute;
  width: 100%;
  top: 85%; /* 位于容器80%高度处 */
  height: 1px; /* 线的厚度 */
  background-color: #e0e0e0; /* 浅灰色分割线 */
  z-index: 1; /* 确保线在内容之上 */
}
</style>
