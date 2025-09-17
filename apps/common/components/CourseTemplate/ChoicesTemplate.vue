<template>
  <div class="choices-wrapper">
    <RobotPrompt v-model="data.prompt" />
    <!-- 主内容区 -->
    <div class="template-card">
      <div
        class="template-card-header"
        :style="{backgroundImage: `url(${backgroundTemplate})`}"
      >
        <EditableText
          :is-editing="isEdit"
          v-model="data.title"
          style="
            height: 100px;
            width: 70%;
            color: #ffffff;
            font-size: clamp(18px, 3vw, 28px);
          "
        />
      </div>
      <div class="template-card-body">
        <EditableImage
          v-model="data.img"
          style="
            width: clamp(20px, 15vw, 300px);
            height: clamp(20px, 15vw, 300px);
          "
        />
        <div class="template-card-options">
          <!-- Display Mode -->
          <ElRadioGroup
            v-if="!isEdit"
            v-model="userAnswer"
            class="choices-options"
          >
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
      </div>
    </div>
    <!-- 提交按钮 -->
    <div
      class="template-card-footer"
      :style="{backgroundImage: `url(${backgroundFooter})`}"
    >
      <MyButton v-if="!isEdit" @click="checkAnswer" class="submit-button"
        >提交答案</MyButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject} from 'vue'
import {ElInput, ElRadio, ElRadioGroup, ElMessage} from 'element-plus'
import backgroundFooter from '../../assets/backgrounds/backgroundFooter.png'
import backgroundTemplate from '../../assets/backgrounds/backgroundTemplate.svg'
import MyButton from './components/MyButton.vue'
import EditableText from './components/EditableText.vue'
import RobotPrompt from './components/RobotPrompt.vue'
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
.choices-wrapper {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
}
.template-card {
  display: flex;
  flex-direction: column;
  width: 95%;
  border-radius: 32px;
  flex: 1 1 400px;
  border: 5px solid transparent;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(180deg, #6697ff 0%, #64a3fe 100%);
  overflow: hidden;
}
.template-card-header {
  height: 25%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-around;
  background-size: cover; /* 让背景图等比缩放，完全覆盖容器 */
  background-position: right; /* 将背景图居中显示 */
  background-repeat: no-repeat;
}
.template-card-body {
  width: 100%;
  height: 75%; /* 占据大部分高度 */
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around; /* 优化布局 */
}
.template-card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96%;
  border-radius: 32px;
  background-size: 100% 100%; /* 完全拉伸背景图 */
  background-repeat: no-repeat;
  height: 90px;
  border: 1px solid #ffffff;
  background-color: #e7f0ff;
}
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
</style>
