<template>
  <div class="common-layout">
    <div class="layout">
      <!-- 左侧：logo + 侧边菜单 -->
      <aside class="layout-sider">
        <div class="sider-logo">
          <img :src="LogoImg" alt="logo" class="logo" />
          <h2 class="title">鸿蒙智启AI学习平台</h2>
        </div>
        <el-menu
          class="layout-menu"
          router
          :default-active="activeMenu"
          text-color="#333333"
          active-text-color="#2262FB"
        >
          <el-menu-item index="/student-manage" aria-label="学生管理">
            <template #title>
              <MyIcon
                :name="
                  activeMenu == '/student-manage'
                    ? 'studentManageActive'
                    : 'studentManage'
                "
              />
              <span>学生管理</span>
              <el-icon class="menu-arrow"><ArrowRight /></el-icon>
            </template>
          </el-menu-item>
          <el-menu-item index="/course-level-manage" aria-label="课程管理">
            <template #title>
              <MyIcon
                :name="
                  activeMenu == '/course-level-manage'
                    ? 'courseManageActive'
                    : 'courseManage'
                "
              />
              <span>课程管理</span>
              <el-icon class="menu-arrow"><ArrowRight /></el-icon>
            </template>
          </el-menu-item>
          <el-menu-item index="/question-manage" aria-label="题目管理">
            <template #title>
              <MyIcon
                :name="
                  activeMenu == '/question-manage'
                    ? 'questionManageActive'
                    : 'questionManage'
                "
              />
              <span>题目管理</span>
              <el-icon class="menu-arrow"><ArrowRight /></el-icon>
            </template>
          </el-menu-item>
          <el-menu-item index="/certificate-manage" aria-label="证书管理">
            <template #title>
              <MyIcon
                :name="
                  activeMenu == '/certificate-manage'
                    ? 'certificate'
                    : 'certificate'
                "
              />
              <span>证书管理</span>
              <el-icon class="menu-arrow"><ArrowRight /></el-icon>
            </template>
          </el-menu-item>
          <el-menu-item index="/notice" aria-label="通知公告">
            <template #title>
              <MyIcon
                :name="
                  activeMenu == '/notice' ? 'noticeManage' : 'noticeManage'
                "
              />
              <span>通知公告</span>
              <el-icon class="menu-arrow"><ArrowRight /></el-icon>
            </template>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 右侧：main（head + body） -->
      <div class="main">
        <header class="main-head">
          <div class="head-left">
            <el-breadcrumb
              class="layout-breadcrumb"
              :separator-icon="ArrowRight"
              v-if="breadcrumbItems.length > 1"
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
          </div>
          <div class="head-right">
            <!-- 帮助入口 -->
            <el-button
              text
              circle
              aria-label="帮助"
              class="mr-16"
              @click="onHelp"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-button>
            <!-- 消息通知 -->
            <el-popover
              placement="bottom-end"
              trigger="click"
              width="360"
              :show-arrow="false"
            >
              <template #reference>
                <span>
                  <el-badge v-if="hasUnread" is-dot class="mr-16">
                    <el-button text circle aria-label="消息通知">
                      <el-icon><Bell /></el-icon>
                    </el-button>
                  </el-badge>
                  <el-button
                    v-else
                    text
                    circle
                    aria-label="消息通知"
                    class="mr-16"
                  >
                    <el-icon><Bell /></el-icon>
                  </el-button>
                </span>
              </template>
              <div class="notify-panel">
                <div class="notify-header">
                  <span class="notify-header-title">通知</span>
                  <el-button
                    text
                    size="small"
                    @click="markAllRead"
                    :disabled="!hasUnread"
                    >全部已读</el-button
                  >
                </div>
                <div class="notify-list">
                  <div v-if="notifications.length === 0" class="notify-empty">
                    暂无消息
                  </div>
                  <div v-else>
                    <div
                      class="notify-item"
                      v-for="n in notifications"
                      :key="n.id"
                      @click="markRead(n.id)"
                    >
                      <span class="dot" v-if="!n.read"></span>
                      <div class="notify-item-main">
                        <div class="notify-title">{{ n.title }}</div>
                        <div class="notify-time">{{ n.time }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-popover>

            <!-- 用户菜单 -->
            <el-dropdown @command="onUserCommand">
              <span class="el-dropdown-user">
                <el-avatar :src="AvatarImg" :size="32" />
                <el-icon class="el-icon-arrowdown"><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item divided command="logout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </header>
        <main class="main-body">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ElDropdown,
  ElDropdownMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdownItem,
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElPopover,
  ElBadge,
  ElButton,
  ElAvatar
} from 'element-plus'
import {
  ArrowDown,
  ArrowRight,
  Bell,
  QuestionFilled
} from '@element-plus/icons-vue'
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useCourseStore} from '@/stores/courseStore'
import LogoImg from '@aipbl/common/assets/Logo.png'
import AvatarImg from '@aipbl/common/assets/DefaultAvatar.png'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
defineOptions({
  name: 'layoutPages'
})
const route = useRoute()
const router = useRouter()
// 课程/课节数据（用于动态面包屑名）
const courseStore = useCourseStore()
courseStore.init()
// 通知示例数据（含已读状态）
const notifications = ref([
  {id: 'n1', title: '您有一条新的课程审核消息', time: '10 分钟前', read: false},
  {id: 'n2', title: '学生王小明提交了项目作业', time: '1 小时前', read: false},
  {id: 'n3', title: '系统维护通知：今晚 23:00-24:00', time: '昨天', read: true}
])
const hasUnread = computed(() => notifications.value.some(n => !n.read))
const markAllRead = () => {
  notifications.value = notifications.value.map(n => ({...n, read: true}))
}
const markRead = (id: string) => {
  const n = notifications.value.find(i => i.id === id)
  if (n) n.read = true
}
const onUserCommand = (cmd: string) => {
  if (cmd === 'profile') {
    router.push('/profile')
  } else if (cmd === 'logout') {
    router.push('/login')
  }
}
const onHelp = () => {
  router.push('/notice')
}
/*获取当前页面的所属的根目录"学生管理"|"课程管理"|"项目管理"的路由路径*/
const activeMenu = computed(() => {
  const {meta, path} = route
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})

// 面包屑：根据 activeMenu 推导第一级，再拼接当前路由标题
type Crumb = {title: string; path: string}
const menuTitleMap: Record<string, string> = {
  '/student-manage': '学生管理',
  '/course-level-manage': '等级课程管理',
  '/question-manage': '题目管理',
  '/certificate-manage': '证书管理',
  '/notice': '通知公告'
}
const breadcrumbItems = computed<Crumb[]>(() => {
  const crumbs: Crumb[] = []
  const root = activeMenu.value
  const rootTitle = menuTitleMap[root]
  if (root && rootTitle) {
    crumbs.push({title: rootTitle, path: root})
  }

  const routeName = route.name as string | undefined
  const courseId = route.params?.courseId as string | undefined
  // 课程名优先用 query.name，若缺失则从 store 推断
  const courseName =
    typeof route.query?.name === 'string' && route.query.name
      ? (route.query.name as string)
      : courseId
        ? courseStore.courses.find(c => c.id === courseId)?.name || ''
        : ''

  // 课程编辑/新建页面：加入中间一层“课程名称”面包屑
  if (
    routeName === 'course-lesson-create' ||
    routeName === 'course-lesson-edit'
  ) {
    if (courseName) {
      const coursePath = courseId
        ? `/course-level-manage/${courseId}`
        : '/course-level-manage'
      crumbs.push({title: courseName, path: coursePath})
    }
    // 最后一级：课节名（编辑）；新建时显示“新课程”
    let finalTitle = ''
    if (routeName === 'course-lesson-edit') {
      const lessonId = route.params?.lessonId as string | undefined
      if (courseId && lessonId) {
        finalTitle = courseStore.getLesson(courseId, lessonId)?.name || ''
      }
    }
    if (!finalTitle) {
      finalTitle = '新课程'
    }
    crumbs.push({title: finalTitle, path: route.path})
    return crumbs
  }

  // 其他页面：保留原逻辑
  const currentTitle = (route.meta?.title as string) || ''
  if (currentTitle && currentTitle !== rootTitle) {
    crumbs.push({title: currentTitle, path: route.path})
  }
  return crumbs
})

const handleBreadcrumbClick = (path: string) => {
  if (path && path !== route.path) router.push(path)
}
</script>
<style scoped>
.common-layout {
  height: 100vh;
  background: linear-gradient(180deg, #e3f0fe 0%, #f6f9ff 100%);
  overflow-x: hidden; /* 阻止全局横向滚动条 */
}
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100%;
  min-width: 0; /* 防止子项内容撑破产生横向滚动 */
}
.layout-sider {
  background: #fff;
  border-right: 1px solid rgba(0, 0, 0, 0.04);
  padding: 16px 12px;
  box-shadow: 0 8px 24px rgba(46, 70, 128, 0.12);
  border-radius: 0 12px 12px 0;
  position: relative;
  z-index: 2; /* 让阴影浮在内容之上 */
  overflow: hidden; /* 防止子元素溢出圆角 */
}
.sider-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 2px 18px;
}
.layout-menu {
  font-weight: 500;
  background: transparent;
  border: none;
}
.layout-menu .el-menu-item {
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
}
.layout-menu :deep(.el-menu-item.is-active) {
  background: #e9f1ff;
  border-radius: 8px;
  color: #2262fb;
  font-weight: 700;
}
.layout-menu .el-menu-item span {
  margin-left: 10px;
}
.layout-menu :deep(.el-menu-item .menu-arrow) {
  margin-left: auto;
  color: #c0c4cc;
}

.main {
  display: grid;
  grid-template-rows: 64px 1fr;
  height: 100vh;
  overflow: hidden; /* 避免横向滚动条 */
  min-width: 0;
}
.main-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.layout-breadcrumb {
  font-size: 13px;
}
.breadcrumb-link {
  color: #606266;
  cursor: pointer;
}
.breadcrumb-link:hover {
  text-decoration: underline;
}
.breadcrumb-current {
  color: #649ffe;
  font-weight: 700;
}
.main-body {
  padding-left: 15px;
  overflow: auto;
}
.page-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}
.layout-container {
  display: none;
}
.logo {
  width: 45px;
  height: 28px;
}
.title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  color: #2262fb;
}
.el-dropdown-user {
  cursor: pointer;
  color: #333333;
  display: flex;
  align-items: center;
  gap: 8px;
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
.mr-16 {
  margin-right: 16px;
}
.notify-list {
  max-height: 320px;
  overflow-y: auto;
}
.notify-panel {
  padding: 8px 8px 4px;
}
.notify-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 4px 8px;
}
.notify-header-title {
  font-weight: 600;
  color: #333;
}
.notify-item {
  padding: 8px 4px;
  border-bottom: 1px solid #f0f2f5;
}
.notify-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.notify-item .dot {
  width: 8px;
  height: 8px;
  background: #f56c6c;
  border-radius: 50%;
  margin-top: 8px;
}
.notify-item-main {
  flex: 1;
}
.notify-title {
  font-size: 14px;
  color: #333;
}
.notify-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
.notify-empty {
  text-align: center;
  color: #999;
  padding: 16px 0;
}
.notify-actions {
  text-align: right;
  padding-top: 8px;
}
</style>
