<template>
  <el-config-provider :locale="zhCn">
    <div>
      <div class="header-container">
        <el-input
          v-model="searchQuery"
          placeholder="请输入学生姓名"
          class="student-search-input"
          clearable
          :prefix-icon="Search"
        >
        </el-input>
        <div class="project-filter">
          <span class="filter-label">项目名称</span>
          <el-select
            v-model="selectedProject"
            placeholder="请选择项目名称"
            style="width: 240px"
          >
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <el-table
        :data="stuProjectList"
        style="width: 100%"
        class="student-project-table"
      >
        <el-table-column prop="name" label="学生姓名" />
        <el-table-column prop="projectName" label="项目名称" width="280px" />
        <el-table-column prop="pushTime" label="提交时间" width="180px" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="primary" link @click="toDetails"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
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
import {
  ElConfigProvider,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElInput,
  ElIcon,
  ElOption,
  ElSelect
} from 'element-plus'
import {Search} from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'

const searchQuery = ref('')
const selectedProject = ref('')
const stuProjectList = ref<any[]>([])
const projectOptions = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const toDetails = () => {
  router.push('/project/student-details/project-details')
}
const fetchData = () => {
  const mockData = [
    {
      name: '宁一',
      projectName: 'L1-3 算法底层逻辑：从线性回归...',
      pushTime: '2024-11-02 13:22:11'
    },
    {
      name: '任消生',
      projectName: 'L1-3 算法底层逻辑：从线性回归...',
      pushTime: '2024-11-01 13:22:11'
    },
    {
      name: '欧阳奋强',
      projectName: 'L1-3 算法底层逻辑：从线性回归...',
      pushTime: '2024-11-02 13:20:11'
    },
    {
      name: '欧阳娜娜',
      projectName: 'L1-3 算法底层逻辑：从线性回归...',
      pushTime: '2024-11-01 13:22:11'
    },
    {
      name: '杨二车娜姆',
      projectName: 'L1-3 算法底层逻辑：从线性回归...',
      pushTime: '2024-11-01 11:22:11'
    }
  ]
  stuProjectList.value = mockData
  total.value = mockData.length

  projectOptions.value = [
    {value: 'proj1', label: 'L1-3 算法底层逻辑...'},
    {value: 'proj2', label: 'L1-2 监督学习 vs. 无监督学习'},
    {value: 'proj3', label: 'L1-1 人工智能的定义与演化'}
  ]
}

onMounted(() => {
  fetchData()
})
</script>
<style scoped>
.header-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 50px;
}
.student-search-input {
  width: 240px;
}
.project-filter {
  display: flex;
  align-items: center;
  gap: 10px;
}
.filter-label {
  font-size: 14px;
  color: #606266;
}
.student-project-table {
  margin-bottom: 20px;
}
.student-project-table :deep(th.el-table__cell) {
  background-color: #f6f9ff;
  text-align: left;
  padding-left: 12px;
}
.student-project-table :deep(td.el-table__cell) {
  text-align: left;
  padding-left: 12px;
}
.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>
