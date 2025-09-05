<template>
  <div class="connection-game" @mousemove="updateTempLine">
    <!-- 左侧 -->
    <div class="left w-1/2">
      <h2>{{ data.leftOption.title }}</h2>
      <div
        v-for="item in data.leftOption.card"
        :key="item.id"
        class="card"
        :class="{
          active: selectedLeft?.id === item.id,
          locked: lockedLeft.includes(item.id)
        }"
        @click="!lockedLeft.includes(item.id) && selectLeft(item, $event)"
      >
        <p>{{ item.content }}</p>
        <small>{{ item.tag }}</small>
      </div>
    </div>

    <!-- SVG画布 -->
    <svg class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <!-- 已确认连线 -->
      <line
        v-for="(line, idx) in lines"
        :key="idx"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        :stroke="line.color"
        stroke-width="3"
        stroke-linecap="round"
      />

      <!-- 临时连线 -->
      <line
        v-if="tempLine"
        :x1="tempLine.x1"
        :y1="tempLine.y1"
        :x2="tempLine.x2"
        :y2="tempLine.y2"
        stroke="lightblue"
        stroke-width="3"
        stroke-dasharray="5,5"
      />
    </svg>

    <!-- 右侧 -->
    <div class="right w-1/2">
      <h2>{{ data.rightOption.title }}</h2>
      <div
        v-for="item in data.rightOption.card"
        :key="item.id"
        class="card"
        :class="{locked: lockedRight.includes(item.id)}"
        @click="!lockedRight.includes(item.id) && selectRight(item, $event)"
      >
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>

  <!-- 提示 -->
  <div v-if="message" class="mt-4 text-center text-lg font-bold">
    {{ message }}
  </div>

  <!-- 通关提示 -->
  <div
    v-if="isCompleted"
    class="mt-6 text-center text-2xl font-bold text-green-600"
  >
    🎉 恭喜你，全部匹配完成！
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'

// =================== 类型定义 ===================
interface CardItem {
  id: number
  content: string
  tag?: string
  img?: string
}

interface Rule {
  leftId: number
  rightId: number
  message: string
}

interface MatchData {
  rules: Rule[]
  wrongMessage: string
}

interface GameData {
  name: string
  version: string
  leftOption: {
    title: string
    card: CardItem[]
  }
  rightOption: {
    title: string
    card: CardItem[]
  }
  match: MatchData
}

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
}

interface TempLine {
  x1: number
  y1: number
  x2: number
  y2: number
}

// =================== Props ===================
const props = defineProps<{
  data: GameData
}>()

// =================== State ===================
const selectedLeft = ref<CardItem | null>(null)
const lines = ref<Line[]>([])
const tempLine = ref<TempLine | null>(null)
const message = ref('')

const lockedLeft = ref<number[]>([])
const lockedRight = ref<number[]>([])

// =================== 计算是否完成 ===================
const isCompleted = computed(() => {
  return (
    lockedLeft.value.length === props.data.leftOption.card.length &&
    lockedRight.value.length === props.data.rightOption.card.length
  )
})

// =================== 方法 ===================
function getCardCenter(event: MouseEvent): {x: number; y: number} {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY
  }
}

function selectLeft(item: CardItem, event: MouseEvent) {
  selectedLeft.value = item
  message.value = ''
  const {x, y} = getCardCenter(event)
  tempLine.value = {x1: x, y1: y, x2: x, y2: y}
}

function updateTempLine(e: MouseEvent) {
  if (tempLine.value) {
    tempLine.value.x2 = e.pageX
    tempLine.value.y2 = e.pageY
  }
}

function selectRight(item: CardItem, event: MouseEvent) {
  if (!selectedLeft.value || !tempLine.value) return

  const {x, y} = getCardCenter(event)

  const matchRule = props.data.match.rules.find(
    rule => rule.leftId === selectedLeft.value!.id && rule.rightId === item.id
  )

  const isCorrect = !!matchRule
  message.value = isCorrect ? matchRule!.message : props.data.match.wrongMessage

  // 固定连线
  lines.value.push({
    x1: tempLine.value.x1,
    y1: tempLine.value.y1,
    x2: x,
    y2: y,
    color: isCorrect ? 'green' : 'red'
  })

  // 正确时锁定卡片
  if (isCorrect) {
    lockedLeft.value.push(selectedLeft.value.id)
    lockedRight.value.push(item.id)
  }

  // 清理
  tempLine.value = null
  selectedLeft.value = null
}
</script>

<style scoped>
.connection-game {
  position: relative;
  user-select: none;
}
.card {
  border: 2px solid #ccc;
  padding: 12px;
  margin: 8px;
  border-radius: 10px;
  cursor: pointer;
  background: white;
  transition:
    transform 0.2s,
    background 0.2s;
}
.card:hover {
  background: #f0f8ff;
}
.card.active {
  background: #dbeafe;
  transform: scale(1.05);
  border-color: #60a5fa;
}
.card.locked {
  background: #e5e7eb;
  border-color: #9ca3af;
  color: #6b7280;
  cursor: not-allowed;
  transform: none !important;
}
</style>
