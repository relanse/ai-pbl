<template>
  <div class="connection-template" ref="containerRef">
    <!-- 顶部提示 -->
    <div class="robot-prompt">
      <img :src="RobotImg" style="height: 60px; width: 50px" />
      <EditableText :is-editing="isEditing" v-model="data.prompt" />
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧栏 -->
      <div class="column">
        <div class="column-title">
          <EditableText
            :is-editing="isEditing"
            v-model="data.leftColumn.title"
          />
        </div>
        <div
          v-for="(card, index) in data.leftColumn.cards"
          :key="card.id"
          class="card left-card"
          :ref="el => (cardRefs[card.id] = el)"
          @click="handleLeftCardClick(card.id)"
        >
          <EditableImage :is-editing="isEditing" v-model="card.img" />
          <div class="card-text">
            <EditableText
              class="card-title"
              :is-editing="isEditing"
              v-model="card.title"
            />
            <EditableText
              class="card-tag"
              :is-editing="isEditing"
              v-model="card.tag"
            />
          </div>
          <el-button
            v-if="isEditing"
            @click.stop="removeCard('left', index)"
            type="danger"
            circle
            size="small"
            >-</el-button
          >
        </div>
        <el-button
          v-if="isEditing && data.leftColumn.cards.length < 4"
          @click="addCard('left')"
          >添加卡片</el-button
        >
      </div>

      <!-- 中间 -->
      <div class="center-connector"><span>连线匹配</span></div>

      <!-- 右侧栏 -->
      <div class="column">
        <div class="column-title">
          <EditableText
            :is-editing="isEditing"
            v-model="data.rightColumn.title"
          />
        </div>
        <div
          v-for="(card, index) in data.rightColumn.cards"
          :key="card.id"
          class="card right-card"
          :ref="el => (cardRefs[card.id] = el)"
          @click="handleRightCardClick(card.id)"
        >
          <EditableText
            class="card-title"
            :is-editing="isEditing"
            v-model="card.title"
          />
          <el-button
            v-if="isEditing"
            @click.stop="removeCard('right', index)"
            type="danger"
            circle
            size="small"
            >-</el-button
          >
        </div>
        <el-button
          v-if="isEditing && data.rightColumn.cards.length < 4"
          @click="addCard('right')"
          >添加卡片</el-button
        >
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="footer">
      <el-button type="primary" size="large">检查连线结果</el-button>
    </div>

    <!-- SVG 绘图层 -->
    <svg class="line-canvas" v-if="!isEditing" @mousemove="handleMouseMove">
      <!-- 绘制已有的连线 -->
      <line
        v-for="line in connections"
        :key="`${line.from}-${line.to}`"
        :x1="line.start.x"
        :y1="line.start.y"
        :x2="line.end.x"
        :y2="line.end.y"
        stroke="#409eff"
        stroke-width="4"
      />
      <!-- 绘制正在拖动的线 -->
      <line
        v-if="tempLine"
        :x1="tempLine.start.x"
        :y1="tempLine.start.y"
        :x2="tempLine.end.x"
        :y2="tempLine.end.y"
        stroke="#409eff"
        stroke-width="4"
        stroke-dasharray="5,5"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  reactive,
  onMounted,
  defineProps,
  defineModel,
  nextTick
} from 'vue'
import EditableText from '../EditableText.vue'
import EditableImage from '../EditableImage.vue'
import RobotImg from '../../assets/robot.png'
const props = defineProps<{isEditing: boolean}>()
const data = defineModel('data')

const containerRef = ref<HTMLElement | null>(null)
const cardRefs = reactive({})
const connections = ref<
  {
    from: string
    to: string
    start: {x: number; y: number}
    end: {x: number; y: number}
  }[]
>([])
const activeLeftCardId = ref<string | null>(null)
const tempLine = ref<{
  start: {x: number; y: number}
  end: {x: number; y: number}
} | null>(null)

// 编辑模式功能
const addCard = (column: 'left' | 'right') => {
  const newId = `${column.charAt(0)}${Date.now()}`
  if (column === 'left') {
    data.value.leftColumn.cards.push({
      id: newId,
      img: '',
      title: '新标题',
      tag: '新标签'
    })
  } else {
    data.value.rightColumn.cards.push({id: newId, title: '新标题'})
  }
}
const removeCard = (column: 'left' | 'right', index: number) => {
  if (column === 'left') {
    data.value.leftColumn.cards.splice(index, 1)
  } else {
    data.value.rightColumn.cards.splice(index, 1)
  }
}

// 预览模式连线逻辑
const getCardCenter = (id: string) => {
  const el = cardRefs[id]
  if (!el || !containerRef.value) return {x: 0, y: 0}
  const containerRect = containerRef.value.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()

  const isLeft = el.classList.contains('left-card')
  const x = (isLeft ? elRect.right : elRect.left) - containerRect.left
  const y = elRect.top + elRect.height / 2 - containerRect.top
  return {x, y}
}

const handleLeftCardClick = (id: string) => {
  if (props.isEditing) return
  activeLeftCardId.value = id
  const startPos = getCardCenter(id)
  tempLine.value = {start: startPos, end: startPos}
}

const handleRightCardClick = (id: string) => {
  if (props.isEditing || !activeLeftCardId.value) return

  // 移除任何已存在的从这个左卡片或到这个右卡片的连线
  connections.value = connections.value.filter(
    conn => conn.from !== activeLeftCardId.value && conn.to !== id
  )

  // 添加新连线
  const startPos = getCardCenter(activeLeftCardId.value)
  const endPos = getCardCenter(id)
  connections.value.push({
    from: activeLeftCardId.value,
    to: id,
    start: startPos,
    end: endPos
  })

  // 重置
  activeLeftCardId.value = null
  tempLine.value = null
}

const handleMouseMove = (event: MouseEvent) => {
  if (props.isEditing || !activeLeftCardId.value || !containerRef.value) return

  const containerRect = containerRef.value.getBoundingClientRect()
  const x = event.clientX - containerRect.left
  const y = event.clientY - containerRect.top

  if (tempLine.value) {
    tempLine.value.end = {x, y}
  }
}

// 切换模式时重置状态
watch(
  () => props.isEditing,
  isEditing => {
    if (isEditing) {
      connections.value = []
      activeLeftCardId.value = null
      tempLine.value = null
    }
  }
)
</script>

<style scoped>
/* 此处为关键样式，请根据你的UI设计稿微调 */
.connection-template {
  position: relative;
  background-color: #f0f8ff;
  border-radius: 20px;
  padding: 24px;
  font-family: sans-serif;
}
.robot-prompt {
  /* ... 样式 */
}
.main-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
}
.column {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px; /* 根据内容调整 */
}
.column-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
}
.card {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}
.left-card {
  background-color: #e6f7ff;
}
.right-card {
  background-color: #e6f7ff;
  justify-content: center;
}
.card.left-card:hover,
.card.right-card:hover {
  border: 2px solid #409eff;
  cursor: pointer;
}
.card-text {
  margin-left: 10px;
}
.card-title {
  font-weight: bold;
}
.card-tag {
  font-size: 0.9em;
  color: #666;
}
.card .el-button {
  position: absolute;
  right: -10px;
  top: -10px;
}
.line-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 允许点击穿透SVG层 */
}
/* ... 更多样式 ... */
</style>
