<template>
  <div class="common-layout">
    <el-container>
      <el-header class="layout-header">
        <div class="layout-header-logo">
          <img :src="LogoImg" alt="logo" class="logo" />
          <h2 class="title">鸿蒙智启管理平台</h2>
        </div>
        <div class="layout-header-user" @click="jumpToUserInfo">
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
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {ElContainer, ElHeader, ElMain, ElAvatar} from 'element-plus'
import LogoImg from '@aipbl/common/assets/Logo.png'
import DefaultAvatar from '@aipbl/common/assets/DefaultAvatar.png'
import {useUserStore} from '@/stores/user'
import {RouterView} from 'vue-router'
import router from '@/router/index'
import MyButton from '@/components/common/MyButton.vue'
defineOptions({
  name: 'LayoutPage'
})
const jumpToUserInfo = () => {
  router.push('/user')
}
</script>

<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
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
  cursor: pointer;
}
.username {
  font-size: 20px;
  font-weight: 400;
}
.layout-main {
  display: flex;
  background-color: rgb(246, 246, 246);
  height: calc(100vh - 80px);
  --el-main-padding: 0px;
}
.return-button {
  border: #6696ff solid 0.5px;
  border-radius: 29px;
}
</style>
