<template>
  <div class="choices-question-wrapper">
    <!-- TODO:小机器人的组件，等sbj上传 -->
    <div class="robot-prompt"><MyButton /></div>

    <!-- 主内容区 -->
    <el-card class="choices-question-card" shadow="never">
      <template #header>
        <EditableText
          :is-editing="props.isEditing"
          v-model="data.title"
          :text-style="{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333333'
          }"
        />
      </template>
      <!-- Display Mode -->
      <ElRadioGroup
        v-if="!props.isEditing"
        v-model="userAnswer"
        class="choices-option"
      >
        <ElRadio
          class="choices-option-item"
          v-for="option in data.options"
          :key="option.id"
          :label="option.id"
        >
          {{ option.id }}.{{ option.text }}
        </ElRadio>
      </ElRadioGroup>

      <!-- Edit Mode -->
      <div v-else class="edit-options-list">
        <div
          v-for="(option, index) in data.options"
          :key="index"
          class="edit-option-item"
          :class="{'is-correct-answer': data.correctAnswer === option.id}"
        >
          <ElRadio v-model="data.correctAnswer" :label="option.id">{{
            option.id
          }}</ElRadio>
          <ElInput v-model="option.text" placeholder="请输入选项内容" />
          <MyButton @click="removeOption(index)">删除</MyButton>
        </div>
        <MyButton @click="addOption" v-if="data.options.length < 4"
          >添加选项</MyButton
        >
      </div>
    </el-card>
    <!-- 提交按钮 -->
    <div class="footer">
      <MyButton v-if="!props.isEditing" class="submit-button"
        >提交答案</MyButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {ElInput, ElRadio, ElRadioGroup, ElMessage, ElCard} from 'element-plus'
import MyButton from '../../../student-app/src/components/common/MyButton.vue'
import type {PropType} from 'vue'
import EditableText from '../EditableText.vue'

// Defines the structure for a question
interface Question {
  prompt: string
  title: string
  options: {id: string; text: string}[]
  correctAnswer: string
}

// This allows the component to be used with v-model:data
const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false
  }
})

const data = defineModel('data', {
  type: Object as PropType<Question>,
  default: () => ({
    prompt: '请你仔细阅读题目，选出你认为最合适的答案。',
    title: '下面哪个最准确地描述了人工智能？',
    options: [
      {id: 'A', text: '能够和人类一样思考和学习的计算机程序'},
      {id: 'B', text: '只能执行预设指令的机器人'},
      {id: 'C', text: '一种新型的手机应用程序'}
    ],
    correctAnswer: 'A'
  })
})

const userAnswer = ref('')

// --- Edit Mode Functions (operate on data) ---
const addOption = () => {
  if (!data.value) return
  const newOptionId = String.fromCharCode(65 + data.value.options.length)
  data.value.options.push({
    id: newOptionId,
    text: ''
  })
}

const removeOption = (index: number) => {
  if (!data.value) return
  if (data.value.options.length <= 2) {
    ElMessage.error('至少保留两个选项')
    return
  }
  data.value.options.splice(index, 1)
  // Re-calculate IDs
  data.value.options.forEach((option, i) => {
    option.id = String.fromCharCode(65 + i)
  })
}
</script>

<style scoped>
.choices-question-wrapper {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.choices-question-card {
  width: 95%;
  border-radius: 32px;
  border: 5px solid #649ffe;
}
.choices-question-card :deep(.el-card__header) {
  background-color: #649ffe;
  border-bottom: none;
}
.editable-text-wrapper {
  cursor: text;
  width: 100%;
  height: 100%;
  font-family: 'HuXiaoBo-NanShen';
  font-size: 32px;
  color: #ffffff;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.submit-button {
  width: 150px;
  height: 50px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
}
</style>
