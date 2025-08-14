<template>
  <div class="login-container">
    <div class="login-header">
      <img :src="LogoImg" alt="logo" class="logo" />
      <h2 class="title">鸿蒙智启管理平台</h2>
    </div>
    <div class="login-box">
      <div class="subtitle">账号登录</div>
      <el-form class="myform" :model="form" :rules="formRules">
        <el-form-item>
          <el-input
            class="login-input"
            v-model="form.username"
            placeholder="请输入账号"
            size="large"
          >
            <template #prefix>
              <MyIcon name="user" style="width: 25px"> </MyIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            class="login-input"
            show-password
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
          >
            <template #prefix>
              <MyIcon name="lock" style="width: 25px"> </MyIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-button class="login-btn">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import LogoImg from '@aipbl/common/assets/logo.png'
import {ElForm, ElFormItem, ElInput, ElButton} from 'element-plus'
import {reactive, ref} from 'vue'
import {type LoginRequestType} from '@/types/loginTypes'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'

defineOptions({
  name: 'loginPage'
})
const form = reactive<LoginRequestType>({
  username: '',
  password: ''
})
const formRules = reactive({
  usename: [{required: true, message: '请输入账号', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}]
})
</script>
<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  background: linear-gradient(180deg, #e3f0fe 0%, #f6f9ff 100%);
  align-items: center;
}
.login-header {
  display: flex;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 5%;
  gap: 10px;
}
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 134px;
  height: 81px;
}
.title {
  color: #026bff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  line-height: 100%;
  letter-spacing: 0;
}
.subtitle {
  font-size: 30px;
  margin-bottom: 10%;
}
.myform {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.login-input {
  border-radius: 2% solid #d2dce7;
  min-width: 400px;
  min-height: 50px;
  opacity: 1;
}
.login-btn {
  width: 100%;
  color: #ffffff;
  background-color: #1664ff;
  min-height: 50px;
}
</style>
