<template>
  <div>
    <el-input
      v-model="inputValue"
      disabled
      placeholder="这是一个禁用的输入框"
    ></el-input>
    <br /><br />
    <el-input
      v-model="inputValue"
      :disabled="isDisabled"
      placeholder="通过变量控制禁用"
    ></el-input>
    <el-button @click="toggleDisabled">切换禁用状态</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ElInput, ElButton} from 'element-plus' // 假设你按需导入

const inputValue = ref('一些文本')
const isDisabled = ref(true)

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value
}
</script>

<style scoped>
/* 使用 ::v-deep 或 :deep() 来深度选择 Element UI 组件的内部样式 */
/* 对于 Vue 3，推荐使用 :deep() */
:deep(.el-input.is-disabled .el-input__inner) {
  cursor: default !important; /* 改变为文本光标 */
  /* 或者改变为 default，或者你想的任何其他光标样式 */
  /* cursor: default !important; */
}

/* 如果你想改变整个 el-input 容器的 cursor (包括图标等)，可以这样 */
:deep(.el-input.is-disabled) {
  cursor: default !important; /* 让整个容器也显示文本光标 */
}

/* 如果你需要改变背景颜色或其他样式，也可以在这里覆盖 */
:deep(.el-input.is-disabled .el-input__inner) {
  background-color: #f5f7fa; /* 示例：改变背景色 */
  color: #c0c4cc; /* 示例：改变文字颜色 */
}
</style>
