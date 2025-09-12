<template>
  <div class="findTemplate-container">
    <!-- 机器人提示词 -->
    <RobotPrompt v-model="data.prompt" />
    <!-- 探索场景画布 -->
    <div
      ref="containerRef"
      class="canvas-container"
      @mousedown.left="backgroundDragStart"
    >
      <div
        ref="wrapperRef"
        class="canvas-wrapper"
        :style="{top: `${wrapperState.y}px`, left: `${wrapperState.x}px`}"
        @click="handlePreviewClick"
      >
        <img
          ref="backgroundImgRef"
          :src="data.backgroundImg"
          @load="updateDimensions"
          alt="探索场景图片"
          class="background-img"
          draggable="false"
        />
        <div
          v-for="(item, index) in data.items"
          :key="item.id"
          class="draggable-items"
          :class="{'is-hidden': !isEdit && !item.found}"
          :style="{top: `${item.y}px`, left: `${item.x}px`}"
          @mousedown.stop
        >
          <div class="text-box">
            <EditableText class="item-text" v-model="item.text" />
            <div
              class="drag-icon"
              v-if="isEdit"
              @mousedown.left.stop="itemDragStart($event, item.id)"
            >
              <el-icon><Rank /></el-icon>
            </div>
          </div>
          <div class="img-box">
            <EditableImage class="item-img" v-model="item.img" />
          </div>
          <ElButton
            class="delete-btn"
            v-if="isEdit"
            type="danger"
            :icon="Delete"
            round
            @click="deleteItem(index)"
          />
        </div>
      </div>
    </div>
    <div class="controls" v-if="isEdit">
      <el-button type="primary" @click="addNewItem">
        新增新的场景物品
      </el-button>
    </div>
    <div v-else>探索进度：{{ foundCount }} / {{ totalCount }}</div>
  </div>
</template>
<script setup lang="ts">
import {computed, inject, onMounted, onUnmounted, ref, watch} from 'vue'
import {v4 as uuidv4} from 'uuid'
import {ElIcon, ElButton} from 'element-plus'
import {Rank, Delete} from '@element-plus/icons-vue'
//自己的类型和数据
import {FindTemplateType} from './type'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
//导入自己的 Hook ---
import {useCurrentPageData} from '../../composables/useCurrentPageData'
//自己的组件
import EditableImage from './components/EditableImage.vue'
import EditableText from './components/EditableText.vue'
import RobotPrompt from './components/RobotPrompt.vue'
const {isEdit} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const {data} = useCurrentPageData<FindTemplateType>('find')

watch(isEdit, () => {
  //当isEdit 的值发生任何变化时,所有场景物品found状态重置
  if (data.value && data.value.items) {
    data.value.items.forEach(item => {
      item.found = false
    })
  }
})
const foundCount = computed(() => {
  return data.value.items.filter(item => item.found).length
})

const totalCount = computed(() => {
  return data.value.items.length
})

const containerRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const backgroundImgRef = ref<HTMLElement | null>(null)

const containerSize = ref({width: 0, height: 0})
const wrapperState = ref({x: 0, y: 0})
const backgroundImgSize = ref({width: 0, height: 0})
const ITEM__WIDTH = 80
const ITEM__HEIGHT = 180

const dragState = ref({
  isDragging: false,
  isPanning: false,
  targetId: '',
  startX: 0,
  startY: 0,
  elementStartX: 0,
  elementStartY: 0
})
const updateDimensions = () => {
  if (containerRef.value) {
    containerSize.value.width = containerRef.value.offsetWidth
    containerSize.value.height = containerRef.value.offsetHeight
  }
  if (backgroundImgRef.value) {
    backgroundImgSize.value.width = backgroundImgRef.value.offsetWidth
    backgroundImgSize.value.height = backgroundImgRef.value.offsetHeight
  }
}

//增加新的场景物品
const addNewItem = async () => {
  if (!containerRef.value) return
  const newId = uuidv4()
  // 计算可视区域的中心点
  const containerRect = containerRef.value.getBoundingClientRect()
  const centerX = containerRect.width / 2 - ITEM__WIDTH / 2
  const centerY = containerRect.height / 2 - ITEM__HEIGHT / 2

  // 将中心点坐标从容器坐标系转换到背景包裹层坐标系
  const initialX = centerX - wrapperState.value.x
  const initialY = centerY - wrapperState.value.y

  data.value.items.push({
    id: newId,
    img: '',
    text: `物品 ${data.value.items.length + 1}`,
    x: initialX,
    y: initialY,
    found: false
  })
}
//删除场景物品
const deleteItem = (index: number) => {
  data.value.items.splice(index, 1)
}
//预览状态下的点击事件
const handlePreviewClick = (event: MouseEvent) => {
  // 如果是编辑模式，或者事件不是直接发生在 wrapper 上，则不处理
  if (isEdit.value || event.target !== wrapperRef.value) {
    return
  }
  // 获取相对于背景包裹层的点击坐标
  const clickX = event.offsetX
  const clickY = event.offsetY

  // 遍历所有未找到的物品，进行碰撞检测
  for (const item of data.value.items) {
    if (!item.found) {
      const itemLeft = item.x
      const itemRight = item.x + ITEM__WIDTH
      const itemTop = item.y
      const itemBottom = item.y + ITEM__HEIGHT

      // 判断点击坐标是否在物品的矩形区域内
      if (
        clickX >= itemLeft &&
        clickX <= itemRight &&
        clickY >= itemTop &&
        clickY <= itemBottom
      ) {
        // 找到了！将物品状态设为 isFound，然后停止循环
        item.found = true
        break
      }
    }
  }
}
//点击场景图片
const backgroundDragStart = (event: MouseEvent) => {
  if ((event.target as HTMLElement).closest('.draggable-item')) {
    return
  }
  dragState.value.isPanning = true
  dragState.value.startX = event.clientX
  dragState.value.startY = event.clientY
  dragState.value.elementStartX = wrapperState.value.x
  dragState.value.elementStartY = wrapperState.value.y

  if (containerRef.value) {
    containerRef.value.style.cursor = 'grabbing'
  }
}
//点击场景物品拖拽图标
const itemDragStart = (event: MouseEvent, itemId: string) => {
  const item = data.value.items.find(c => c.id === itemId)
  if (!item) return

  dragState.value.isDragging = true
  dragState.value.targetId = itemId
  dragState.value.startX = event.clientX
  dragState.value.startY = event.clientY
  dragState.value.elementStartX = item.x
  dragState.value.elementStartY = item.y
}
//处理鼠标移动事件
const handleMouseMove = (event: MouseEvent) => {
  //场景背景图片拖动限制
  if (dragState.value.isPanning) {
    const dx = event.clientX - dragState.value.startX
    const dy = event.clientY - dragState.value.startY
    let newX = dragState.value.elementStartX + dx
    let newY = dragState.value.elementStartY + dy
    // 计算背景平移的边界
    const minX = Math.min(
      0,
      containerSize.value.width - backgroundImgSize.value.width
    )
    const minY = Math.min(
      0,
      containerSize.value.height - backgroundImgSize.value.height
    )
    // 应用边界限制
    newX = Math.max(minX, Math.min(newX, 0))
    newY = Math.max(minY, Math.min(newY, 0))
    wrapperState.value.x = newX
    wrapperState.value.y = newY
  }

  //组件拖拽限制
  if (dragState.value.isDragging) {
    const item = data.value.items.find(c => c.id === dragState.value.targetId)
    if (!item || backgroundImgSize.value.width === 0) return

    const dx = event.clientX - dragState.value.startX
    const dy = event.clientY - dragState.value.startY
    let newX = dragState.value.elementStartX + dx
    let newY = dragState.value.elementStartY + dy

    // 计算物品可移动的最大 X 和 Y 坐标
    const maxX = backgroundImgSize.value.width - ITEM__WIDTH
    const maxY = backgroundImgSize.value.height - ITEM__HEIGHT
    newX = Math.max(0, Math.min(newX, maxX))
    newY = Math.max(0, Math.min(newY, maxY))
    item.x = newX
    item.y = newY
  }
}
const handleMouseUp = () => {
  dragState.value.isDragging = false
  dragState.value.isPanning = false
  dragState.value.targetId = ''
  if (containerRef.value) {
    containerRef.value.style.cursor = 'grab'
  }
}
onMounted(() => {
  updateDimensions()
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('resize', updateDimensions)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('resize', updateDimensions)
})
</script>

<style scoped>
.findTemplate-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
}
.canvas-container {
  position: relative;
  width: 90vw;
  max-width: 800px;
  height: 70vh;
  max-height: 500px;
  border: 5px solid #409eff; /* 蓝色边框 */
  border-radius: 32px;
  overflow: hidden; /* 隐藏超出部分 */
  cursor: grab;
  user-select: none;
}
.canvas-wrapper {
  position: absolute;
}
.background-img {
  display: block;
  pointer-events: none; /* 让鼠标事件穿透图片到容器上 */
}
.draggable-items {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.draggable-items.is-hidden {
  display: none;
}
.text-box {
  position: relative;
  display: inline-block;
  background-color: #409eff;
  min-width: 30px;
  max-width: 80px;
  padding: 5px 16px; /* 稍微增加内边距，让气泡更饱满 */
  border-radius: 21px; /* 更圆的圆角 */
  white-space: nowrap;
  margin-bottom: 5px;
}
.item-text {
  font-size: 16px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.drag-icon {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 30px;
  top: -30px;
  width: 24px;
  height: 24px;
  background-color: #f56c6c;
  color: white;
  border-radius: 50%;
  cursor: move;
  z-index: 1;
}
.img-box {
  height: 100px;
  width: 80px;
  background-color: #f99833;
  border: 3px solid #fff;
  border-radius: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
}
.item-img {
  height: 100%;
  width: 100%;
}
</style>
