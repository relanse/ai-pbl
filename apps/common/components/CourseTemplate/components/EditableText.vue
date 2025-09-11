<template>
  <div
    class="editable-text-wrapper"
    :class="{EditMode: isEdit}"
    @click="activateEditMode"
  >
    <el-input
      v-if="isEditMode"
      ref="inputRef"
      v-model="currentValue"
      @blur="handleBlur"
      @keyup.enter="handleBlur"
    />
    <div v-else class="display-text">
      <slot>{{ currentValue }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, nextTick, defineModel, inject} from 'vue'
import {ElInput} from 'element-plus'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from '../provider'

const {isEdit} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)

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
  if (isEdit.value === false) return

  isEditMode.value = true
  await nextTick() // 等待 input 渲染出来
  inputRef.value?.focus()
}

const handleBlur = () => {
  isEditMode.value = false
}
</script>

<style scoped>
.editable-text-wrapper {
  width: 100%;
  height: 100%;
  /* 默认情况下，是普通鼠标指针 */
  cursor: default;
}

/* 仅在编辑器处于编辑状态时，才显示手型指针 */
.editable-text-wrapper.EditMode {
  cursor: text;
}
.display-text {
  text-align: center;
  border: 1px dashed transparent; /* 预留边框位置，防止悬浮时跳动 */
  border-radius: 4px;
  transition: border-color 0.2s; /* 添加过渡效果 */
}
/* 仅在编辑器处于编辑状态时，鼠标悬浮时才显示蓝色虚线边框 */
.editable-text-wrapper.EditMode:hover .display-text {
  border-color: #409eff;
}
</style>
