<template>
  <div class="page-container">
    <!-- 顶部标题行 -->
    <div class="page-title-row">
      <div class="left">
        <span class="title">学生管理</span>
        <el-icon class="title-caret"><CaretBottom /></el-icon>
      </div>
      <div class="right">
        <el-button text size="small" class="refresh-btn" @click="onRefresh">
          <el-icon><Refresh /></el-icon>
          <span>刷新</span>
        </el-button>
      </div>
    </div>

    <!-- 搜索卡片 -->
    <div class="search-card card">
      <div class="search-left">
        <el-input
          size="small"
          v-model="keyword"
          placeholder="搜索姓名、联系电话、录入学校"
          class="search-input"
          clearable
          :suffix-icon="Search"
          @input="onSearch"
        />
      </div>
      <div class="search-right">
        <el-button
          type="primary"
          size="small"
          @click="createDialogVisible = true"
        >
          <el-icon><Plus /></el-icon>
          <span>添加学生</span>
        </el-button>
      </div>
    </div>

    <StudentDialog
      v-model="createDialogVisible"
      title="新建学生"
      @save-success="handleCreate"
    />
    <StudentDialog
      v-model="editDialogVisible"
      :student="editingStudent"
      title="编辑学生"
      @save-success="handleEditSave"
    />

    <div class="table-wrap card">
      <el-table
        :data="paged"
        style="width: 100%; height: auto"
        class="student-table"
        :height="'100%'"
        size="small"
        @sort-change="onSortChange"
      >
        <el-table-column type="selection" width="30" />
        <el-table-column label="头像" width="50">
          <template #default="{row}">
            <el-avatar :src="row.avatar" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学生姓名" min-width="80" />
        <el-table-column label="账号状态" min-width="100">
          <template #default="{row}">
            <el-tag
              size="small"
              :type="row.status === 'active' ? 'success' : 'warning'"
            >
              {{ row.status === 'active' ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" min-width="50" />
        <el-table-column prop="birth" min-width="120" sortable>
          <template #header>
            <span
              :class="{
                'th-blue': sortState.prop === 'birth' && sortState.order
              }"
              >出生年月</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="progress" min-width="120" sortable>
          <template #header>
            <span
              :class="{
                'th-blue': sortState.prop === 'progress' && sortState.order
              }"
              >学习进度</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="school" label="学校" min-width="80" />
        <el-table-column prop="gradeClass" label="年级班级" min-width="120" />
        <el-table-column prop="parentName" label="家长姓名" min-width="120" />
        <el-table-column label="与学生关系" min-width="120">
          <template #default="{row}">{{
            row.relation === 'father' ? '父亲' : '母亲'
          }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="140">
          <template #default="{row}">
            <a
              class="tel-link"
              :href="`tel:${row.phone.replaceAll('-', '')}`"
              >{{ row.phone }}</a
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="registerAt"
          label="注册时间"
          min-width="140"
          sortable
        >
          <template #header>
            <span
              :class="{
                'th-blue': sortState.prop === 'registerAt' && sortState.order
              }"
              >注册时间</span
            >
          </template>
          <template #default="{row}"
            >{{ (row.registerAt || '').split(' ')[0] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template #default="{row}">
            <div class="op-col">
              <span class="op-link" @click="goDetail(row)">
                <MyIcon name="detail" />
                <span>详情</span>
              </span>
              <el-divider direction="vertical" />
              <span class="op-mute" @click="toggleStatus(row)">
                {{ row.status === 'active' ? '停用' : '启用' }}
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="bottom-bar card">
      <span class="total-text">共{{ total }}条记录</span>
      <el-pagination
        background
        small
        layout="prev, pager, next, sizes, jumper"
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import StudentDialog from './StudentDialog.vue'
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElInput,
  ElIcon,
  ElAvatar,
  ElDivider,
  ElTag
} from 'element-plus'
import {Search, Plus, Refresh, CaretBottom} from '@element-plus/icons-vue'
import {useStudentStore} from '@/stores/studentStore'
import {useRouter} from 'vue-router'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
defineOptions({name: 'StudentManage'})
const store = useStudentStore()
const router = useRouter()

const createDialogVisible = ref(false)
const editDialogVisible = ref(false)
const editingStudent = ref<any>(null)

const keyword = computed({
  get: () => store.query.keyword,
  set: v => store.setKeyword(v)
})

const currentPage = computed({
  get: () => store.currentPage,
  set: v => store.setPage(v)
})
const pageSize = computed({
  get: () => store.pageSize,
  set: v => store.setPageSize(v)
})
const paged = computed(() => store.paged)
const total = computed(() => store.total)

const onSearch = () => {
  store.setKeyword(keyword.value)
}

const onRefresh = () => {
  // 简单刷新：重置到第一页，可结合后端调用刷新列表
  store.setPage(1)
}

// 页面改为 flex 布局，表格区域占满剩余空间，底部条自然落底

// 可在表格中加入“编辑”入口时启用
// const handleEdit = (student: any) => {
//   editingStudent.value = student
//   editDialogVisible.value = true
// }

const handleCreate = (payload: any) => {
  // 生成一个简单账号（也可以改为后端返回）
  const account = Math.random().toString(36).slice(2, 10)
  store.addStudent({
    account,
    name: payload.studentName,
    gender:
      payload.gender === 'female'
        ? '女'
        : payload.gender === 'male'
          ? '男'
          : '男',
    birth: payload.birth ? `${payload.birth}-01` : '2018-09-01',
    progress: 'L1-01',
    school: payload.school,
    gradeClass: payload.gradeClass || '一年1班',
    parentName: payload.parentName,
    relation: payload.relation || 'father',
    phone: payload.phone,
    avatar: payload.avatar
  } as any)
}

const handleEditSave = (payload: any) => {
  if (!editingStudent.value) return
  store.updateStudent(editingStudent.value.id, {
    name: payload.studentName,
    gender:
      payload.gender === 'female'
        ? '女'
        : payload.gender === 'male'
          ? '男'
          : '男',
    birth: payload.birth ? `${payload.birth}-01` : editingStudent.value.birth,
    school: payload.school,
    phone: payload.phone,
    parentName: payload.parentName,
    relation: payload.relation || editingStudent.value.relation,
    gradeClass: payload.gradeClass || editingStudent.value.gradeClass,
    avatar: payload.avatar || editingStudent.value.avatar
  })
}

const toggleStatus = (row: any) => {
  store.toggleStatus(row.id)
}

const goDetail = (row: any) => {
  // 先占位，后续接入详情页
  router.push({path: '/student-details', query: {studentId: row.id}})
}

// 排序状态：用于只在排序生效的列上激活表头 th-blue 样式
const sortState = ref<{
  prop: string | null
  order: 'ascending' | 'descending' | null
}>({
  prop: null,
  order: null
})
const onSortChange = (e: any) => {
  sortState.value.prop = e?.prop ?? null
  sortState.value.order = e?.order ?? null
}
</script>

<style scoped>
.page-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.page-title-row .left {
  display: flex;
  align-items: center;
  gap: 6px;
}
.page-title-row .title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.page-title-row .title-caret {
  color: #9aa0a6;
}
.page-title-row .refresh-btn {
  color: #9aa0a6;
}

.search-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.search-left {
  flex: 1;
  padding: 8px;
}
.search-right {
  margin-left: 12px;
}
.search-input {
  width: 300px;
  height: 30px;
}

.student-table {
  margin-bottom: 20px;
}

.student-table :deep(.el-table__cell) {
  text-align: center;
}

.student-table :deep(th.el-table__cell) {
  background-color: #f6f9ff;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
}

.th-blue {
  color: #649ffe;
  font-weight: 500;
}
.th-filter {
  color: #9aa0a6;
  margin-left: 6px;
}

/* 提升表头蓝色样式优先级，避免被 Element Plus 的表头/排序状态覆盖 */
.student-table :deep(.el-table__header .cell .th-blue),
.student-table :deep(.el-table__header-wrapper th .cell .th-blue) {
  color: #649ffe !important;
  font-weight: 600;
}

/* 卡片风格容器与表格行高/间距，贴近参考图 */
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(46, 70, 128, 0.08);
  padding: 12px 10px 6px;
}
.page-container {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 15px;
}
.table-wrap {
  flex: 1;
  min-height: 320px;
  height: 0;
  overflow: hidden;
}
.student-table :deep(.el-table__header-wrapper th) {
  height: 40px;
  color: #606266;
  font-weight: 500;
}
.student-table :deep(.el-table__row) {
  height: 52px;
}
.student-table :deep(.cell) {
  font-size: 13px;
}
.op-col {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.op-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #409eff;
  cursor: pointer;
  font-size: 13px;
}
.op-link:hover {
  color: #2262fb;
}
.op-mute {
  color: #9aa0a6;
  cursor: pointer;
  font-size: 13px;
}
.op-mute:hover {
  color: #6b7280;
}
.tel-link {
  color: #649ffe;
  text-decoration: underline;
  font-size: 13px;
}
.bottom-bar {
  width: 100%;
  margin-top: 12px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.bottom-bar .total-text {
  color: #606266;
  font-size: 12px;
}
</style>
