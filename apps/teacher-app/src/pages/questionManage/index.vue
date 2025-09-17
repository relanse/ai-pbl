<template>
  <div class="question-page">
    <div class="header-row">
      <div class="title">题目</div>
      <el-button text @click="refresh">刷新</el-button>
    </div>

    <!-- 顶部课程横向 chips -->
    <div class="course-chips card">
      <div
        v-for="c in courses"
        :key="c.id"
        class="chip"
        :class="{active: c.id === activeCourseId}"
        @click="activeCourseId = c.id"
      >
        <div class="chip-title">{{ c.name }}</div>
        <div class="chip-footer">
          <span class="tag" :class="c.published ? 'ok' : 'off'">
            <i class="dot" /> {{ c.published ? '已发布' : '未发布' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-card card">
      <el-table
        :data="tableData"
        size="small"
        style="width: 100%"
        @sort-change="onSortChange"
      >
        <el-table-column label="封面" width="80">
          <template #default="{row}">
            <img
              class="cover"
              :src="row.cover || 'https://dummyimage.com/48x48/ffe4cc/ffffff'"
              alt="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="courseNo" label="课程序号" width="120" />
        <el-table-column prop="courseName" label="课程名称" min-width="200" />
        <el-table-column prop="questionCount" label="题目数量" width="100" />
        <el-table-column
          prop="publishStatusText"
          label="发布状态"
          width="120"
        />
        <el-table-column prop="publisher" label="发布人" width="120" />
        <el-table-column
          prop="publishTime"
          label="发布时间"
          sortable="custom"
          width="140"
        >
          <template #header>
            <span
              :class="{
                'th-blue': sortState.prop === 'publishTime' && sortState.order
              }"
              >发布时间</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{row}">
            <el-link type="primary" :underline="false" @click="goDetail(row)"
              >查看详细</el-link
            >
            <span class="sep">/</span>
            <el-link type="danger" :underline="false" @click="editLesson()"
              >编辑题目</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watchEffect} from 'vue'
import {ElButton, ElTable, ElTableColumn, ElLink} from 'element-plus'
import {useCourseStore} from '@/stores/courseStore'
import {useRouter} from 'vue-router'

defineOptions({name: 'QuestionManage'})

type CourseChip = {id: string; name: string; published: boolean}
type Row = {
  id: string
  cover: string
  courseId: string
  courseNo: string
  courseName: string
  questionCount: number
  publishStatus: 'published' | 'draft' | 'unpublished'
  publishStatusText: string
  publisher: string
  publishTime: string | '-'
}

const router = useRouter()
const store = useCourseStore()
store.init()

const courses = computed<CourseChip[]>(() =>
  store
    .listCourses()
    .map(c => ({id: c.id, name: c.name, published: c.published}))
)
const activeCourseId = ref<string>('')

watchEffect(() => {
  if (!activeCourseId.value && courses.value.length) {
    activeCourseId.value = courses.value[0].id
  }
})

const baseRows = computed<Row[]>(() => {
  const cid = activeCourseId.value
  if (!cid) return []
  const course = store.listCourses().find(c => c.id === cid)
  return store.listLessons(cid).map(lesson => {
    const isPublished = lesson.status === 'published'
    const isCourseOff = course ? !course.published : false
    const statusText = isPublished
      ? isCourseOff
        ? '未发布'
        : '已发布'
      : '暂存中'
    return {
      id: lesson.id,
      cover: lesson.cover,
      courseId: cid,
      courseNo: lesson.no,
      courseName: lesson.name,
      questionCount: 0,
      publishStatus: isPublished
        ? isCourseOff
          ? 'unpublished'
          : 'published'
        : 'draft',
      publishStatusText: statusText,
      publisher: isPublished ? lesson.creator : '-',
      publishTime: isPublished ? lesson.createdAt : '-'
    }
  })
})

const sortState = ref<{prop: string; order: 'ascending' | 'descending' | null}>(
  {prop: '', order: null}
)
const onSortChange = (s: any) => {
  sortState.value = {prop: s.prop, order: s.order}
}

const tableData = computed(() => {
  let rows = baseRows.value
  if (sortState.value.prop === 'publishTime' && sortState.value.order) {
    const dir = sortState.value.order === 'ascending' ? 1 : -1
    rows = [...rows].sort(
      (a, b) => String(a.publishTime).localeCompare(String(b.publishTime)) * dir
    )
  }
  return rows
})

const refresh = () => {
  // 触发依赖更新
  sortState.value = {prop: '', order: null}
}
const goDetail = (row: Row) => {
  router.push({
    name: 'course-lesson-detail',
    params: {courseId: row.courseId, lessonId: row.id}
  })
}
const editLesson = () => {
  router.push('/edit')
}
</script>

<style scoped>
.question-page {
  padding: 12px;
  background: #eaf2ff;
  min-height: 100%;
}
.card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(46, 70, 128, 0.08);
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.title {
  font-size: 18px;
  font-weight: 600;
  color: #2e4680;
}

.course-chips {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
  padding: 12px;
}
.chip {
  background: #f7faff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}
.chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(46, 70, 128, 0.08);
}
.chip.active {
  background: #4f79ff;
  color: #fff;
}
.chip-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
.chip .chip-footer {
  margin-top: 8px;
}
.chip .tag {
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: 12px;
  background: #eef0f6;
  color: #9aa0a6;
}
.chip .tag.ok {
  background: #e8f6ee;
  color: #2e8b57;
}
.chip .tag.off {
  background: #eff1f5;
  color: #9aa0a6;
}
.chip .tag .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.8;
}

.table-card {
  margin-top: 12px;
  padding: 10px;
}
.cover {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

/* 表头排序时高亮 */
:deep(.th-blue) {
  color: #4f79ff;
  font-weight: 600;
}

/* 小屏适配不出现横向滚动 */
@media (max-width: 1440px) {
  .course-chips {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 1100px) {
  .course-chips {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
