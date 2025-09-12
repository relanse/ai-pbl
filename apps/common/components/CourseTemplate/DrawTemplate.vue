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
        >
          <div class="draw-area-background"></div>
        </canvas>
      </div>
      <div class="draw-tool"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject, onMounted, onBeforeMount, watch} from 'vue'
import RobotPrompt from './components/RobotPrompt.vue'
import EditableText from './components/EditableText.vue'
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

onMounted(() => {
  if (drawCanvas.value) {
    const canvas = drawCanvas.value
    ctx.value = canvas.getContext('2d')
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    if (ctx.value) {
      ctx.value.lineJoin = 'round'
      ctx.value.lineCap = 'round'
      ctx.value.lineWidth = 5
      ctx.value.strokeStyle = '#000000'
    }
  }
})

onBeforeMount(() => {
  window.removeEventListener('mouseup', stopDrawing)
})

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
  window.addEventListener('mouseup', stopDrawing)
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
  if (!ctx.value || !isDrawing.value || !drawCanvas.value) return
  isDrawing.value = false
  ctx.value.closePath()
  const updatedData = {...data.value}
  updatedData.draw = drawCanvas.value.toDataURL()
  drawCanvas.value.toDataURL('image/png')
  data.value = updatedData
}

watch(
  () => data.value.draw,
  newDrawData => {
    if (newDrawData && ctx.value && drawCanvas.value) {
      const image = new Image()
      image.onload = () => {
        ctx.value?.clearRect(
          0,
          0,
          drawCanvas.value!.width,
          drawCanvas.value!.height
        )
        ctx.value?.drawImage(image, 0, 0)
      }
      image.src = newDrawData
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
  width: 100%;
  height: 80%;
  border: 2px solid #6697ff;
  border-radius: 20px;
  margin-top: 10px;
  background-color: #ffffff;
  cursor: crosshair;
}
.draw-tool {
  width: 40%;
  height: 90%;
  display: flex;
  flex-direction: column;
}
</style>
