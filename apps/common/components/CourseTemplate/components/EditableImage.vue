<!-- components/EditableImage.vue -->
<template>
  <div class="editable-image-wrapper" @click="triggerUpload">
    <img
      :src="imageUrl || defaultImage"
      alt="可编辑图片"
      class="image-display"
      draggable="false"
    />
    <div v-if="isEdit" class="overlay">
      <span>编辑图片</span>
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
import {ref, defineModel, inject} from 'vue'
import {
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
} from '../provider'
import defaultImage from '../../../assets/uploadImg.png'
// 2. 移除 props 定义
// const props = defineProps<{
//   isEditing: boolean
// }>()

// 3. 注入 isEditing 状态
const {isEdit} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)

const imageUrl = defineModel<string>() // v-model

const fileInput = ref<HTMLInputElement | null>(null)

const triggerUpload = () => {
  // 4. 使用注入的 isEditing.value
  if (!isEdit.value) return
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
  /* 仅在全局可编辑时显示手型指针 */
  cursor: v-bind("isEdit ? 'pointer' : 'default'");
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
/* 仅在全局可编辑时，悬浮才显示遮罩 */
.editable-image-wrapper:hover .overlay {
  opacity: v-bind('isEdit ? 1 : 0');
}
</style>
