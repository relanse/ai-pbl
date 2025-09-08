<template>
  <div class="choices-wrapper">
    <!-- TODO:小机器人的组件，等sbj上传 -->
    <RobotPrompt v-model="data.prompt" />
    <!-- 主内容区 -->
    <div class="template-card">
      <div class="template-card-header">
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
        <img
          :src="backgroundSun"
          alt="Background Sun"
          style="position: absolute; bottom: 10px; right: 10px; width: 100px"
        />
      </div>
      <div class="template-card-body">
        <img :src="backgroundGirl" alt="Background Girl" />
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
              v-if="data.options.length < 4"
              style="width: 160px; height: 40px; font-size: medium"
              >添加选项</MyButton
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="template-card-footer">
      <MyButton v-if="!isEdit" class="submit-button">提交答案</MyButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject, computed} from 'vue'
import {ElInput, ElRadio, ElRadioGroup, ElMessage} from 'element-plus'
import backgroundGirl from '../../assets/backgrounds/backgroundGirl.png'
import backgroundSun from '../../assets/backgrounds/backgroundSun.png'
import MyButton from '../../../student-app/src/components/common/MyButton.vue'
import EditableText from './EditableText.vue'
import RobotPrompt from './RobotPrompt.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
import {getTemplateDefaultData} from './templateDefaults'
import {CourseChoicesType} from './type'
const {isEdit, courseData, selectedPageIndex} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const data = computed({
  get: () => {
    if (selectedPageIndex.value !== null) {
      return courseData.value.pages[selectedPageIndex.value]
        .data as CourseChoicesType
    }
    return getTemplateDefaultData('choices') as CourseChoicesType
  },
  set: val => {
    if (selectedPageIndex.value !== null) {
      courseData.value.pages[selectedPageIndex.value].data = val
    }
  }
})

const userAnswer = ref('')

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
</script>

<style scoped>
.choices-wrapper {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-sizing: border-box; /* 保证padding不会影响总宽度 */
}
.template-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-height: 600px;
  border-radius: 32px;
  aspect-ratio: 3 / 2;
  border: 5px solid #649ffe;
  overflow: hidden;
}
.template-card-header {
  height: 25%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #649ffe;
  box-sizing: border-box;
  justify-content: space-around;
}
.template-card-body {
  width: 100%;
  height: 75%; /* 占据大部分高度 */
  display: flex;
  align-items: center;
  justify-content: space-around; /* 优化布局 */
}
.template-card-body > img {
  width: 25%; /* 图片宽度相对于父容器 */
  height: auto; /* 高度自适应 */
  padding: 16px;
}
.template-card-options {
  background-color: #f4f8ff;
  width: 55%; /* 选项区域宽度 */
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
  gap: 15px;
}
.choices-options-item {
  display: flex;
  font-size: clamp(14px, 2vw, 20px);
  color: #333333;
}
.template-card-footer {
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
