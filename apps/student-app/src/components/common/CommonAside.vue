<template>
  <div class="sidebar">
    <div class="sidebar-menu">
      <el-menu
        class="layout-menu"
        router
        :default-active="$route.path"
        text-color="#64a0fd"
        active-text-color="#ffffff"
        background-color="#e7f0ff"
        active-background-color="linear-gradient(to right, #6696ff, #63a2fd)"
      >
        <el-menu-item
          v-for="button in sidebarButtons"
          :key="button.id"
          :index="button.path"
          class="sidebar-menu-item"
          ><MyIcon :name="button.id" style="padding-right: 10px"></MyIcon>
          {{ button.label }}
          <MyIcon
            name="whiteRadius"
            class="radius-icon"
            style="
              position: absolute;
              right: 8px;
              top: 8px;
              transform: rotateY(180deg);
            "
            v-if="$route.path === button.path"
          />
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {ref} from 'vue'
import type {iconNamesType} from '@aipbl/common/components/MyIcon/iconPath'

interface SidebarButton {
  id: iconNamesType
  label: string
  path: string
}

// 变量声明区
const sidebarButtons = ref<SidebarButton[]>([
  {
    id: 'course',
    label: '我的课程',
    path: '/course' // 添加 path 属性
  },
  {
    id: 'certificate',
    label: '我的证书',
    path: '/certificate' //TODO: 示例路径，您需要创建对应路由
  },
  {
    id: 'levelTest',
    label: '等级考试',
    path: '/levelTest' //TODO: 示例路径，您需要创建对应路由
  }
])
</script>
<style scoped>
.sidebar {
  width: 180px;
  flex-shrink: 0; /* 防止侧边栏被压缩 */
  background-color: #e7f0ff;
  height: 100%;
  overflow-y: auto; /* 如果侧边栏内容也可能超长，让其内部滚动 */
}
.layout-menu {
  border: none;
  display: flex;
  flex-direction: column;
}
.sidebar-menu-item {
  position: relative;
  margin: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  justify-content: center;
}
.sidebar-menu-item.is-active {
  position: relative;
  background-color: #6696ff;
  border-radius: 27px;
  width: 140px;
  height: 56px;
  font-size: 16px;
  cursor: pointer;
}
</style>
