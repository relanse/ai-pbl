<template>
  <div class="common-layout">
    <el-container>
      <el-header class="layout-header">
        <div class="layout-header-logo">
          <img :src="LogoImg" alt="logo" class="logo" />
          <h2 class="title">鸿蒙智启管理平台</h2>
        </div>
        <div class="layout-header-user">
          <el-avatar
            :src="useUserStore().userState.avatarUrl || DefaultAvatar"
            :size="45"
          />
          <span class="username">{{
            useUserStore().userState.username || '用户'
          }}</span>
        </div>
      </el-header>
      <el-main class="layout-main">
        <button @click="testButton">返回登录</button>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {ElContainer, ElHeader, ElMain, ElAvatar} from 'element-plus'
import LogoImg from '@aipbl/common/assets/Logo.png'
import DefaultAvatar from '@aipbl/common/assets/DefaultAvatar.png'
import {useUserStore} from '@/stores/user'
import router from '@/router/index'
defineOptions({
  name: 'LayoutPage'
})
const testButton = () => {
  router.push('/login')
}
</script>

<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  background-color: #ffffff;
  border-bottom: #e0e0e0 solid 1px;
}
.layout-header-logo {
  display: flex;
  gap: 8px;
  align-items: center;
  padding-left: 10px;
}
.layout-header-logo img {
  width: 56px;
  height: 34px;
}
.layout-header-logo h2 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0;
  color: #026bff;
}
.layout-header-user {
  display: flex;
  gap: 15px;
  align-items: center;
  padding-right: 30px;
}
.username {
  font-size: 20px;
  font-weight: 400;
}
.layout-main {
  flex: 1;
  background-color: rgb(246, 246, 246);
  overflow: auto;
  padding: 20px;
}
</style>
