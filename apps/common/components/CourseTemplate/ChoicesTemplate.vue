<template>
  <BaseTemplate :robot-title="data.prompt">
    <template #header>
      <EditableText
        :is-editing="isEdit"
        :model-value="data.title"
        style="
          height: 100px;
          width: 70%;
          color: #ffffff;
          font-size: clamp(18px, 3vw, 28px);
        "
      />
    </template>
    <EditableImage
      v-model="data.img"
      style="width: clamp(20px, 15vw, 300px); height: clamp(20px, 15vw, 300px)"
    />
    <div class="template-card-options">
      <!-- Display Mode -->
      <ElRadioGroup v-if="!isEdit" v-model="userAnswer" class="choices-options">
        <ElRadio
          class="choices-options-item"
          v-for="option in data.options"
          :key="option.id"
          :label="option.id"
        >
          {{ option.id }}.{{ option.content }}
        </ElRadio>
      </ElRadioGroup>

      <!-- Edit Mode -->
      <div v-else class="choices-options">
        <div
          v-for="(option, index) in data.options"
          :key="index"
          class="choices-options-item"
          :class="{'is-correct-answer': data.correctAnswer === option.id}"
        >
          <ElRadio v-model="data.correctAnswer" :label="option.id">{{
            option.id
          }}</ElRadio>
          <ElInput v-model="option.content" placeholder="请输入选项内容" />
          <MyButton
            @click="removeOption(index)"
            style="width: 80px; height: 40px; font-size: medium"
            >删除</MyButton
          >
        </div>
        <MyButton
          @click="addOption"
          v-if="data.options.length < 6"
          style="width: 160px; height: 40px; font-size: medium"
          >添加选项</MyButton
        >
      </div>
    </div>
    <template #footer>
      <MyButton @click="checkAnswer" class="submit-button">提交答案</MyButton>
    </template>
  </BaseTemplate>
</template>

<script setup lang="ts">
import {ref, inject} from 'vue'
import {ElInput, ElRadio, ElRadioGroup, ElMessage} from 'element-plus'
import MyButton from './components/MyButton.vue'
import BaseTemplate from './components/BaseTemplate.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
const {isEdit} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
import {ChoiceTemplateType} from './type'
import {useCurrentPageData} from '../../composables/useCurrentPageData'
import EditableText from './components/EditableText.vue'
import EditableImage from './components/EditableImage.vue'
const {data} = useCurrentPageData<ChoiceTemplateType>('find')
const userAnswer = ref('')

// 定义事件
const emit = defineEmits<{
  answer: [
    answer: {userAnswer: string; isCorrect: boolean; correctAnswer: string}
  ]
  next: []
}>()

// --- Edit Mode Functions (operate on data) ---
const addOption = () => {
  if (!data.value) return
  const newOptionId = String.fromCharCode(65 + data.value.options.length)
  data.value.options.push({
    id: newOptionId,
    content: ''
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
const checkAnswer = () => {
  if (!data.value) return
  if (userAnswer.value === '') {
    ElMessage.warning('请选择一个答案')
    return
  }

  const isCorrect = userAnswer.value === data.value.correctAnswer

  // 触发答案事件，传递答案信息给父组件
  emit('answer', {
    userAnswer: userAnswer.value,
    isCorrect: isCorrect,
    correctAnswer: data.value.correctAnswer
  })

  if (isCorrect) {
    ElMessage.success('回答正确！')
    // 延迟1.5秒后自动跳转到下一题
    setTimeout(() => {
      emit('next')
    }, 1500)
  } else {
    ElMessage.error('回答错误，正确答案是: ' + data.value.correctAnswer)
  }
}
</script>

<style scoped>
.template-card-options {
  background-color: #f4f8ff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}
.choices-options {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}
.choices-options-item {
  display: flex;
  align-items: center;
  color: #333333;
}
.choices-options-item :deep(.el-radio) {
  margin-right: 10px;
}
.choices-options-item :deep(.el-radio-label) {
  font-size: clamp(14px, 2vw, 20px);
}
.submit-button {
  width: 150px;
  height: 50px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
}
.is-correct-answer {
  color: #67c23a;
  font-weight: bold;
}
</style>
