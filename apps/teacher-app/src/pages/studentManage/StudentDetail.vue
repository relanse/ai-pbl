<template>
  <div class="detail-page">
    <!-- 顶部个人信息卡片 -->
    <div class="card header-card">
      <div class="left">
        <el-avatar :src="student?.avatar || defaultAvatar" :size="72" />
        <div class="meta">
          <div class="name-row">
            <span class="name">{{ student?.name || '-' }}</span>
            <span class="gender" v-if="student">
              {{ student.gender }}
            </span>
          </div>
          <div class="sub">出生年月：{{ birthDate }}<span v-if="ageText">（年龄：{{ ageText }}）</span></div>
          <div class="status-row">
            <span>账号状态：</span>
            <el-tag :type="student?.status === 'active' ? 'success' : 'warning'" size="small">
              {{ student?.status === 'active' ? '正常' : '停用' }}
            </el-tag>
            <span class="pwd">密码：{{ displayedPwd }}</span>
            <el-icon class="pwd-eye" @click="togglePwd">
              <component :is="showPwd ? Hide : View" />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="right">
        <el-button text type="danger" @click="toggleStatus" class="mute-btn">
          {{ student?.status === 'active' ? '停用' : '启用' }}
        </el-button>
      </div>
    </div>

    <!-- 信息区域 -->
    <div class="card tabs-card">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="学生详情" name="info">
          <div class="section">
            <div class="section-title">
              <i class="dot" /> 学校信息
            </div>
            <div class="kv">
              <div class="item"><span class="k">学校名称：</span><span class="v">{{ student?.school || '-' }}</span></div>
              <div class="item"><span class="k">年级班级：</span><span class="v">{{ student?.gradeClass || '-' }}</span></div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">
              <i class="dot" /> 家长/监护人信息
            </div>
            <div class="kv">
              <div class="item"><span class="k">家长姓名：</span><span class="v">{{ student?.parentName || '-' }}</span></div>
              <div class="item"><span class="k">联系电话：</span><span class="v light">{{ student?.phone || '-' }}</span></div>
              <div class="item"><span class="k">与学生关系：</span><span class="v">{{ relationText }}</span></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="题目历史" name="history">
          <div class="section">
            <div class="section-title">
              <i class="dot" /> 题目历史
            </div>
            <div class="filters">
              <el-date-picker
                v-model="filter.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                size="small"
              />
              <el-select v-model="filter.result" placeholder="结果" size="small" style="width: 120px;">
                <el-option label="全部" value="" />
                <el-option label="正确" value="correct" />
                <el-option label="错误" value="wrong" />
              </el-select>
              <el-input v-model="filter.keyword" placeholder="关键字" size="small" style="width: 180px;" />
              <el-button type="primary" size="small" @click="applyFilter">筛选</el-button>
              <el-button size="small" @click="resetFilter">重置</el-button>
            </div>
            <el-table :data="filteredHistory" size="small" style="width: 100%; margin-top: 10px;">
              <el-table-column prop="date" label="日期" width="120" />
              <el-table-column prop="title" label="题目" min-width="200" />
              <el-table-column prop="resultText" label="结果" width="90" />
              <el-table-column prop="score" label="得分" width="90" />
            </el-table>
            <div v-if="filteredHistory.length === 0" class="empty">暂无匹配记录</div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="footer-actions">
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="openEdit">编辑</el-button>
      </div>
    </div>

    <!-- 复用编辑弹窗 -->
    <StudentDialog
      v-model="editDialogVisible"
      title="编辑学生"
      :student="student || undefined"
      @save-success="handleEditSave"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElAvatar, ElButton, ElIcon, ElTag, ElTabs, ElTabPane, ElMessage } from 'element-plus'
import { View, Hide } from '@element-plus/icons-vue'
import { useStudentStore, type StudentItem } from '@/stores/studentStore'
import defaultAvatar from '@aipbl/common/assets/DefaultAvatar.png'
import StudentDialog from './StudentDialog.vue'

const route = useRoute()
const router = useRouter()
const store = useStudentStore()

const sid = computed(() => (route.query.studentId as string) || '')
const student = computed<StudentItem | null>(() => store.students.find(s => s.id === sid.value) || null)

const birthDate = computed(() => (student.value?.birth || '-'))
const ageText = computed(() => {
  const birth = student.value?.birth
  if (!birth) return ''
  try {
    // 兼容 YYYY-MM 或 YYYY-MM-DD
    const [y, m = '01', d = '01'] = birth.split('-')
    const bd = new Date(Number(y), Number(m) - 1, Number(d))
    const now = new Date()
    let age = now.getFullYear() - bd.getFullYear()
    const hasNotBirthday = now.getMonth() < bd.getMonth() || (now.getMonth() === bd.getMonth() && now.getDate() < bd.getDate())
    if (hasNotBirthday) age -= 1
    if (age < 0 || age > 120 || Number.isNaN(age)) return ''
    return `${age}岁`
  } catch { return '' }
})
const relationText = computed(() => {
  const rel = student.value?.relation
  if (!rel) return '-'
  return rel === 'father' ? '父亲' : '母亲'
})

const activeTab = ref('info')
const editDialogVisible = ref(false)
type HistoryItem = { date: string; title: string; result: 'correct'|'wrong'; score: number }
const historyList = ref<HistoryItem[]>([
  { date: '2025-08-01', title: '加减法训练（10以内）', result: 'correct', score: 100 },
  { date: '2025-08-03', title: '基础英语单词测试A', result: 'wrong', score: 60 },
  { date: '2025-08-05', title: '图形记忆训练 第一单元', result: 'correct', score: 90 },
  { date: '2025-08-06', title: '逻辑推理入门-1', result: 'wrong', score: 70 }
])
const filter = reactive({ dateRange: [] as string[]|null, result: '', keyword: '' })
const filteredHistory = computed(() => {
  return historyList.value.filter(i => {
    const passResult = filter.result ? i.result === filter.result : true
    const passKeyword = filter.keyword ? (i.title.includes(filter.keyword)) : true
    const passDate = Array.isArray(filter.dateRange) && filter.dateRange.length === 2
      ? (i.date >= filter.dateRange[0] && i.date <= filter.dateRange[1])
      : true
    return passResult && passKeyword && passDate
  }).map(i => ({ ...i, resultText: i.result === 'correct' ? '正确' : '错误' }))
})
const applyFilter = () => { /* computed 已实时应用，无需额外逻辑 */ }
const resetFilter = () => { filter.dateRange = []; filter.result = ''; filter.keyword = '' }

const goBack = () => router.back()

const openEdit = () => {
  editDialogVisible.value = true
}

const handleEditSave = (payload: any) => {
  if (!student.value) return
  store.updateStudent(student.value.id, {
    name: payload.studentName,
    gender: payload.gender === 'female' ? '女' : payload.gender === 'male' ? '男' : '男',
    birth: payload.birth ? `${payload.birth}-01` : student.value.birth,
    school: payload.school,
    phone: payload.phone,
    parentName: payload.parentName,
    relation: payload.relation || student.value.relation,
    gradeClass: payload.gradeClass || student.value.gradeClass,
    avatar: payload.avatar || student.value.avatar
  })
  ElMessage.success('已保存')
}

const toggleStatus = () => {
  if (!student.value) return
  store.toggleStatus(student.value.id)
}

// 密码显示/隐藏
const showPwd = ref(false)
const displayedPwd = computed(() => {
  const raw = student.value?.password || ''
  if (showPwd.value) return raw || '-'
  // 使用与长度相同的 * 掩码
  return raw ? '*'.repeat(Math.min(raw.length, 12)) : '********'
})
const togglePwd = () => {
  showPwd.value = !showPwd.value
}

onMounted(() => {
  if (!sid.value || !student.value) {
    ElMessage.warning('未找到学生数据')
  }
})
</script>

<style scoped>
.detail-page { padding: 12px; background: #eaf2ff; min-height: 100%; }
.card { background: #fff; border-radius: 14px; box-shadow: 0 8px 24px rgba(46,70,128,.08); }

.header-card { display: flex; align-items: center; justify-content: space-between; padding: 14px; }
.header-card .left { display: flex; align-items: center; gap: 12px; }
.header-card .meta .name-row { display: flex; align-items: center; gap: 6px; }
.header-card .meta .name { font-size: 18px; font-weight: 600; color: #333; }
.header-card .meta .gender { color: #409EFF; font-size: 14px; }
.header-card .meta .sub { color: #8c99ab; margin-top: 4px; }
.header-card .status-row { display: flex; align-items: center; gap: 10px; margin-top: 6px; color: #8c99ab; }
.header-card .right .mute-btn { color: #8c99ab; }
.header-card .pwd { margin-left: 8px; color: #ff8c66; }
.header-card .pwd-eye { color: #9aa0a6; }

.tabs-card { margin-top: 14px; padding: 0 14px 14px; }
.tabs-card :deep(.el-tabs--card > .el-tabs__header) {
  border-bottom: none;
  margin: 12px 8px 0;
}
.tabs-card :deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  background: #f1f6ff;
  border: none;
  border-radius: 12px;
  padding: 4px;
}
.tabs-card :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border: none;
  border-radius: 8px;
  margin: 0 4px;
  color: #9aa0a6;
}
.tabs-card :deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  background: #fff;
  color: #2e4680;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(46,70,128,0.08);
}
.section { background: #f6f9ff; border-radius: 10px; padding: 16px; margin: 14px 0; }
.section-title { font-weight: 600; color: #2e4680; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
.section-title .dot { width: 6px; height: 16px; background: #5079ff; display: inline-block; border-radius: 3px; }
.kv { display: grid; grid-template-columns: repeat(2, minmax(200px, 1fr)); gap: 12px 24px; color: #6b7280; }
.kv .k { color: #4b5563; }
.kv .v.light { color: #9aa0a6; }

.empty { color: #9aa0a6; text-align: center; padding: 24px 0; }
.footer-actions { display: flex; justify-content: flex-end; gap: 10px; padding: 12px 0 0; }

/* 调紧间距以适配 1k 分辨率 */
@media (max-height: 800px) {
  .header-card { padding: 12px; }
  .tabs-card { margin-top: 10px; }
  .section { padding: 12px; margin: 10px 0; }
}
</style>
