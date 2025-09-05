<!-- components/EditableImage.vue -->
<template>
  <div class="editable-image-wrapper" @click="triggerUpload">
    <img
      :src="imageUrl || defaultImage"
      alt="可编辑图片"
      class="image-display"
    />
    <div v-if="isEditing" class="overlay">
      <span>点击更换</span>
    </div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      style="display: none"
      accept="image/*"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, defineModel} from 'vue'

const props = defineProps<{
  isEditing: boolean
}>()

const imageUrl = defineModel<string>() // v-model

const fileInput = ref<HTMLInputElement | null>(null)
const defaultImage = 'https://via.placeholder.com/100' // 默认占位图

const triggerUpload = () => {
  if (!props.isEditing) return
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // 将图片转换为本地URL进行预览
    const reader = new FileReader()
    reader.onload = e => {
      imageUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.editable-image-wrapper {
  position: relative;
  cursor: pointer;
  width: 100px; /* 根据需要调整 */
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
}
.image-display {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.editable-image-wrapper:hover .overlay {
  opacity: 1;
}
</style>
