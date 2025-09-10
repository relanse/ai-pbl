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
              class="drag-target-targets-dropzone"
              :class="{shake: feedbackState[target.id] === 'incorrect'}"
              v-for="target in data.targets"
              :key="target.id"
              @dragover="onDragOver($event, target)"
              @dragleave="onDragLeave(target)"
              @drop="onDrop($event, target)"
            >
              <div
                class="drag-target-targets"
                :class="feedbackState[target.id]"
              >
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
              <!-- 显示已拖入的项 -->
              <div
                v-for="(item, index) in targetsContainer[target.id]"
                :key="item.id"
                class="dropped-item"
                :style="{
                  position: 'absolute',
                  backgroundColor: item.color,
                  left: `calc(${20 + index * 80}px)`,
                  top: `calc(30px + ${Math.floor(index / 3) * 30}px)`
                }"
              >
                <EditableText
                  :is-editing="isEdit"
                  v-model="item.title"
                ></EditableText>
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
            <div
              class="drag-items"
              v-for="item in availableItems"
              :key="item.id"
            >
              <div
                class="drag-items-item-background"
                :draggable="!isEdit ? true : false"
                :style="{backgroundColor: item.color}"
                @dragstart="onDragStart($event, item)"
                @dragend="onDragEnd"
              ></div>
              <div
                style="
                  font-family: Microsoft YaHei;
                  font-weight: 700;
                  font-style: Bold;
                  font-size: 18px;
                  line-height: 100%;
                  letter-spacing: 0%;
                "
              >
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
    <div
      class="template-card-footer"
      v-if="isEdit"
      style="display: flex; width: 100px; height: 50px"
    >
      <MyButton
        @click="initializeState"
        style="width: 100px; height: 40px; font-size: medium"
        >重置</MyButton
      >
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
import {CourseDragType} from './type'
import MyButton from '../../../student-app/src/components/common/MyButton.vue'

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

// 拖拽变量
const draggedItem = ref<CourseDragType['items'][0] | null>(null)
const targetsContainer = ref<
  Record<string, CourseDragType['items'][0][] | null>
>({})
const feedbackState = ref<
  Record<string, 'correct' | 'incorrect' | 'over' | ''>
>({})
const availableItems = computed(() => {
  const placedItemIds = new Set(
    Object.values(targetsContainer.value || {})
      .flat()
      .map(item => item?.id)
  )
  return data.value.items.filter(item => !placedItemIds.has(item.id))
})
//拖拽函数
//初始化状态
const initializeState = () => {
  targetsContainer.value = {}
  feedbackState.value = {}
  data.value.targets.forEach(target => {
    targetsContainer.value[target.id] = []
    feedbackState.value[target.id] = ''
  })
}
//监听data变化，重置状态
onMounted(() => {
  initializeState()
})
watch(() => data.value.title, initializeState)
//开始拖拽
function onDragStart(event: DragEvent, item: CourseDragType['items'][0]) {
  if (isEdit.value) return
  draggedItem.value = item
  event.dataTransfer!.effectAllowed = 'move'
  const target = event.target as HTMLElement
  const clone = target.cloneNode(true) as HTMLElement
  clone.classList.add('drag-ghost')
  document.body.appendChild(clone)
  event.dataTransfer!.setDragImage(
    clone,
    clone.offsetWidth / 2,
    clone.offsetHeight / 2
  )
  setTimeout(() => {
    ;(event.target as HTMLElement).classList.add('dragging')
  }, 0)
}
//拖拽over
function onDragOver(event: DragEvent, target: CourseDragType['targets'][0]) {
  if (isEdit.value) return
  event.preventDefault() // Important!
  feedbackState.value[target.id] = 'over'
}

function onDragLeave(target: CourseDragType['targets'][0]) {
  if (feedbackState.value[target.id] === 'over') {
    feedbackState.value[target.id] = ''
  }
}
//扔下
function onDrop(event: DragEvent, target: CourseDragType['targets'][0]) {
  event.preventDefault()
  if (isEdit.value || !draggedItem.value) {
    return
  }
  const currentItem = draggedItem.value
  const targetArray = targetsContainer.value[target.id]!
  // 检查是否已存在
  const isAlreadyIn = targetArray.some(item => item.id === currentItem.id)
  if (target.correctItems.includes(currentItem.title) && !isAlreadyIn) {
    targetArray.push(currentItem)
    feedbackState.value[target.id] = 'correct'
  } else {
    feedbackState.value[target.id] = 'incorrect'
  }

  // 1秒后清除反馈状态
  setTimeout(() => {
    if (
      feedbackState.value[target.id] === 'correct' ||
      feedbackState.value[target.id] === 'incorrect'
    ) {
      feedbackState.value[target.id] = ''
    }
  }, 1000)
}
//结束拖拽
function onDragEnd(event: DragEvent) {
  const el = event.target as HTMLElement
  if (el.classList.contains('dragging')) {
    el.classList.remove('dragging')
    draggedItem.value = null
  }
}
</script>

<style scoped>
.drag-template-container {
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
  width: 85%;
  justify-content: center;
  overflow-x: auto;
  flex-wrap: wrap;
}
.drag-target-targets-dropzone {
  position: relative;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  background-color: #f3f7ff;
  padding: clamp(10px, 1vw, 16px);
  border-radius: 29px;
}
.dropped-item {
  padding: 8px 16px;
  color: white;
  border-radius: 29px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
}
.vertical-button :deep(.display-text) {
  padding: 16px 12px 16px 12px;
}
.drag-target-targets {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f7ff;
  padding: clamp(30px, 3vw, 48px);
  border-radius: 29px;
  border: 2px dashed #b1cffe;
  transition: border-color 0.3s ease;
}

.drag-target-targets.over {
  border-color: #649ffe;
}

.drag-target-targets.correct {
  border-color: #4caf50; /* Green */
}

.drag-target-targets.incorrect {
  border-color: #f44336; /* Red */
}
.drag-item-items-container {
  display: flex;
  gap: 10px;
  width: 85%;
  justify-content: center;
  overflow-x: auto;
  flex-wrap: wrap;
}
.drag-item {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
}
.drag-items {
  display: flex;
  flex-direction: column;
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
.drag-items-item-background {
  width: clamp(100px, 10vw, 150px);
  aspect-ratio: 3/2;
  border-radius: 29px;
  position: relative;
  overflow: hidden;
}
.drag-items-item-background::after {
  content: '';
  position: absolute;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #ffffff 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  opacity: 0.4;
  width: clamp(50px, 8vw, 100px);
  aspect-ratio: 1/1;
  border-radius: 50%;
  top: clamp(-30px, -3vw, -45px);
  left: clamp(40px, 4vw, 60px);
}
drag-ghost {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-100%, -100%); /* 将元素完全移出屏幕外 */
  pointer-events: none; /* 确保这个克隆体不会干扰任何鼠标事件 */
}

/* 关键一步：移除克隆体上的伪元素 */
.drag-ghost::after {
  display: none !important;
}

.drag-items-item-background.dragging {
  opacity: 0;
  pointer-events: none;
}
.drag-items.dragging {
  opacity: 0;
  pointer-events: none;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.shake {
  animation: shake 0.5s ease-in-out;
}
</style>
