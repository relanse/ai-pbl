<template>
  <div class="template-container">
    <RobotPrompt v-model="data.prompt" />
    <div class="template-card">
      <div class="draw-container">
        <EditableText v-model="data.title" :is-editing="isEdit">
          <span
            style="
              font-family: Microsoft YaHei;
              font-weight: 700;
              font-style: Bold;
              font-size: 24px;
              line-height: 100%;
              letter-spacing: 0%;
            "
            >{{ data.title }}</span
          >
        </EditableText>
        <canvas
          class="draw-area"
          ref="drawCanvas"
          @mousedown="startDrawing"
          @mousemove="draw"
          :style="{backgroundColor: data.draw ? '#ffffff' : '#f6faff'}"
        >
          <div class="draw-area-background" v-if="!data.draw">
            <MyIcon name="DrawIcon"></MyIcon>
          </div>
        </canvas>
      </div>
      <div class="draw-tool"></div>
    </div>
    <div class="card-footer">
      <button type="button" round @click="data.draw = ''" class="reset-button">
        重新创作
      </button>
      <MyButton style="width: 219px">保存作品</MyButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject, onMounted, onBeforeUnmount, watch} from 'vue'
import RobotPrompt from './components/RobotPrompt.vue'
import EditableText from './components/EditableText.vue'
import MyButton from './components/MyButton.vue'
import MyIcon from './../../components/MyIcon/index.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
import {useCurrentPageData} from '../../composables/useCurrentPageData'
import {DrawTemplateType} from './type'
const {isEdit} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const {data} = useCurrentPageData<DrawTemplateType>('draw')
//画板变量
const drawCanvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const isDrawing = ref(false)
// 用于监听尺寸变化
let resizeObserver: ResizeObserver | null = null

// --- 封装的函数 ---

// 设置画笔样式（因为画布尺寸改变会重置样式）
const setContextStyle = () => {
  if (ctx.value) {
    ctx.value.lineJoin = 'round'
    ctx.value.lineCap = 'round'
    ctx.value.lineWidth = 5
    ctx.value.strokeStyle = '#000000'
  }
}

// 重新设置画布尺寸并重绘内容
const resizeCanvas = () => {
  if (!drawCanvas.value || !ctx.value) return

  // 1. 保存当前图像
  const imageData = drawCanvas.value.toDataURL()

  // 2. 更新画布的绘图表面尺寸以匹配其显示尺寸
  drawCanvas.value.width = drawCanvas.value.clientWidth
  drawCanvas.value.height = drawCanvas.value.clientHeight

  // 3. 恢复上下文样式
  setContextStyle()

  // 4. 重绘图像
  const image = new Image()
  image.onload = () => {
    ctx.value?.drawImage(image, 0, 0)
  }
  image.src = imageData
}

const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }
}

const startDrawing = (event: MouseEvent) => {
  if (!drawCanvas.value && !ctx.value) return
  isDrawing.value = true
  const {x, y} = getMousePos(<HTMLCanvasElement>drawCanvas.value, event)
  ctx.value!.beginPath()
  ctx.value!.moveTo(x, y)
  // 在 window 上添加 mouseup 监听器
  window.addEventListener('mouseup', stopDrawing, { once: true })
}

const draw = (event: MouseEvent) => {
  if (!ctx.value || !isDrawing.value || !drawCanvas.value) return
  // 只有当鼠标左键被按下时才绘画
  if (event.buttons !== 1) {
    stopDrawing()
    return
  }
  const {x, y} = getMousePos(drawCanvas.value, event)
  ctx.value.lineTo(x, y)
  ctx.value.stroke()
}

const stopDrawing = () => {
  if (!isDrawing.value) return
  isDrawing.value = false
  ctx.value?.closePath()
  if (drawCanvas.value) {
    // 使用扩展运算符创建一个新对象来触发 Vue 的响应式更新
    const updatedData = { ...data.value }
    updatedData.draw = drawCanvas.value.toDataURL()
    data.value = updatedData
  }
}

onMounted(() => {
  if (drawCanvas.value) {
    const canvas = drawCanvas.value
    ctx.value = canvas.getContext('2d')
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    setContextStyle()// --- 新增：启动 ResizeObserver 来监听画布尺寸变化 ---
    resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(drawCanvas.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && drawCanvas.value) {
    resizeObserver.unobserve(drawCanvas.value)
  }
  // 确保移除所有可能的事件监听器
  window.removeEventListener('mouseup', stopDrawing)
})

watch(
  () => data.value.draw,
  newDrawData => {
    if (ctx.value && drawCanvas.value) {
      // --- 修改：简化逻辑，只在有新数据时绘制，否则清空 ---
      ctx.value.clearRect(
        0,
        0,
        drawCanvas.value.width,
        drawCanvas.value.height
      )
      if (newDrawData) {
        const image = new Image()
        image.onload = () => {
          ctx.value?.drawImage(image, 0, 0)
        }
        image.src = newDrawData
      }
    }
  },
  {immediate: true}
)
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
  align-items: center;
  justify-content: space-around;
  width: 95%;
  max-height: 600px;
  border-radius: 32px;
  aspect-ratio: 1.85/1;
  border: 5px solid #649ffe;
}
.draw-container {
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.draw-area {
  position: relative;
  width: 100%;
  height: 80%;
  border: 2px solid #6697ff;
  border-radius: 20px;
  margin-top: 10px;
  background-color: #ffffff;
  cursor: crosshair;
}
.draw-area-background {
  position: absolute;
  width: 100%;
  height: 100%;
}
.draw-tool {
  width: 40%;
  height: 90%;
  display: flex;
  flex-direction: column;
}
.card-footer {
  width: 95%;
  display: flex;
  flex: 1 1 90px;
  justify-content: space-around;
  align-items: center;
}
.reset-button {
  width: 219px;
  height: 51px;
  border-radius: 27px;
  border: 0.78px solid transparent;
  background-image:
    transparent, linear-gradient(92.56deg, #6696ff 1.43%, #63a2fd 93.64%);
  background-origin: border-box;
  background-clip: padding-box, border-box; /* 4. 裁剪背景 */
  font-family: Inter;
  font-weight: 700;
  color: #6699ff;
  font-size: 20px;
  line-height: 100%;
  text-align: center;
}
</style>
