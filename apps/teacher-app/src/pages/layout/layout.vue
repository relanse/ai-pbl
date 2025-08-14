<template>
  <div class="common-layout">
    <el-container class="wrapper">
      <el-header class="layout-header">
        <div class="layout-header-logo">
          <img :src="LogoImg" alt="logo" class="logo" />
          <h2 class="title">鸿蒙智启管理平台</h2>
        </div>
        <div class="layout-header-user">
          <el-dropdown size="small" split-button>
            用户名
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="240px" class="layout-aside">
          <el-menu
            class="layout-menu"
            router
            :default-active="activeMenu"
            text-color="#333333"
            active-text-color="#2262FB"
          >
            <el-menu-item index="/student-manage">
              <template #title>
                <MyIcon
                  :name="
                    activeMenu == '/student-manage'
                      ? 'studentManageActive'
                      : 'studentManage'
                  "
                ></MyIcon>
                <span>学生管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/course-manage">
              <template #title>
                <MyIcon
                  :name="
                    activeMenu == '/course-manage'
                      ? 'courseManageActive'
                      : 'courseManage'
                  "
                ></MyIcon>
                <span>课程管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/project-manage">
              <template #title>
                <MyIcon
                  :name="
                    activeMenu == '/project-manage'
                      ? 'projectManageActive'
                      : 'projectManage'
                  "
                ></MyIcon>
                <span>项目管理</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="layout-main"><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {
  ElContainer,
  ElHeader,
  ElDropdown,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem
} from 'element-plus'
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import LogoImg from '@aipbl/common/assets/logo.png'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
defineOptions({
  name: 'layoutPages'
})
const route = useRoute()
const activeMenu = computed(() => route.path)
</script>
<style scoped>
.common-layout {
  height: 100vh;
  background: linear-gradient(180deg, #e3f0fe 0%, #f6f9ff 100%);
}
.wrapper {
  height: 100%;
}
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 8%;
}
.layout-header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.layout-aside {
  padding: 20px;
}
.layout-menu {
  font-weight: 400;
  background: transparent;
  border: none;
}
.layout-menu .el-menu-item {
  margin-bottom: 10px;
  border-radius: 8px;
}
.layout-menu :deep(.el-menu-item.is-active) {
  background: #fff;
  border-radius: 8px;
  color: #2262fb;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.layout-menu .el-menu-item span {
  margin-left: 10px;
}

.layout-main {
  background: #ffffff;
  border-radius: 12px;
  margin: 0 20px 20px 0;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.logo {
  width: 56px;
  height: 34px;
}
.title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0;
  color: #333;
}
</style>
