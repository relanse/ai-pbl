<template>
  <div class="course-manage">
    <div class="course-manage-header">
      <el-input
        v-model="searchQuery"
        placeholder="请输入课程名称"
        class="search-input"
        clearable
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <MyIcon name="search" />
        </template>
      </el-input>

      <el-button
        type="primary"
        class="create-btn"
        @click="handleNavigateToCreate"
      >
        <template #icon>
          <MyIcon name="add" />
        </template>
        新建课程</el-button
      >
    </div>
    <!-- 课程列表展示区域 -->
    <div class="course-list">
      <!-- 这里可以放置课程列表组件 -->
      <el-table :data="courseTableData" style="width: 100%" justify="center">
        <!-- 将 width 修改为 min-width，Element Plus 会自动按比例分配宽度 -->
        <el-table-column prop="id" label="课程ID" min-width="137" />
        <el-table-column prop="name" label="课程名称" min-width="274" />
        <el-table-column prop="level" label="所属等级课程" min-width="225" />
        <el-table-column prop="type" label="上课类型" min-width="72" />
        <el-table-column prop="creator" label="创建人" min-width="90" />
        <el-table-column prop="createTime" label="创建时间" min-width="170" />
        <el-table-column
          prop="updateTime"
          label="最近编辑时间"
          min-width="170"
        />

        <!-- 操作列也使用 min-width -->
        <el-table-column label="操作" min-width="90">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive} from 'vue'
import {
  ElInput,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElMessageBox,
  ElMessage
} from 'element-plus'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import {useRouter} from 'vue-router'

interface Course {
  id: string
  name: string
  level: string
  type: string
  creator: string
  createTime: string
  updateTime: string
}

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const courseTableData = ref([
  {
    id: '446655441234',
    name: 'L1-3 算法底层逻辑：从线性回归...',
    level: 'L1 基础认知：AI入门',
    type: '录播',
    creator: '超管12345',
    createTime: '2024-11-02 13:22:11',
    updateTime: '2024-11-02 13:22:11'
  },
  {
    id: '446655440130',
    name: 'L1-2 监督学习 vs. 无监督学习',
    level: 'L1 基础认知：AI入门',
    type: '直播',
    creator: '超管12345',
    createTime: '2024-11-01 13:22:11',
    updateTime: '2024-11-01 13:22:11'
  },
  {
    id: '446655440010',
    name: 'L1-1 人工智能的定义与演化',
    level: 'L1 基础认知：AI入门',
    type: '录播',
    creator: '超管12345',
    createTime: '2024-11-02 13:20:11',
    updateTime: '2024-11-02 13:20:11'
  },
  {
    id: '446655440011',
    name: 'L2-1 神经网络的结构与训练原理',
    level: 'L2 能力进阶：深度学习实战',
    type: '录播',
    creator: '超管12345',
    createTime: '2024-11-01 13:22:11',
    updateTime: '2024-11-01 13:22:11'
  },
  {
    id: '446655440034',
    name: 'L2-2 CNN：图像识别的核心引擎',
    level: 'L2 能力进阶：深度学习实战',
    type: '录播',
    creator: '超管12345',
    createTime: '2024-11-01 11:22:11',
    updateTime: '2024-11-01 11:22:11'
  }
])
const router = useRouter()
const loading = ref(false) // 控制表格加载状态
const searchQuery = ref('')
// 点击搜索按钮
const handleSearch = () => {
  pagination.page = 1 // 搜索时，应回到第一页
  fetchData()
}
// 处理分页大小改变
const handleSizeChange = (newSize: number) => {
  pagination.pageSize = newSize
  fetchData()
}
// 处理当前页改变
const handleCurrentChange = (newPage: number) => {
  pagination.page = newPage
  fetchData()
}

const handleNavigateToCreate = () => {
  // 跳转到新增课程页面
  router.push('/course-manage/create')
}
// 点击“编辑”按钮的事件处理函数
const handleEdit = (row: Course) => {
  console.log('编辑课程:', row)
  // 在这里添加你的编辑逻辑，比如弹出一个对话框
}

// 点击“删除”按钮的事件处理函数
const handleDelete = (row: Course) => {
  ElMessageBox.confirm(`确定要删除课程 "${row.name}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      courseTableData.value = courseTableData.value.filter(c => c.id !== row.id)
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

/**
 * 核心：获取商品列表数据
 */
const fetchData = async () => {
  loading.value = true
  try {
    interface CourseListParams {
      page: number
      pageSize: number
      query?: string // 查询参数是可选的
    }
    // 构建将要发送给 API 的参数
    const params: CourseListParams = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      // 如果 searchQuery 有值，则传递它；否则，此参数将被忽略
      query: searchQuery.value || undefined
    }
    // 调用 (模拟的) API 函数
    // const res = await getCourseList(params); // <--- 在真实项目中，您会调用这个
    // const res = await mockGetCourseList(params) // <-- 我们用模拟函数来演示
    // 更新前端数据
    // courseTableData.value = res.list // 将表格数据设置为 API 返回的当前页列表
    // pagination.total = res.total // 更新总条目数以正确显示分页
  } catch (error) {
    console.error('获取课程列表失败:', error)
    ElMessage.error('数据加载失败，请稍后重试！')
  } finally {
    loading.value = false // 结束加载
  }
}
</script>

<style scoped>
.course-manage {
  padding: 0px;
}
.course-manage-header {
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.search-input {
  width: 350px;
  height: 34px; /* 在组件根元素上设置期望的高度 */
  border-radius: 10px;
}
.search-input :deep(.el-input__wrapper) {
  font-size: 16px; /* 调大字体以匹配图标大小 */
  height: 100%; /* 让内部 wrapper 继承父元素的高度 */
  border-radius: 10px; /* 保持圆角一致 */
  padding-left: 16px; /* 增加右侧空白 */
}
.search-input :deep(.el-input__icon) {
  font-size: 12px; /* 调整图标大小 */
}
.create-btn {
  width: 110 px;
  height: 34px;
  background: #2262fb;
  text-align: center;
  border-radius: 10px;
  font-size: 16px; /* 调大字体以匹配图标大小 */
  display: inline-flex; /* 使用 flex 布局以更好地对齐 */
  align-items: center; /* 垂直居中对齐图标和文字 */
  justify-content: center; /* 水平居中 */
}
.create-btn :deep(.el-input__icon) {
  font-size: 12px; /* 调整图标大小 */
}
.course-list :deep(.el-table .el-table__cell) {
  text-align: center; /* 水平居中 */
  vertical-align: middle; /* 垂直居中 */
  color: #333; /* 表头文字颜色更清晰 */
}
.course-list :deep(.el-table__header-wrapper th) {
  background-color: #f5f7fa;
}
.pagination-container {
  display: flex;
  justify-content: flex-end; /* 右对齐 */
  margin-top: 20px;
}
</style>
