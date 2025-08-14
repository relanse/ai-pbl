<template>
  <el-config-provider :locale="zhCn">
    <div>
      <div class="header-container">
        <el-input
          v-model="searchQuery"
          placeholder="请输入账号/学生姓名/联系电话"
          class="search-input"
          clearable
          :prefix-icon="Search"
        />
        <el-button type="primary" @click="createDialogVisible = true">
          <el-icon><Plus /></el-icon>
          <span>新建学生</span>
        </el-button>
      </div>
      <CreateStudentDialog
        v-model="createDialogVisible"
        @save-success="handleSaveSuccess"
      />

      <el-table :data="studentList" style="width: 100%" class="student-table">
        <el-table-column prop="id" label="账号" width="280" />
        <el-table-column prop="name" label="学生姓名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="grade" label="年级" />
        <el-table-column prop="school" label="学校" />
        <el-table-column prop="parentName" label="家长姓名" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="createdAt" label="创建时间" width="160px" />
        <el-table-column prop="updatedAt" label="最新编辑时间" width="160px" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="primary" link>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        class="pagination-container"
      />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import CreateStudentDialog from './StudentDialog.vue' // 确保路径正确
import {
  ElConfigProvider,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElInput,
  ElIcon
} from 'element-plus'
import {Search, Plus} from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const createDialogVisible = ref(false)
const searchQuery = ref('')
const studentList = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchStudentList = () => {
  const mockData = [
    {
      id: '550e8400-e29b-446655441234',
      name: '宁一',
      gender: '女',
      age: 8,
      grade: '小学二年级',
      school: '深圳第二小学',
      parentName: '宁星',
      phone: '13145156636',
      createdAt: '2024-11-02 13:22:11',
      updatedAt: '2024-11-02 13:22:11'
    },
    {
      id: '550e24012-e29b-446655440130',
      name: '任消生',
      gender: '男',
      age: 10,
      grade: '小学四年级',
      school: '深圳第三小学',
      parentName: '任生',
      phone: '13145156636',
      createdAt: '2024-11-01 13:22:11',
      updatedAt: '2024-11-01 13:22:11'
    },
    {
      id: '550e841c-e29b-446655440010',
      name: '欧阳奋强',
      gender: '男',
      age: 7,
      grade: '小学一年级',
      school: '深圳第二小学',
      parentName: '欧阳奋起',
      phone: '13145156636',
      createdAt: '2024-11-02 13:20:11',
      updatedAt: '2024-11-02 13:20:11'
    },
    {
      id: '510e4400-e29b-446655440011',
      name: '欧阳娜娜',
      gender: '女',
      age: 11,
      grade: '小学五年级',
      school: '深圳第二小学',
      parentName: '张怡',
      phone: '13145156636',
      createdAt: '2024-11-01 13:22:11',
      updatedAt: '2024-11-01 13:22:11'
    },
    {
      id: '150e8400-e29b-446655440034',
      name: '杨二车娜姆',
      gender: '女',
      age: 7,
      grade: '小学一年级',
      school: '深圳第一小学',
      parentName: '杨姆',
      phone: '13145156636',
      createdAt: '2024-11-01 11:22:11',
      updatedAt: '2024-11-01 11:22:11'
    }
  ]
  studentList.value = mockData
  total.value = mockData.length
}

onMounted(() => {
  fetchStudentList()
})

const handleSaveSuccess = () => {
  console.log('学生已成功保存，可以刷新列表了')
  // 在这里调用刷新列表的方法
  fetchStudentList()
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
}

.student-table {
  margin-bottom: 20px;
}

.student-table :deep(.el-table__cell) {
  text-align: center;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>
