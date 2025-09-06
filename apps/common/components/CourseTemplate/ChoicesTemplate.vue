<template>
  <div class="choices-question-wrappper">
    <!-- 顶部提示 -->
    <div class="robot-prompt">
      <EditableText :is-editing="isEditing" v-model="data.prompt" />
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <span style="font-size: 32px; font-weight: bold; padding: 10px"
        >知识检测</span
      >
      <div class="choices-question-info">
        <EditableText
          :is-editing="props.isEditing"
          v-model="data.title"
          :text-style="{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333333'
          }"
        />
        <EditableText
          :is-editing="props.isEditing"
          v-model="data.subtitle"
          :text-style="{fontSize: '16px', color: '#666666'}"
        />
      </div>

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
    </div>
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
import {ElInput, ElRadio, ElRadioGroup, ElMessage} from 'element-plus'
import MyButton from '../../../student-app/src/components/common/MyButton.vue'
import type {PropType} from 'vue'
import EditableText from '../EditableText.vue'
import RobotImg from '../../assets/robot.png'

// Defines the structure for a question
interface Question {
  prompt: string
  title: string
  subtitle: string
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
    subtitle: '根据刚才学习的内容选择答案',
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
.choices-question-wrappper {
  height: 100%;
  background-color: #f0f8ff;
  border-radius: 20px;
  padding: 24px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.robot-prompt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.main-content {
  flex-grow: 1;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.choices-question-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  font-size: 20px;
  background-color: #f9fafb;
  border-radius: 10px;
}
.choices-question-info :deep(.editable-text-wrapper) {
  width: fit-content;
}
.choices-option {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.choices-option-item {
  width: 95%;
  margin: 0px !important;
  padding: 15px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
}
.choices-option-item:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}
.choices-option-item.is-checked {
  border-color: #409eff;
  background-color: #ecf5ff;
}
.edit-options-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.edit-option-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
}
.edit-option-item.is-correct-answer {
  border-color: #409eff;
  background-color: #ecf5ff;
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
