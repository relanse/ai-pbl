<template>
  <el-dialog
    :model-value="visible"
    title="选择等级课程"
    width="768px"
    @update:model-value="$emit('update:visible', $event)"
  >
    <div class="level-list">
      <!-- 移除 el-radio-group -->
      <div
        v-for="level in courseLevels"
        :key="level.id"
        class="level-item"
        :class="{'is-selected': selectedLevelId === level.id}"
        @click="selectedLevelId = level.id"
      >
        <div class="level-info">
          <div class="level-title">{{ level.title }}</div>
          <div class="level-subtitle">{{ level.subtitle }}</div>
        </div>
        <!-- 添加对勾图标 -->
        <div v-if="selectedLevelId === level.id" class="checkmark-icon">
          <el-icon color="#409eff" :size="20"><Check /></el-icon>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ElDialog, ElButton, ElIcon} from 'element-plus' // 移除 Radio 相关组件
import {Check} from '@element-plus/icons-vue' // 引入 Check 图标
import {ref, watch} from 'vue'

// 定义组件的 props 和 emits
const props = defineProps<{
  visible: boolean
  initialSelectedId: string
}>()

const emit = defineEmits(['update:visible', 'confirm'])

// 弹窗内部使用的临时选中ID
const selectedLevelId = ref('')

// 模拟的课程等级数据
const courseLevels = ref([
  {id: 'l1', title: 'L1 基础认知', subtitle: 'AI入门'},
  {id: 'l2', title: 'L2 进阶应用', subtitle: 'AI绘画与设计'},
  {id: 'l3', title: 'L3 高阶探索', subtitle: 'AI编程与自动化'}
])

// 监听 visible 属性，当弹窗打开时，同步父组件传入的选中ID
watch(
  () => props.visible,
  newVal => {
    if (newVal) {
      selectedLevelId.value = props.initialSelectedId
    }
  }
)

// 确认选择，发送事件给父组件
const handleConfirm = () => {
  const selectedLevel = courseLevels.value.find(
    level => level.id === selectedLevelId.value
  )
  if (selectedLevel) {
    emit('confirm', selectedLevel)
  }
  emit('update:visible', false) // 关闭弹窗
}
</script>

<style scoped></style>
