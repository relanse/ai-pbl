<!-- components/EditableText.vue -->
<template>
  <div class="editable-text-wrapper" @click="activateEditMode">
    <el-input
      v-if="isEditingMode"
      ref="inputRef"
      v-model="currentValue"
      @blur="handleBlur"
      @keyup.enter="handleBlur"
      :type="textarea ? 'textarea' : 'text'"
      :autosize="textarea"
    />
    <div v-else class="display-text">
      <slot>{{ currentValue }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, nextTick, defineProps, defineModel} from 'vue'
import {ElInput} from 'element-plus'

const props = defineProps<{
  isEditing: boolean // 从父组件接收是否处于全局编辑状态
  textarea?: boolean // 是否使用多行文本框
}>()

const currentValue = defineModel<string>() // 使用 v-model 双向绑定

const isEditingMode = ref(false)
const inputRef = ref<InstanceType<typeof ElInput> | null>(null)

// 监听全局编辑状态，如果退出全局编辑，此组件也应退出编辑状态
watch(
  () => props.isEditing,
  newVal => {
    if (!newVal) {
      isEditingMode.value = false
    }
  }
)

const activateEditMode = async () => {
  // 只有在全局编辑模式下才允许激活
  if (!props.isEditing) return

  isEditingMode.value = true
  await nextTick() // 等待 input 渲染出来
  inputRef.value?.focus()
}

const handleBlur = () => {
  isEditingMode.value = false
  // v-model 会自动更新父组件的值
}
</script>

<style scoped>
.editable-text-wrapper {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.display-text {
  padding: 5px;
  border: 1px dashed transparent; /* 预留边框位置 */
  border-radius: 4px;
}
.editable-text-wrapper:hover .display-text {
  border-color: #409eff; /* 鼠标悬浮时提示可编辑 */
}
</style>
