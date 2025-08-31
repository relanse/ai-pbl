<template>
  <div class="login-container">
    <!-- 顶部Logo和标题区域 -->
    <div class="login-header">
      <img :src="LogoImg" alt="logo" class="logo" />
      <h1 class="title">鸿蒙智启AI学习平台</h1>
    </div>

    <!-- 登录卡片区域 -->
    <div class="login-card">
      <!-- 标题插槽 -->
      <h2 class="card-title">
        <slot name="title">登录</slot>
      </h2>

      <!-- 表单插槽 -->
      <div class="login-form">
        <slot name="form"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoImg from '@aipbl/common/assets/logo.png'
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #eef5ff;
  padding: 20px;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 10px;
}

.title {
  color: #4080ff;
  font-size: 24px;
  font-weight: 500;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.card-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.login-form {
  width: 100%;
}

/* 通用样式，可以被子组件继承使用 */
:deep(.code-input-group) {
  display: flex;
  align-items: center;
}

:deep(.code-btn) {
  margin-left: 10px;
  white-space: nowrap;
  height: 40px;
  padding: 0 15px;
}

:deep(.login-btn) {
  width: 100%;
  height: 45px;
  font-size: 16px;
  margin-top: 20px;
  background-color: #4080ff;
}

:deep(.el-input__inner) {
  height: 40px;
}

:deep(.el-input__prefix) {
  color: #999;
}

/* 移动端适配 */
@media screen and (max-width: 480px) {
  .login-card {
    padding: 20px;
  }
}
</style>
