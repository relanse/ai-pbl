<template>
  <div class="choices-question-wrappper">
    <ElCard class="choices-question-card" shadow="never">
      <template #header>
        <span style="font-size: 32px; font-weight: bold; padding: 10px"
          >知识检测</span
        >
        <div class="choices-question-info">
          <!-- Display Mode -->
          <template v-if="!props.isEditing">
            <span style="font-size: 24px; font-weight: bold; color: #333333">{{
              data.title
            }}</span>
            <span style="font-size: 16px; color: #666666">{{
              data.subtitle
            }}</span>
          </template>
          <!-- Edit Mode -->
          <template v-else>
            <ElInput v-model="editableData.title" placeholder="请输入主标题" />
            <ElInput
              v-model="editableData.subtitle"
              placeholder="请输入副标题"
            />
          </template>
        </div>
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
          v-for="(option, index) in editableData.options"
          :key="index"
          class="edit-option-item"
        >
          <ElRadio v-model="editableData.correctAnswer" :label="option.id">{{
            option.id
          }}</ElRadio>
          <ElInput v-model="option.text" placeholder="请输入选项内容" />
          <MyButton @click="removeOption(index)">删除</MyButton>
        </div>
        <MyButton @click="addOption" v-if="editableData.options.length < 4"
          >添加选项</MyButton
        >
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <MyButton v-if="!props.isEditing" class="submit-button"
          >提交答案</MyButton
        >
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, defineProps} from 'vue'
import {ElCard, ElInput, ElRadio, ElRadioGroup} from 'element-plus'
import MyButton from '../../../student-app/src/components/common/MyButton.vue'
import type {PropType} from 'vue'

// Defines the structure for a question
interface Question {
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

const editableData = ref<Question>(JSON.parse(JSON.stringify(data.value)))

// When edit mode is entered, create a fresh copy of the data
watch(
  () => props.isEditing,
  isEditingNow => {
    // [!code focus]
    if (isEditingNow) {
      editableData.value = JSON.parse(JSON.stringify(data.value))
    }
  },
  {immediate: true}
)
// --- END TEMPORARY ---

const userAnswer = ref('')

// --- Edit Mode Functions (operate on editableData) ---
const addOption = () => {
  if (!editableData.value) return
  const newOptionId = String.fromCharCode(
    65 + editableData.value.options.length
  )
  editableData.value.options.push({
    id: newOptionId,
    text: ''
  })
}

const removeOption = (index: number) => {
  if (!editableData.value) return
  editableData.value.options.splice(index, 1)
  // Re-calculate IDs
  editableData.value.options.forEach((option, i) => {
    option.id = String.fromCharCode(65 + i)
  })
}
</script>

<style scoped>
.choices-question-wrappper {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.choices-question-card {
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
}
.action-buttons {
  margin-top: 20px;
}
.submit-button {
  width: 120px;
  height: 51px;
  border-radius: 27px;
}
.choices-question-card :deep(.el-card__header) {
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
.choices-question-card :deep(.el-card__body) {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.choices-option {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.choices-option-item {
  width: 95%;
  margin: 0px;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
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
}
</style>
