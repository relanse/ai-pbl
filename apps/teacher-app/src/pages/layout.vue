<template>
  <div class="common-layout">
    <el-container class="wrapper">
      <el-header class="layout-header">
        <div class="layout-header-logo">
          <img :src="LogoImg" alt="logo" class="logo" />
          <h2 class="title">鸿蒙智启管理平台</h2>
        </div>
        <div class="layout-header-user">
          <el-dropdown>
            <span class="el-dropdown-user">
              超管12345
              <el-icon class="el-icon-arrowdown"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="layout-container">
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
        <el-main class="layout-main">
          <el-breadcrumb
            :separator-icon="ArrowRight"
            v-if="breadcrumbItems.length > 1"
            class="layout-main-header"
          >
            <el-breadcrumb-item
              v-for="(item, index) in breadcrumbItems"
              :key="item.path"
            >
              <a
                v-if="index < breadcrumbItems.length - 1"
                @click="handleBreadcrumbClick(item.path)"
                class="breadcrumb-link"
              >
                {{ item.title }}
              </a>
              <span v-else class="breadcrumb-current">{{ item.title }}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>

          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {
  ElContainer,
  ElHeader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElBreadcrumb,
  ElBreadcrumbItem
} from 'element-plus'
import {ArrowDown, ArrowRight} from '@element-plus/icons-vue'
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import LogoImg from '@aipbl/common/assets/Logo.png'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
defineOptions({
  name: 'layoutPages'
})
const route = useRoute()
const router = useRouter()
/*获取当前页面的所属的根目录"学生管理"|"课程管理"|"项目管理"的路由路径*/
const activeMenu = computed(() => {
  const {meta, path} = route
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})

const breadcrumbItems = computed(() => {
  const allRoutes = router.getRoutes()

  const generateBreadcrumbs = (
    currentRoute: typeof route,
    crumbs: {title: string; path: string}[] = []
  ): {title: string; path: string}[] => {
    if (!currentRoute || !currentRoute.meta) {
      return crumbs
    }
    if (
      currentRoute.meta.title &&
      !crumbs.some(c => c.path === currentRoute.path)
    ) {
      crumbs.unshift({
        title: currentRoute.meta.title as string,
        path: currentRoute.path
      })
    }

    let parentPath: string | undefined

    if (currentRoute.meta.parentPath) {
      parentPath = currentRoute.meta.parentPath as string
    } else if (currentRoute.meta.activeMenu) {
      parentPath = currentRoute.meta.activeMenu as string
    }

    if (parentPath) {
      const parentRoute = allRoutes.find(r => r.path === parentPath)
      if (parentRoute) {
        if (parentRoute.path !== currentRoute.path) {
          /*防止死循环*/ return generateBreadcrumbs(parentRoute as any, crumbs)
        }
      }
    }
    return crumbs
  }
  //调用函数
  return generateBreadcrumbs(route)
})

const handleBreadcrumbClick = (path: string) => {
  if (path && path !== route.path) {
    router.push(path)
  }
}
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
  padding: 0 20px;
  height: 80px;
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
  font-weight: 500;
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

.layout-main-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 500;
}
.page-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}
.breadcrumb-link {
  color: #999;
  cursor: pointer;
}
.breadcrumb-link:hover {
  color: #2262fb;
}
.breadcrumb-current {
  color: #333;
  font-weight: 500;
}
.breadcrumb-separator {
  margin: 0 4px;
  color: #999;
}
.layout-container {
  height: calc(100% - 80px);
}
.layout-main {
  background: #ffffff;
  border-radius: 12px;
  margin: 0 20px 20px 0;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  overflow-y: auto;
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
.el-dropdown-user {
  cursor: pointer;
  color: #333333;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  outline: none;
}
.el-dropdown-user .el-icon-arrowdown {
  margin-left: 8px;
}
.layout-header-user :deep(.el-dropdown-menu__item) {
  justify-content: center;
}
</style>
