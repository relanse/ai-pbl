<template>
  <div class="course-page">
    <!-- 顶部标题与刷新 -->
    <div class="page-header">
      <div class="title-row">
        <span class="title">等级课程管理</span>
      </div>
      <div class="toolbar">
        <el-input
          class="search"
          v-model="searchQuery"
          placeholder="搜索等级课程名称"
          clearable
          :prefix-icon="Search"
        />
        <div class="spacer" />
        <el-button text @click="refresh">刷新</el-button>
        <el-button class="create-btn" type="primary" @click="openCreateDialog">
          <el-icon class="plus"><Plus /></el-icon>
          新建等级课程
        </el-button>
      </div>
    </div>

    <!-- 卡片栅格 -->
    <div class="card-grid">
      <div v-for="c in filteredCourses" :key="c.id" class="course-card">
        <div
          class="cover"
          :style="{
            backgroundImage: c.cover ? `url(${c.cover})` : '',
            backgroundSize: c.cover ? 'cover' : '',
            backgroundPosition: c.cover ? 'center' : ''
          }"
        >
          <div
            class="status"
            :class="c.published ? 'published' : 'unpublished'"
          >
            <i class="dot" /> {{ c.published ? '已发布' : '未发布' }}
          </div>
          <el-dropdown class="card-menu" trigger="click" :teleported="false">
            <span class="el-dropdown-link"
              ><el-icon><MoreFilled /></el-icon
            ></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="togglePublish(c)" :icon="Upload">{{
                  c.published ? '取消发布' : '发布'
                }}</el-dropdown-item>
                <el-dropdown-item @click="openEditDialog(c)" :icon="Edit"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item
                  divided
                  class="danger"
                  @click="confirmDelete(c)"
                  :icon="Delete"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="body">
          <div class="name">{{ c.name }}</div>
          <div class="desc">{{ c.desc }}</div>
        </div>
        <div class="footer">
          <div class="meta">
            学生数：<span class="link">{{ c.students.toLocaleString() }}</span>
          </div>
          <el-button link type="primary" @click="viewDetail(c)"
            >查看详情</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <LevelCourseDialog
    v-model="dialogVisible"
    :course="dialogCourse"
    @saved="onDialogSaved"
  />
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {
  ElMessage,
  ElMessageBox,
  ElButton,
  ElDropdownItem,
  ElDropdown,
  ElInput,
  ElIcon,
  ElDropdownMenu
} from 'element-plus'
import {
  Search,
  Plus,
  MoreFilled,
  Delete,
  Edit,
  Upload
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {useCourseStore} from '@/stores/courseStore'
import LevelCourseDialog from './components/LevelCourseDialog.vue'
defineOptions({
  name: 'CourseLevelManage'
})
const router = useRouter()
const searchQuery = ref('')
type Course = {
  id: string
  name: string
  desc: string
  students: number
  published: boolean
  cover?: string
}
const courseList = ref<Course[]>([])

const store = useCourseStore()

const dialogVisible = ref(false)
const dialogCourse = ref<any>(null)
const openCreateDialog = () => {
  store.init()
  dialogCourse.value = null
  dialogVisible.value = true
}

const fetchCourseList = () => {
  store.init()
  // 将 L1/L2 课程从 store 取出，并用该课程的第一条课节的封面作为课程封面展示
  const courses = store.listCourses()
  const list: Course[] = courses.map(c => {
    const lessons = store.listLessons(c.id)
    return {
      id: c.id,
      name: c.name,
      desc:
        c.intro ||
        '这是课程的简介文案，这是课程的简介文案这是课程的简介文案这是课程的简介文案...',
      students: 1234,
      published: c.published,
      cover: c.cover || lessons[0]?.cover
    }
  })
  courseList.value = list
}

const filteredCourses = computed(() => {
  const q = (searchQuery.value || '').trim()
  if (!q) return courseList.value
  return courseList.value.filter(c => c.name.includes(q))
})

const refresh = () => fetchCourseList()

const viewDetail = (c: Course) => {
  router.push({
    name: 'course-sub-list',
    params: {courseId: c.id},
    query: {name: c.name}
  })
}
const openEditDialog = (c: Course) => {
  dialogCourse.value = {
    id: c.id,
    name: c.name,
    published: c.published,
    intro: c.desc,
    cover: c.cover
  }
  dialogVisible.value = true
}
const confirmDelete = async (c: Course) => {
  try {
    await ElMessageBox.confirm(
      `确认删除等级课程「${c.name}」及其下所有子课程？该操作不可恢复。`,
      '删除确认',
      {type: 'warning'}
    )
  } catch {
    return
  }
  store.deleteCourse(c.id)
  ElMessage.success('已删除')
  fetchCourseList()
}
const togglePublish = (c: Course) => {
  // 持久化到 store，并刷新列表
  const next = !c.published
  store.setCoursePublished(c.id, next)
  c.published = next
  ElMessage.success(next ? '已发布' : '已取消发布')
}
onMounted(fetchCourseList)

const onDialogSaved = () => {
  fetchCourseList()
}
</script>

<style scoped>
.course-page {
  padding: 14px;
  background: #eaf2ff;
}
.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
}
.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.title {
  font-size: 18px;
  font-weight: 600;
  color: #2e4680;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.toolbar .spacer {
  flex: 1;
}
.toolbar .search {
  max-width: 340px;
}
.create-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 6px 14px rgba(79, 121, 255, 0.25);
}
.create-btn .plus {
  font-size: 16px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.course-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(46, 70, 128, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(46, 70, 128, 0.12);
}
.course-card .cover {
  height: 138px;
  background: #cfd8e3;
  position: relative;
}
.course-card .edit-fab {
  position: absolute;
  right: 14px;
  bottom: 48px;
  box-shadow: 0 6px 14px rgba(79, 121, 255, 0.25);
}
.course-card .status {
  position: absolute;
  right: 12px;
  bottom: 10px;
  font-size: 12px;
  color: #6b7280;
  background: #eef0f3;
  border-radius: 12px;
  padding: 4px 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.course-card .status.published {
  background: #e8f6ee;
  color: #2e8b57;
}
.course-card .status.unpublished {
  background: #eff1f5;
  color: #9aa0a6;
}
.course-card .status .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background: currentColor;
  opacity: 0.7;
}
.course-card .card-menu {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #9aa0a6;
}
.course-card .body {
  padding: 12px;
}
.course-card .name {
  font-weight: 600;
  color: #333;
  font-size: 16px;
  margin-bottom: 6px;
}
.course-card .desc {
  color: #6b7280;
  font-size: 13px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
.course-card .footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px 12px;
  border-top: 1px solid #f1f5f9;
  color: #6b7280;
}
.course-card .meta {
  font-size: 14px;
}
.course-card .meta .link {
  color: #649ffe;
  cursor: pointer;
  font-size: 14px;
}
.course-card .meta .link:hover {
  color: #2262fb;
  text-decoration: underline;
}

@media (max-width: 1440px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 1100px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 下拉菜单 - 危险操作样式 */
:deep(.el-dropdown-menu__item.danger) {
  color: #e64545;
}
:deep(.el-dropdown-menu__item.danger) .el-icon {
  color: #e64545;
}
:deep(.el-dropdown-menu__item.danger):hover {
  background-color: #fdecec;
  color: #d03030;
}
</style>
