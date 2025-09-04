<template>
  <div class="page-wrapper">
    <div class="common-container">
      <div class="cover">
        <img :src="Cover" alt="Cover" />
      </div>
      <div class="login">
        <div class="login-logo">
          <img :src="LogoImg" alt="Logo" />
          <div class="logo-title">
            <h2>欢迎登陆</h2>
            <h3>鸿蒙智启AI学习平台</h3>
          </div>
        </div>
        <div class="login-form">
          <el-form v-model="form">
            <el-form-item>
              <MyInput
                class="form-input"
                v-model="form.account"
                placeholder="请输入账号"
                size="large"
                icon="user"
              >
              </MyInput>
            </el-form-item>
            <div class="password-container">
              <el-form-item>
                <MyInput
                  class="form-input"
                  v-model="form.password"
                  placeholder="请输入密码"
                  size="large"
                  type="password"
                  icon="solidLock"
                  :show-password="true"
                >
                </MyInput>
              </el-form-item>
              <a href="/password-find" class="password-forget">忘记密码</a>
            </div>
            <el-form-item>
              <MyButton class="form-btn"> 登录 </MyButton>
            </el-form-item>
            <el-form-item class="form-agreement">
              <el-checkbox v-model="form.agreement">
                <span class="agreement-text">登录视为您已阅读并同意</span>
                <a href="#" class="agreement-link">用户协议</a>
                <span class="agreement-text">和</span>
                <a href="#" class="agreement-link">隐私协议</a>
              </el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Cover from '@aipbl/common/assets/Cover.png'
import LogoImg from '@aipbl/common/assets/Logo.png'
import {ElForm, ElFormItem, ElCheckbox} from 'element-plus'
import {ref} from 'vue'
import MyButton from '@/components/common/MyButton.vue'
import MyInput from '@/components/common/MyInput.vue'
defineOptions({
  name: 'LoginPage'
})
const form = ref({
  account: '',
  password: '',
  agreement: false
})
</script>
<style scoped>
.page-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(90deg, #649ffe 0% 30%, #e3f0fe 30% 100%);
}
.common-container {
  display: flex;
  max-width: 1000px;
  max-height: 600px;
  width: 80%; /* 在小屏幕上留出边距 */
  height: 90vh; /* 高度不超过视口的90% */
  margin: 0 auto; /* 水平居中 */
  overflow: hidden;
  border-radius: 24px; /* 四角圆角 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 绝对定位居中 */
}
.cover {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.login {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.login-logo {
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  width: 100%;
  max-width: 380px;
}
.login-logo img {
  width: 100px;
  height: 60px;
  margin-right: 16px;
}
.logo-title {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.logo-title h2 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #026bff;
  margin: 0;
}

.logo-title h3 {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #026bff;
  font-weight: 400;
  margin: 0;
}
.login-form {
  width: 100%;
  max-width: 380px;
}

.password-container {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.password-forget {
  font-size: 14px;
  color: #1664ff;
  text-decoration: none;
  align-self: flex-end;
}
.password-forget:hover {
  text-decoration: underline;
}

.form-btn {
  width: 100%;
  height: 48px;
  margin-top: 60px;
}
.form-agreement {
  font-size: 14px;
}
.form-agreement :deep(.el-checkbox__inner) {
  border-radius: 100%; /* 使复选框变成圆形 */
  width: 16px; /* 按钮大小 */
  height: 16px;
}
.agreement-text {
  color: #999999;
  font-size: 14px;
}
.agreement-link {
  color: #026bff;
  font-size: 14px; /* 保持字体大小一致 */
  font-weight: 400;
  text-decoration: none;
}
.agreement-link:hover {
  text-decoration: underline;
}
</style>
