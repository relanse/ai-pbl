<template>
  <el-card class="custom-card" shadow="never">
    <template #header>
      <div class="card-header">
        <div class="header-left">
          <span>题型</span>
          <el-select
            v-model="questionType"
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option
              v-for="item in QUESTION_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-button link size="large" type="primary" @click="$emit('delete')"
          >删除</el-button
        >
      </div>
    </template>
    <div class="card-main">
      <!-- 使用 Suspense 来处理异步组件加载时的过渡状态 -->
      <Suspense>
        <component :is="currentComponent" />
        <template #fallback>
          <div>加载中...</div>
        </template>
      </Suspense>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {computed, defineAsyncComponent} from 'vue'
import {ElSelect, ElOption, ElButton, ElCard} from 'element-plus'

// --- 优化 1: 使用异步组件实现懒加载 ---
const COMPONENT_MAP = {
  llm: defineAsyncComponent(() => import('./LargeLanguageModelForm.vue')),
  file: defineAsyncComponent(() => import('./FileForm.vue')),
  choice: defineAsyncComponent(() => import('./MultipleChoiceForm.vue')),
  text: defineAsyncComponent(() => import('./PlainTextForm.vue'))
}

// --- 优化 2: 将静态常量移到 setup 外或使用大写命名以区分 ---
const QUESTION_OPTIONS = [
  {value: 'llm', label: '大语言对话'},
  {value: 'file', label: '文件'},
  {value: 'choice', label: '选择题'},
  {value: 'text', label: '纯文本'}
]

// --- Props 和 Emits 定义 ---
const props = defineProps<{
  type: string
}>()
const emit = defineEmits(['delete', 'update:type'])

// --- 响应式逻辑 ---
const questionType = computed({
  get() {
    return props.type
  },
  set(newValue: string) {
    emit('update:type', newValue)
  }
})

const currentComponent = computed(() => COMPONENT_MAP[questionType.value as keyof typeof COMPONENT_MAP])
</script>

<style scoped>
.custom-card {
  width: 100%;
  border: 1px solid #e4e7ed;
}

/* --- 优化 3: 清理并合并样式规则 --- */
.custom-card :deep(.el-card__header) {
  background-color: #f7f9fa;
  padding: 12px 20px; /* 统一内边距 */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-main {
  padding: 10px; /* 给内容区域一些内边距，避免紧贴边缘 */
}
</style>
