<template>
  <div class="wrapped">
    <!-- 顶部机器人提示 -->
    <RobotPrompt v-model="data.prompt" />
    <!-- 外部带边框的容器 -->
    <div class="bordered-container">
      <!-- 卡片左右两侧标题 -->
      <div class="header">
        <EditableText class="title" v-model="data.leftColumn.title" />
        <EditableText class="title" v-model="data.rightColumn.title" />
      </div>

      <!-- 主内容区域，分为两栏 -->
      <div class="main-content">
        <!-- 左侧卡片 -->
        <div class="column">
          <div
            ref="leftCardRefs"
            v-for="(card, index) in data.leftColumn.cards"
            :key="card.id"
            class="card card-left"
            :data-leftid="card.id"
            @click="handleLeftClick(card.id)"
            :class="{'card-error': errorLeftId === card.id}"
            :style="{backgroundColor: card.color}"
          >
            <EditableImage class="card-icon" v-model="card.img" />
            <div class="card-text">
              <EditableText class="card-title" v-model="card.content" />
              <EditableText class="card-tag" v-model="card.tag" />
            </div>
            <el-button
              v-if="isEdit"
              @click="removeCard(index, data.rightColumn.cards[index].id)"
              class="delete-btn"
              type="danger"
              size="small"
              circle
              >-</el-button
            >
          </div>
        </div>

        <!-- 右侧卡片 -->
        <div class="column">
          <div
            ref="rightCardRefs"
            v-for="card in data.rightColumn.cards"
            :key="card.id"
            class="card card-right"
            :data-rightid="card.id"
            @click="handelRightClick(card.id)"
            :class="{'card-error': errorRightId === card.id}"
          >
            <EditableText class="card-title" v-model="card.content" />
          </div>
        </div>
      </div>

      <!-- 连线svg -->
      <svg class="rope-svg" width="100%" height="100%">
        >
        <!-- 编辑模式：渲染所有绳子 -->
        <template v-if="isEdit">
          <path
            v-for="lc in leftCardRefs"
            :key="lc.getAttribute('data-leftid')!"
            :d="
              getRopePath(
                lc.getAttribute('data-leftid')!,
                lc.getAttribute('data-leftid')!
              )
            "
            stroke="#409eff"
            :stroke-width="4"
            fill="none"
          />
        </template>
        <!-- 预览模式：渲染用户已连的绳子和正在拖动的绳子 -->
        <template v-else>
          <path
            stroke="#409eff"
            v-for="line in fixedLines"
            :key="line.leftId + '-' + line.rightId"
            :d="getRopePath(line.leftId, line.rightId)"
            :stroke-width="4"
            fill="none"
          />
          <!-- 拖动中的绳子 -->
          <path
            v-if="dragging"
            :d="getRopePath(dragStartLeftId, null, mousePos)"
            stroke="#e6a23c"
            stroke-width="4"
            fill="none"
          />
        </template>
      </svg>

      <!-- 底部同步增加按钮 -->
      <div
        v-if="isEdit && data.leftColumn.cards.length < 4"
        class="footer-container"
      >
        <el-button
          @click="addCard"
          class="add-btn"
          type="primary"
          plain
          :icon="Plus"
        >
          添加一组选项
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {nextTick} from 'vue'
import {ElButton} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import {computed, inject, ref} from 'vue'
import EditableText from './components/EditableText.vue'
import EditableImage from './components/EditableImage.vue'
import RobotPrompt from './components/RobotPrompt.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
import {getTemplateDefaultData} from './templateDefaults'
import {CourseConnectionType} from './type'
import {v4 as uuidv4} from 'uuid'
const {isEdit, courseData, selectedPageIndex} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const data = computed({
  get: () => {
    if (selectedPageIndex.value !== null) {
      return courseData.value.pages[selectedPageIndex.value]
        .data as CourseConnectionType
    }
    return getTemplateDefaultData('connection') as CourseConnectionType
  },
  set: val => {
    if (selectedPageIndex.value !== null) {
      courseData.value.pages[selectedPageIndex.value].data = val
    }
  }
})

// --- 颜色循环数组 ---
const cardColors = ['#a0c4ff', '#ffd6a0', '#b2f7b2', '#d8b4fe']
// 绳子动画交互逻辑
const fixedLines = ref<{leftId: string; rightId: string}[]>([])
const leftCardRefs = ref<HTMLDivElement[]>()
const rightCardRefs = ref<HTMLDivElement[]>()
const dragging = ref(false)
const dragStartLeftId = ref<string | null>(null)
const mousePos = ref({x: 0, y: 0})
const errorLeftId = ref<string | null>(null)
const errorRightId = ref<string | null>(null)

const onMouseMove = (e: MouseEvent) => {
  mousePos.value = {x: e.clientX, y: e.clientY}
}
const handleLeftClick = (leftId: string) => {
  if (!isEdit.value) {
    dragging.value = true
    dragStartLeftId.value = leftId
    window.addEventListener('mousemove', onMouseMove)
  }
}
const handelRightClick = (rightId: string) => {
  if (dragging.value && dragStartLeftId.value) {
    if (dragStartLeftId.value == rightId) {
      fixedLines.value.push({leftId: dragStartLeftId.value, rightId: rightId})
    } else {
      errorLeftId.value = dragStartLeftId.value
      errorRightId.value = rightId
      setTimeout(() => {
        errorLeftId.value = null
        errorRightId.value = null
      }, 1200)
    }
  }
  dragging.value = false
  dragStartLeftId.value = null
  window.removeEventListener('mousemove', onMouseMove)
}

const getRopePath = (
  leftId: string | null,
  rightId: string | null,
  mouse?: {x: number; y: number}
) => {
  const leftEl = document.querySelector(`[data-leftid="${leftId}"]`)
  const rightEl = rightId
    ? document.querySelector(`[data-rightid="${rightId}"]`)
    : null
  const svgRect = document.querySelector('.rope-svg')?.getBoundingClientRect()
  if (!leftEl || !svgRect) return ''
  const leftRect = leftEl.getBoundingClientRect()
  const x1 = leftRect.right - svgRect.left
  const y1 = leftRect.top + leftRect.height / 2 - svgRect.top
  let x2, y2
  if (rightEl) {
    const rightRect = rightEl.getBoundingClientRect()
    x2 = rightRect.left - svgRect.left
    y2 = rightRect.top + rightRect.height / 2 - svgRect.top
  } else if (mouse) {
    x2 = mouse.x - svgRect.left
    y2 = mouse.y - svgRect.top
  } else {
    return ''
  }
  // 只画一条直线
  return `M${x1},${y1} L${x2},${y2}`
}

// --- 添加/删除卡片的逻辑 ---
const addCard = () => {
  // 根据当前卡片数量决定下一个颜色
  const nextColorIndex = data.value.leftColumn.cards.length % cardColors.length
  const newColor = cardColors[nextColorIndex]
  const newId = uuidv4()
  const newLeftCard = {
    id: newId,
    content: '新选项',
    tag: '新标签',
    img: '',
    color: newColor
  }
  const newRightCard = {
    id: newId,
    content: '新答案'
  }
  data.value.leftColumn.cards.push(newLeftCard)
  data.value.rightColumn.cards.push(newRightCard)
  nextTick(() => {
    fixedLines.value.push({leftId: newId, rightId: newId})
  })
}
// 删除一组卡片
const removeCard = (index: number, id: string) => {
  data.value.leftColumn.cards.splice(index, 1)
  data.value.rightColumn.cards.splice(index, 1)
  fixedLines.value = fixedLines.value.filter(line => line.leftId !== id)
}
</script>

<style scoped>
.wrapped {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f9fc;
}
.bordered-container {
  position: relative;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 25px;
  width: 900px;
  max-width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.header {
  display: flex;
  justify-content: space-around; /* 改为 space-around 让标题居中于各自的栏目上 */
  margin-bottom: 20px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  flex: 1;
}
.main-content {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
/* 卡片图片背景 */
.card-icon-background {
  width: 100px;
  height: 100px;
  border-radius: inherit;
  background-color: #555;
  overflow: hidden;
}
/* 卡片样式 */
.card {
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  position: relative; /* 为了删除按钮的绝对定位 */
  transition: all 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.card-left {
  height: 70px;
}
.card-icon {
  width: 100px;
  height: 100%;
}
.card-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.card-title {
  font-weight: bold;
  font-size: 16px;
}
.card-tag {
  font-size: 13px;
  color: #555;
}
.card-right {
  background-color: #f0f7ff;
  justify-content: center;
  font-weight: 500;
  height: 70px;
  text-align: center;
}
/* 卡片匹配错误样式 */
.card-error {
  box-shadow: 0 0 8px 2px #f56c6c;
  border: 1px solid #f56c6c;
}
.delete-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  opacity: 0;
  transition: opacity 0.2s;
}
.card:hover .delete-btn {
  opacity: 1; /* 鼠标悬浮在卡片上时显示删除按钮 */
}
/* 绳子svg图层样式 */
.rope-svg {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
/* 卡片底部增加按钮样式 */
.footer-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.add-btn {
  width: 50%;
  border-style: dashed;
}
</style>
