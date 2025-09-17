<template>
  <div class="sidebar" :class="{collapsed: isCollapsed}">
    <!-- 折叠/展开按钮 -->
    <div
      class="toggle-button"
      @click="toggleSidebar"
      :class="{collapsed: isCollapsed}"
    >
      <MyIcon
        name="backArrow"
        :style="{transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)'}"
      />
    </div>

    <div class="sidebar-menu">
      <el-menu
        class="layout-menu"
        router
        :default-active="$route.path"
        text-color="#64a0fd"
        active-text-color="#ffffff"
        background-color="#e7f0ff"
        active-background-color="linear-gradient(to right, #6696ff, #63a2fd)"
        :collapse="isCollapsed"
      >
        <el-menu-item
          v-for="button in sidebarButtons"
          :key="button.id"
          :index="button.path"
          class="sidebar-menu-item"
          :data-label="button.label"
        >
          <MyIcon
            :name="button.id"
            :style="{paddingRight: isCollapsed ? '0' : '10px'}"
          />
          <span v-show="!isCollapsed">{{ button.label }}</span>
          <MyIcon
            name="whiteRadius"
            class="radius-icon"
            style="
              position: absolute;
              right: 8px;
              top: 8px;
              transform: rotateY(180deg);
            "
            v-if="$route.path === button.path && !isCollapsed"
          />
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {ref, computed, onMounted, onUnmounted} from 'vue'
import {ElMenu, ElMenuItem} from 'element-plus'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import type {iconNamesType} from '@aipbl/common/components/MyIcon/iconPath'

interface SidebarButton {
  id: iconNamesType
  label: string
  path: string
}

// 变量声明区
const isCollapsed = ref(false)
const screenWidth = ref(window.innerWidth)

const sidebarButtons = ref<SidebarButton[]>([
  {
    id: 'course',
    label: '我的课程',
    path: '/course'
  },
  {
    id: 'certificate',
    label: '我的证书',
    path: '/certificate'
  },
  {
    id: 'levelTest',
    label: '等级考试',
    path: '/levelTest'
  }
])

// 响应式处理屏幕尺寸变化
const handleResize = () => {
  screenWidth.value = window.innerWidth
  // 当屏幕宽度小于 768px 时自动折叠
  if (screenWidth.value < 768) {
    isCollapsed.value = true
  } else if (screenWidth.value > 1024) {
    isCollapsed.value = false
  }
}

// 切换侧边栏状态
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

// 暴露给父组件的属性和方法
defineExpose({
  isCollapsed,
  toggleSidebar,
  sidebarWidth: computed(() => (isCollapsed.value ? 64 : 180))
})

// 生命周期钩子
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // 初始化时检查一次
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<style scoped>
.sidebar {
  width: 180px;
  flex-shrink: 0;
  background-color: #e7f0ff;
  height: 100%;
  overflow-y: auto;
  transition: width 0.3s ease;
  position: relative;
}

.sidebar.collapsed {
  width: 64px;
}

.toggle-button {
  position: absolute;
  top: 20px;
  right: -12px;
  width: 24px;
  height: 24px;
  background-color: #6696ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(102, 150, 255, 0.3);
  transition: all 0.3s ease;
}

.toggle-button:hover {
  background-color: #5a7fd8;
  transform: scale(1.1);
}

.toggle-button.collapsed {
  right: -12px;
}

.toggle-button img {
  width: 12px;
  height: 12px;
  filter: brightness(0) invert(1);
  transition: transform 0.3s ease;
}

.layout-menu {
  border: none;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.sidebar.collapsed .layout-menu {
  margin-top: 60px; /* 为折叠按钮留出空间 */
}

.sidebar-menu-item {
  position: relative;
  margin: 10px 20px;
  border-radius: 27px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  height: 56px;
  align-items: center;
}

.sidebar.collapsed .sidebar-menu-item {
  margin: 10px 8px;
  width: 48px;
  justify-content: center;
}

.sidebar-menu-item:hover:not(.is-active) {
  background-color: rgba(102, 150, 255, 0.1);
  box-shadow: 0 2px 8px rgba(102, 150, 255, 0.2);
  transform: translateY(-2px);
}

.sidebar-menu-item img {
  filter: brightness(0) saturate(100%) invert(45%) sepia(100%) saturate(3000%)
    hue-rotate(210deg) brightness(95%) contrast(95%);
  transition: filter 0.3s ease;
}

.sidebar-menu-item.is-active {
  position: relative;
  background-color: #6696ff;
  border-radius: 27px;
  width: 140px;
  height: 56px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 150, 255, 0.3);
}

.sidebar.collapsed .sidebar-menu-item.is-active {
  width: 48px;
}

.sidebar-menu-item.is-active img {
  filter: brightness(0) invert(1);
}

/* 添加 tooltip 效果用于折叠状态 */
.sidebar.collapsed .sidebar-menu-item {
  position: relative;
}

.sidebar.collapsed .sidebar-menu-item:hover::after {
  content: attr(data-label);
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    width: 64px;
  }

  .toggle-button {
    display: block;
  }
}

@media (min-width: 1025px) {
  .toggle-button {
    display: none;
  }
}
</style>
