<template>
  <el-card style="max-width: 70%">
    <template #header>
      <div class="card-header">
        <div class="header-left">
          <span>题型</span>
          <el-select
            v-model="selectedType"
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-button link size="large" type="primary">删除</el-button>
      </div>
    </template>
    <div class="card-main">
      <component :is="currentComponent"></component>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {ElSelect, ElOption, ElButton, ElCard} from 'element-plus'

// 导入所有可能的表单组件
import LargeLanguageModelForm from './LargeLanguageModelForm.vue'
import FileForm from './FileForm.vue'
import MultipleChoiceForm from './MultipleChoiceForm.vue'
import PlainTextForm from './PlainTextForm.vue'

// 2. 创建一个题型值到组件的映射
const componentMap = {
  llm: LargeLanguageModelForm,
  file: FileForm,
  choice: MultipleChoiceForm,
  text: PlainTextForm
}
type QuestionType = keyof typeof componentMap

// 1. 定义题型选项
const selectedType = ref<QuestionType>('llm')
const options = [
  {value: 'llm', label: '大语言对话'},
  {value: 'file', label: '文件'},
  {value: 'choice', label: '选择题'},
  {value: 'text', label: '纯文本'}
]
const currentComponent = computed(() => componentMap[selectedType.value])
</script>

<style scoped>
/* 自定义卡片头部的样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f9fa;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* 覆盖 el-card 默认的头部内边距，使其更紧凑 */
.question-card :deep(.el-card__header) {
  background-color: #d4d6d9; /* <-- 在这里修改为你想要的颜色 */
}
</style>
