<template>
  <div class="drag-template-container">
    <RobotPrompt v-model="data.prompt" />
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
        <div class="drag-target">
          <VerticalButton
            ><EditableText
              :is-editing="isEdit"
              v-model="data.targetmean"
            ></EditableText
          ></VerticalButton>
          <div class="drag-target-targets-container">
            <div
              class="drag-target-targets-background"
              v-for="target in data.targets"
              :key="target.id"
            >
              <div class="drag-target-targets">
                <span
                  style="
                    font-family: Microsoft YaHei;
                    font-weight: 700;
                    font-style: Bold;
                    font-size: 18px;
                    line-height: 100%;
                    letter-spacing: 0%;
                    color: #316fef;
                  "
                  ><EditableText
                    :is-editing="isEdit"
                    v-model="target.title"
                  ></EditableText
                ></span>
                <span
                  style="
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 100%;
                    letter-spacing: 0%;
                    color: #7ea6f5;
                  "
                  ><EditableText>{{ target.subtitle }}</EditableText></span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="drag-item">
          <VerticalButton
            ><EditableText
              :is-editing="isEdit"
              v-model="data.itemmean"
            ></EditableText
          ></VerticalButton>
          <div class="drag-item-items-container">
            <div class="drag-items" v-for="item in data.items" :key="item.id">
              <div class="drag-items-item-background"></div>
              <div class="drag-items-item-text">
                <EditableText
                  :is-editing="isEdit"
                  v-model="item.title"
                ></EditableText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject, computed, onMounted, watch} from 'vue'
import backgroundSun from '../../assets/backgrounds/backgroundSun.png'
import VerticalButton from './VerticalButton.vue'
import EditableText from './EditableText.vue'
import RobotPrompt from './RobotPrompt.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
import {getTemplateDefaultData} from './templateDefaults'
import {CourseDragType, CourseDataType} from './type'
import draggable from 'vuedraggable'

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
  flex-direction: column;
  position: relative;
}
.drag-target {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
}
.drag-target-targets-container {
  display: flex;
  gap: 20px;
  width: 70%;
  justify-content: center;
  overflow-x: auto;
}
.drag-target-targets-background {
  display: flex;
  background-color: #f3f7ff;
  padding: clamp(10px, 1vw, 16px) clamp(10px, 1vw, 16px);
  border-radius: 29px;
}
.vertical-button :deep(.display-text) {
  padding: 16px 12px 16px 12px;
}
.drag-target-targets {
  display: flex;
  flex-direction: column;
  background-color: #f3f7ff;
  padding: clamp(30px, 3vw, 48px) clamp(30px, 3vw, 48px);
  border-radius: 29px;
  border: 2px dashed #b1cffe;
}
.drag-item {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.drag-items {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
}
.drag-items-item {
  background-color: #f3f7ff;
  padding: 1vw 2vw;
  border-radius: 20px;
  cursor: grab;
}
</style>
