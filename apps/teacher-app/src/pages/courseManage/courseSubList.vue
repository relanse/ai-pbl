<template>
  <div class="course-sub-page">
    <div class="toolbar card">
      <el-input
        v-model="keyword"
        placeholder="搜索课程名称、课程简介"
        clearable
        :prefix-icon="Search"
      />
      <el-select v-model="topic" placeholder="题目" class="topic">
        <el-option label="全部" value="" />
        <el-option
          v-for="opt in topicOptions"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
      <div class="spacer" />
      <el-button type="primary" @click="createLesson">新建课程</el-button>
    </div>

    <div class="table card">
      <el-table :data="filteredRows" size="small" @sort-change="onSortChange">
        <el-table-column type="selection" width="48" />
        <el-table-column label="封面" width="80">
          <template #default="{row}">
            <img
              class="cover"
              :src="row.cover || 'https://dummyimage.com/48x48/ffe4cc/ffffff'"
              alt="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="no" label="课程序号" width="120" />
        <el-table-column prop="name" label="课程名称" min-width="160" />
        <el-table-column prop="brief" label="课程简介" min-width="220">
          <template #default="{row}">
            <el-tooltip placement="top" :content="row.brief">
              <span class="brief">{{ row.brief }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="statusText" label="课程状态" width="120">
          <template #default="{row}">
            <span class="status" :class="row.status">{{ row.statusText }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="课程类型" width="120" />
        <el-table-column prop="creator" label="创建人" width="100" />
        <el-table-column
          prop="createdAt"
          label="创建时间"
          sortable="custom"
          width="140"
        >
          <template #header>
            <span
              :class="{
                'th-blue': sortState.prop === 'createdAt' && sortState.order
              }"
              >创建时间</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{row}">
            <el-link type="info" :underline="false" @click="goDetail(row)"
              >详情</el-link
            >
            <span class="sep">/</span>
            <el-link type="primary" :underline="false" @click="goEdit(row)"
              >编辑</el-link
            >
            <span class="sep">/</span>
            <el-link
              :underline="false"
              @click="togglePublish(row)"
              type="success"
              >{{ row.status === 'published' ? '取消发布' : '发布' }}</el-link
            >
            <span class="sep">/</span>
            <el-link type="danger" :underline="false" @click="deleteRow(row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watchEffect} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElLink,
  ElTooltip,
  ElMessage,
  ElMessageBox
} from 'element-plus'
import {Search} from '@element-plus/icons-vue'
import {useCourseStore} from '@/stores/courseStore'

defineOptions({name: 'CourseSubList'})

const route = useRoute()
const router = useRouter()
const courseId = computed(() => (route.params.courseId as string) || 'L1')
const courseTitle = computed(
  () =>
    (route.query.name as string) ||
    `L${courseId.value.match(/\d+/)?.[0] || '1'}.认知基础`
)
// 同步到 layout 面包屑：动态设置为课程名称
watchEffect(() => {
  route.meta.title = courseTitle.value
})

type Row = {
  id: string
  no: string
  name: string
  brief: string
  topic: string
  status: 'published' | 'draft' | 'disabled'
  statusText: string
  type: string
  creator: string
  createdAt: string
  cover?: string
}
// 题目枚举来源：按课程维度
const topicsMap: Record<string, {label: string; value: string}[]> = {
  L1: [
    {label: '数学', value: 'math'},
    {label: '英语', value: 'en'},
    {label: '逻辑', value: 'logic'}
  ],
  L2: [
    {label: '图像', value: 'vision'},
    {label: '几何', value: 'geom'}
  ]
}
const topicOptions = computed(
  () => topicsMap[courseId.value] || [{label: '数学', value: 'math'}]
)

const store = useCourseStore()
store.init()
const all = computed<Row[]>(() =>
  store.listLessons(courseId.value).map((l, i) => ({
    id: l.id,
    no: l.no,
    name: l.name,
    brief: l.brief,
    // 用课程维度的 topic 模拟，保证筛选可用
    topic: (
      topicOptions.value[i % topicOptions.value.length] || topicOptions.value[0]
    ).value,
    status: l.status === 'published' ? 'published' : 'draft',
    statusText: l.status === 'published' ? '已发布' : '未发布',
    type: l.type,
    creator: l.creator,
    createdAt: l.createdAt,
    cover: l.cover
  }))
)

const keyword = ref('')
const topic = ref('')
const sortState = ref<{prop: string; order: 'ascending' | 'descending' | null}>(
  {prop: '', order: null}
)

const filteredRows = computed(() => {
  const q = keyword.value.trim()
  let list = [...all.value]
  if (q) list = list.filter(r => r.name.includes(q) || r.brief.includes(q))
  if (topic.value) list = list.filter(r => r.topic === topic.value)
  if (sortState.value.prop === 'createdAt' && sortState.value.order) {
    const dir = sortState.value.order === 'ascending' ? 1 : -1
    list = list.sort((a, b) => a.createdAt.localeCompare(b.createdAt) * dir)
  }
  return list
})

const onSortChange = (s: any) => {
  sortState.value = {prop: s.prop, order: s.order}
  if (s.prop === 'createdAt') {
    // 只记录排序意图，数据排序由计算属性在读取时据此排序（见下）
  }
}

const createLesson = () => {
  router.push({
    name: 'course-lesson-create',
    params: {courseId: courseId.value},
    query: {name: courseTitle.value}
  })
}
const goDetail = (row: Row) => {
  router.push({
    name: 'course-lesson-detail',
    params: {courseId: courseId.value, lessonId: row.id}
  })
}
const goEdit = (row: Row) => {
  router.push({
    name: 'course-lesson-edit',
    params: {courseId: courseId.value, lessonId: row.id},
    query: {name: courseTitle.value}
  })
}
const togglePublish = (row: Row) => {
  if (row.status === 'published') {
    store.setLessonStatus(row.id, 'draft')
    ElMessage.success('已取消发布')
  } else {
    store.setLessonStatus(row.id, 'published')
    ElMessage.success('已发布')
  }
}

const deleteRow = async (row: Row) => {
  try {
    await ElMessageBox.confirm(
      `删除后不可恢复，是否确认删除课程"${row.name}"？`,
      '删除课程',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )

    // 执行删除操作
    store.deleteLesson(row.id)
    ElMessage.success('课程删除成功')
  } catch {
    // 用户取消删除，不需要提示
  }
}
</script>

<style scoped>
.course-sub-page {
  padding: 12px;
  background: #eaf2ff;
  min-height: 100%;
}
.card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(46, 70, 128, 0.08);
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}
.toolbar .topic {
  width: 120px;
}
.toolbar .spacer {
  flex: 1;
}
.table {
  margin-top: 12px;
  padding: 8px;
}
.brief {
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
.status {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}
/* 颜色微调：更接近设计稿的透明感 */
.status.published {
  color: #28c76f;
  background: rgba(40, 199, 111, 0.12);
}
.status.draft {
  color: #4f79ff;
  background: rgba(79, 121, 255, 0.12);
}
.status.disabled {
  color: #ff8c66;
  background: rgba(255, 140, 102, 0.12);
}
.cover {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}
:deep(.th-blue) {
  color: #4f79ff;
  font-weight: 600;
}
</style>
