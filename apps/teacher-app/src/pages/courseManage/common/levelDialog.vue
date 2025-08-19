<template>
  <el-dialog
    :model-value="visible"
    width="648px"
    @update:model-value="$emit('update:visible', $event)"
    @open="onDialogOpen"
  >
    <template #header>
      <div class="title">
        <span>选择等级课程</span>
      </div>
    </template>
    <el-button
      tpye="primary"
      @click="createLevelCourseDialog = true"
      class="create-btn"
    >
      新建等级课程</el-button
    >
    <!-- 用于显示课程等级的表格 -->
    <el-table
      ref="tableRef"
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="0" />
      <el-table-column prop="name" label="项目名称" align="center" />
      <el-table-column label="操作" width="100" align="center">
        <template #default="scope">
          <el-button type="primary" link @click="handleModify(scope.row)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗底部的按钮区域 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// 导入必要的组件和函数
import {ElDialog, ElButton, ElTable, ElTableColumn} from 'element-plus'
import type {ElTable as ElTableInstance} from 'element-plus'
import {ref, watch, nextTick} from 'vue'

// 定义组件的 props 和 emits
const props = defineProps<{
  visible: boolean
  initialSelectedId: string
}>()

const emit = defineEmits(['update:visible', 'confirm'])
const createLevelCourseDialog = ref(false)
// --- 组件内部状态 ---

// 1. 用于 el-table 组件的模板引用
const tableRef = ref<InstanceType<typeof ElTable>>()
// 2. 用于存储当前选中行对象的状态
const selectedRow = ref<any>(null)

// 表格的模拟数据
const tableData = ref([
  {id: 'l1-3', name: 'L1-3 算法底层逻辑：从线性回归xxxxxx到深度学习'},
  {id: 'l1-2', name: 'L1-2 监督学习 vs. 无监督学习'},
  {id: 'l1-1', name: 'L1-1 人工智能的定义与演化'},
  {id: 'l2-1', name: 'L2-1 神经网络的结构与训练原理'},
  {id: 'l2-2', name: 'L2-2 CNN：图像识别的核心引擎'}
])

// --- 逻辑与事件处理 ---

// 监听弹窗可见性的变化
watch(
  () => props.visible,
  newVal => {
    // 注意：设置初始选中项的主要逻辑现在位于 onDialogOpen 中
    // 保留此 watch 以备将来需要根据可见性变化执行其他逻辑
  }
)

/**
 * 处理表格的 selection-change 事件，以强制实现单选效果。
 * @param {Array} selection - el-table 返回的选中行数组。
 */
const handleSelectionChange = (selection: any[]) => {
  if (selection.length > 1) {
    const latestSelection = selection[selection.length - 1]
    tableRef.value?.clearSelection()
    tableRef.value?.toggleRowSelection(latestSelection, true)
    selectedRow.value = latestSelection
  } else {
    selectedRow.value = selection[0] || null
  }
}

/**
 * 当弹窗打开时，设置初始选中的行。
 */
const onDialogOpen = async () => {
  await nextTick() // 等待 DOM 更新完成
  tableRef.value?.clearSelection() // 清除之前的选中项

  if (props.initialSelectedId) {
    const initialRow = tableData.value.find(
      row => row.id === props.initialSelectedId
    )
    if (initialRow) {
      tableRef.value?.toggleRowSelection(initialRow, true)
      selectedRow.value = initialRow // 同时更新状态变量
    }
  }
}

/**
 * 当点击“确定”时，向父组件发送选中的数据。
 */
const handleConfirm = () => {
  if (selectedRow.value) {
    emit('confirm', selectedRow.value)
  }
  // 更好的做法是在父组件处理完 confirm 逻辑后关闭弹窗，
  // 但为简单起见，我们在这里直接关闭。
  emit('update:visible', false)
}

/**
 * “修改”操作的占位函数。
 */
const handleModify = (row: any) => {
  console.log('修改行:', row)
  // 在这里实现修改逻辑 (例如，打开另一个弹窗)
}

const createLevelCourse = () => {
  console.log('创建新的等级课程')
}
</script>

<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  border-bottom: 2px solid #eee;
}
.create-btn {
  margin-bottom: 15px;
  height: 40px;
  border-radius: 8px;
  background-color: #2262fb;
  /* 修改文字颜色 */
  --el-button-text-color: #ffffff;
  font-size: 16px;
}
/* 添加一些基本样式以美化外观 */
:deep(.el-table__header-wrapper th) {
  background-color: #f5f7fa;
}
</style>
