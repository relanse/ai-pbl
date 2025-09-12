<template>
  <div
    :class="[isEditMode && 'is-globally-editing', 'editable-text-wrapper']"
    @click="activateEditMode"
  >
    <el-input
      v-if="isEditMode"
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
import {ref, watch, nextTick, defineProps, defineModel, inject} from 'vue'
import {ElInput} from 'element-plus'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'

// 2. 从 props 中移除
const props = defineProps<{
  textarea?: boolean // 是否使用多行文本框
}>()

// 3. 注入来自顶层组件的状态
const {isEdit} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
) // 提供一个默认值以防万一
const isEditMode = ref(false)
const currentValue = defineModel<string>()
const inputRef = ref<InstanceType<typeof ElInput> | null>(null)

// 4. watch 的目标现在是注入的
watch(isEdit, newVal => {
  if (!newVal) {
    isEditMode.value = false
  }
})

const activateEditMode = async () => {
  // 5. 判断条件也使用注入的
  if (!isEdit.value) return

  isEditMode.value = true
  await nextTick() // 等待 input 渲染出来
  inputRef.value?.focus()
}

const handleBlur = () => {
  isEditMode.value = false
}
</script>

<style scoped>
/* 样式部分保持不变，因为 :class 绑定的变量名没变 */
.editable-text-wrapper {
  width: 100%;
  /* 默认情况下，是普通鼠标指针 */
  cursor: default;
}

/* 仅在全局可编辑时，才显示手型指针 */
.editable-text-wrapper.is-globally-editing {
  cursor: text;
}

.display-text {
  padding: 10px; /* 增加一点内边距，让边框和文字有距离 */
  border: 1px dashed transparent; /* 预留边框位置，防止悬浮时跳动 */
  border-radius: 4px;
  transition: border-color 0.2s; /* 添加过渡效果 */
}

/* 仅在全局可编辑时，鼠标悬浮时才显示蓝色虚线边框 */
.editable-text-wrapper.is-globally-editing:hover .display-text {
  border-color: #409eff;
}
</style>
