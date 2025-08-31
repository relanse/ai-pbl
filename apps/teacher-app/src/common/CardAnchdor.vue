<template>
  <el-card class="sequence-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span>项目序列</span>
      </div>
    </template>
    <div class="sequence-list">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="sequence-item"
        :class="{active: modelValue === item.id}"
        @click="handleItemClick(item.id)"
      >
        <div class="left-column">
          <div class="circle">{{ index + 1 }}</div>
          <div v-if="index < items.length - 1" class="line"></div>
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted} from 'vue'
import {ElCard} from 'element-plus'

// --- 类型定义 ---
interface SequenceItem {
  id: string | number
  title: string
}

interface Props {
  items: SequenceItem[]
  modelValue: string | number | null
  // 新增 props，用于配置滚动监听
  container?: string // 滚动容器的 CSS 选择器，默认为整个窗口
  offset?: number // 判断激活状态的顶部偏移量
}

// --- Props 和 Emits ---
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  modelValue: null,
  container: '', // 默认为空，代表 window
  offset: 120 // 默认判定线在距离视口顶部 120px 的位置
})

const emit = defineEmits(['update:modelValue'])

// --- 事件处理 ---
const handleItemClick = (id: string | number) => {
  // 点击时，通过 v-model 更新父组件的状态
  // 父组件监听到变化后，应负责将视图滚动到对应的元素
  emit('update:modelValue', id)
}

// --- 滚动监听核心逻辑 ---

// 自定义一个简单的节流函数，避免高频触发影响性能
function simpleThrottle(func: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: any[]) => {
    if (timeoutId) return
    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }
}

const handleScroll = () => {
  const threshold = props.offset
  let newActiveId: string | number | null = null

  // 从下往上遍历，第一个顶部在判定区域之上的元素就是当前激活的元素
  for (let i = props.items.length - 1; i >= 0; i--) {
    const item = props.items[i]
    // 约定父组件中的可滚动元素的 id 格式为 `block-${item.id}`
    const element = document.getElementById(`block-${item.id}`)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= threshold) {
        newActiveId = item.id
        break // 找到后立即跳出循环
      }
    }
  }

  // 如果所有元素都在判定线以下（例如滚动到页面最顶部），则激活第一个
  if (newActiveId === null && props.items.length > 0) {
    newActiveId = props.items[0].id
  }

  // 只有当计算出的激活 ID 与当前 v-model 的值不同时，才触发更新
  if (props.modelValue !== newActiveId && newActiveId !== null) {
    emit('update:modelValue', newActiveId)
  }
}

// 创建节流后的滚动处理函数
const throttledScrollHandler = simpleThrottle(handleScroll, 100)

// --- 生命周期钩子 ---
onMounted(() => {
  // 根据 container prop 获取滚动容器，默认为 window
  const scrollContainer = props.container
    ? document.querySelector(props.container)
    : window
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', throttledScrollHandler)
    // 组件挂载后立即执行一次，以设置初始的正确高亮状态
    handleScroll()
  }
})

onUnmounted(() => {
  // 组件卸载时移除监听，防止内存泄漏
  const scrollContainer = props.container
    ? document.querySelector(props.container)
    : window
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', throttledScrollHandler)
  }
})
</script>

<style scoped>
.sequence-card {
  border-radius: 12px;
  border: 1px solid #e4e7ed;
}

.card-header {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  text-align: center;
}

.sequence-list {
  display: flex;
  flex-direction: column;
}

.sequence-item {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.sequence-item:hover .title {
  color: #409eff;
}

.left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
}

.circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;
  /* Default state */
  background-color: #ffffff;
  border: 1px solid #dcdfe6;
  color: #909399;
}

.line {
  width: 1px;
  height: 30px; /* Adjust height to control spacing */
  background-color: #dcdfe6;
  margin-top: 4px;
  margin-bottom: 4px;
}

.title {
  font-size: 15px;
  color: #909399;
  line-height: 28px; /* Align with circle height */
  transition: color 0.2s ease-in-out;
}

/* Active state styles */
.sequence-item.active .circle {
  background-color: #409eff;
  border-color: #409eff;
  color: #ffffff;
}

.sequence-item.active .title {
  color: #303133;
  font-weight: 600;
}
</style>
