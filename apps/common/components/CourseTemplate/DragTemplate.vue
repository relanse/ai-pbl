<template>
  <div class="drag-template-container">
    <RobotPrompt v-model="data.prompt" />
    <div class="template-card">
      <div class="template-card-header">
        <EditableText
          :is-editing="isEdit"
          v-model="data.title"
          style="
            position: absolute;
            top: 5%;
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
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject, computed, onMounted, watch} from 'vue'
import backgroundSun from '../../assets/backgrounds/backgroundSun.png'
import MyButton from '../../../student-app/src/components/common/MyButton.vue'
import EditableText from './EditableText.vue'
import RobotPrompt from './RobotPrompt.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
import {getTemplateDefaultData} from './templateDefaults'
import {CourseDragType, CourseDataType} from './type'
import {v4 as uuidv4} from 'uuid'
const {isEdit, courseData, selectedPageIndex} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const data = computed({
  get: () => {
    if (selectedPageIndex.value !== null) {
      return courseData.value.pages[selectedPageIndex.value]
        .data as CourseDragType
    }
    return getTemplateDefaultData('drag') as CourseDragType
  },
  set: val => {
    if (selectedPageIndex.value !== null) {
      courseData.value.pages[selectedPageIndex.value].data = val
    }
  }
})
</script>

<style scoped>
.template-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
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
}
</style>
