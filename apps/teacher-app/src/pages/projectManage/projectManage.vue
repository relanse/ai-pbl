<template>
  <el-config-provider :locale="zhCn">
    <div>
      <div class="header-container">
        <el-input
          v-model="searchQuery"
          placeholder="请输入课程名称"
          class="search-input"
          clearable
          :prefix-icon="Search"
        />
        <div class="header-btn">
          <el-button type="default" @click="viewStudentProjects">
            <el-icon><Plus /></el-icon>
            <span>查看学生项目情况</span>
          </el-button>
          <el-button type="primary" @click="createProject">
            <el-icon><Plus /></el-icon>
            <span>新建项目</span>
          </el-button>
        </div>
      </div>

      <el-table :data="projectList" style="width: 100%" class="project-table">
        <el-table-column prop="id" label="项目ID" />
        <el-table-column prop="name" label="项目名称" width="280px" />
        <el-table-column prop="level" label="所属等级课程" />
        <el-table-column prop="total" label="答题人数">
          <template #default="scope">
            <el-button
              v-if="scope.row.total > 0"
              type="primary"
              link
              @click="handleViewDetails(scope.row)"
            >
              {{ scope.row.total }}
            </el-button>
            <span v-else>{{ scope.row.total }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" />
        <el-table-column prop="createTime" label="创建时间" width="160px" />
        <el-table-column prop="updateTime" label="最近编辑时间" width="160px" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
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
import {useRouter} from 'vue-router'
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

const router = useRouter()
const searchQuery = ref('')
const projectList = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const viewStudentProjects = () => {
  router.push('/project/student-details')
}
const createProject = () => {
  router.push('/project ')
}

const handleViewDetails = (project: any) => {
  router.push(`/project/student-details`)
}

const fetchCourseList = () => {
  const mockData = [
    {
      id: '446655441234',
      name: 'L1-3 算法底层逻辑：从线性回归...',
      level: 'L1 基础认知：AI入门',
      total: 1,
      creator: '超管12345',
      createTime: '2024-11-02 13:22:11',
      updateTime: '2024-11-02 13:22:11'
    },
    {
      id: '446655440130',
      name: 'L1-2 监督学习 vs. 无监督学习',
      level: 'L1 基础认知：AI入门',
      total: 2,
      creator: '超管12345',
      createTime: '2024-11-01 13:22:11',
      updateTime: '2024-11-01 13:22:11'
    },
    {
      id: '446655440010',
      name: 'L1-1 人工智能的定义与演化',
      level: 'L1 基础认知：AI入门',
      total: 13,
      creator: '超管12345',
      createTime: '2024-11-02 13:20:11',
      updateTime: '2024-11-02 13:20:11'
    },
    {
      id: '446655440011',
      name: 'L2-1 神经网络的结构与训练原理',
      level: 'L2 能力进阶：深度学习实战',
      total: 1,
      creator: '超管12345',
      createTime: '2024-11-01 13:22:11',
      updateTime: '2024-11-01 13:22:11'
    },
    {
      id: '446655440034',
      name: 'L2-2 CNN：图像识别的核心引擎',
      level: 'L2 能力进阶：深度学习实战',
      total: 0,
      creator: '超管12345',
      createTime: '2024-11-01 11:22:11',
      updateTime: '2024-11-01 11:22:11'
    }
  ]
  projectList.value = mockData
  total.value = mockData.length
}
onMounted(() => {
  fetchCourseList()
})
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header-btn {
  display: flex;
  gap: 15px;
}
.search-input {
  width: 300px;
}

.project-table {
  margin-bottom: 20px;
}

.project-table :deep(.el-table__cell) {
  text-align: center;
}
.project-table :deep(th.el-table__cell) {
  background-color: #f6f9ff;
}
.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>
