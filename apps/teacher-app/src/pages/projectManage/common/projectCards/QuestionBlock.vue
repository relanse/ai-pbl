<template>
  <div class="question-block">
    <div class="block-header">
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
      <el-button type="danger" link>删除</el-button>
    </div>
    <div class="block-main">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {ElSelect, ElOption, ElButton} from 'element-plus'

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

// 3. 创建一个计算属性，根据当前选中的题型返回对应的组件
const currentComponent = computed(() => componentMap[selectedType.value])
</script>

<style scoped>
/* 整个卡片块的样式 */
.question-block {
  border: 1px solid #dcdfe6; /* 添加边框 */
  border-radius: 8px; /* 添加圆角 */
  padding: 20px; /* 添加内边距 */
  margin-bottom: 20px; /* 和下一个卡片之间留出间距 */
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 添加轻微阴影 */
}

/* 头部样式 */
.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 垂直居中对齐 */
  padding-bottom: 20px; /* 头部和主体内容之间的间距 */
  border-bottom: 1px solid #e4e7ed; /* 添加分割线 */
  margin-bottom: 20px; /* 分割线和主体内容之间的间距 */
  background: #f7f9fa;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px; /* “题型”文字和下拉框之间的间距 */
}

/* 主体内容区域（用于放置表单） */
</style>
