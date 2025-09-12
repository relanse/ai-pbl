<template>
  <div class="template-container">
    <RobotPrompt v-model="data.prompt" />
    <div class="template-card">
      <div class="template-card-content">
        <EditableText v-model="data.title" :is-editing="isEdit">
          <span
            style="
              font-family: Microsoft YaHei;
              font-weight: 700;
              font-style: Bold;
              font-size: 20px;
              line-height: 100%;
              letter-spacing: 0%;
            "
            >{{ data.title }}</span
          >
        </EditableText>
        <div class="express-textarea">
          <ElInput
            v-if="!isEdit"
            v-model="data.textareaInput"
            type="textarea"
            :placeholder="data.textareaExample"
          />
          <EditableText
            v-else
            v-model="data.textareaExample"
            :is-editing="isEdit"
            :textarea="true"
            style="
              margin-top: 10px;
              border-radius: 20px;
              border: 1px solid #6697ff;
              height: 100%;
              resize: none;
            "
          />
        </div>
      </div>
      <div class="express-ai-container">
        <VerticalButton
          v-model="data.category"
          style="
            background: linear-gradient(
              92.56deg,
              #6696ff 1.43%,
              #63a2fd 93.64%
            );
          "
        >
          <EditableText v-model="data.category" />
        </VerticalButton>
        <div
          class="express-ai-cards"
          style="
            display: flex;
            flex: auto;
            gap: 16px;
            justify-content: space-around;
            align-items: center;
          "
        >
          <div
            class="express-ai-card"
            v-for="(item, index) in data.cards"
            :key="index"
          >
            <EditableImage
              v-model="item.icon"
              :is-editing="isEdit"
              style="height: 50px; width: 50px"
            />
            <EditableText
              v-model="item.name"
              :is-editing="isEdit"
              style="
                font-family: Microsoft YaHei;
                font-weight: 400;
                font-style: Regular;
                font-size: 16px;
                line-height: 100%;
                letter-spacing: 0%;
              "
            />
          </div>
          <MyButton
            v-if="isEdit && data.cards.length < 5"
            @click="addCard"
            style="width: 50px"
            >添加</MyButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject} from 'vue'
import RobotPrompt from './RobotPrompt.vue'
import EditableText from './EditableText.vue'
import MyButton from './../MyButton.vue'
import {ElInput} from 'element-plus'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
import {getTemplateDefaultData} from './templateDefaults'
import {CourseExpressType} from './type'
import VerticalButton from './VerticalButton.vue'
import EditableImage from './EditableImage.vue'
import {v4 as uuidv4} from 'uuid'
const {isEdit, courseData, selectedPageIndex} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const data = computed({
  get: () => {
    if (selectedPageIndex.value !== null) {
      return courseData.value.pages[selectedPageIndex.value]
        .data as CourseExpressType
    }
    return getTemplateDefaultData('express') as CourseExpressType
  },
  set: val => {
    if (selectedPageIndex.value !== null) {
      courseData.value.pages[selectedPageIndex.value].data = val
    }
  }
})

const addCard = () => {
  data.value.cards.push({
    id: uuidv4(),
    icon: '',
    name: 'AI工具'
  })
}
</script>

<style scoped>
.template-container {
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
  aspect-ratio: 1.85/1;
  border: 5px solid #649ffe;
}
.template-card-content {
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  height: 60%;
  padding: 20px;
}
.express-textarea {
  flex-grow: 1; /* 让这个 div 占据所有剩余的垂直空间 */
  display: flex; /* 自身也成为 flex 容器 */
}
.express-textarea :deep(.el-textarea__inner) {
  margin-top: 10px;
  border-radius: 20px;
  border: 1px solid #6697ff;
  height: 100%;
  resize: none; /* 禁止用户手动调整大小 */
}
.express-ai-container {
  display: flex;
  width: calc(100% - 40px);
  flex: auto;
  padding: 20px;
}
.express-ai-card {
  display: flex;
  flex-direction: column;
  border-radius: 29px;
  width: 140px;
  aspect-ratio: 14/ 11;
  align-items: center;
  justify-content: center;
  background-color: #e7f0ff;
}
.express-ai-card :deep(.display-text) {
  margin-bottom: -5px;
  text-align: center;
}
</style>
