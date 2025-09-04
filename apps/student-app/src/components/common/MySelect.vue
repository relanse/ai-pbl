<template>
  <el-select
    class="my-select"
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <!-- 自定义前缀图标 -->
    <template #prefix v-if="icon">
      <MyIcon :name="icon" class="select-icon" />
    </template>
    <slot></slot>
  </el-select>
</template>

<script setup lang="ts">
import {ElSelect} from 'element-plus'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import {iconNamesType} from '@aipbl/common/components/MyIcon/iconPath'

defineOptions({
  name: 'MySelect',
  inheritAttrs: false
})

// 定义组件的属性
const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object, Boolean],
    default: ''
  },
  icon: {
    type: String as () => iconNamesType,
    default: ''
  }
})

// 定义事件
defineEmits(['update:modelValue'])
</script>

<style scoped>
.my-select {
  width: 100%;
}
.my-select :deep(.el-select__wrapper) {
  border-radius: 24px;
  height: 48px;
  padding: 0 15px;
  box-shadow: 0 0 0 1px #e0e5ec;
  background: #eeeeee;
}

.my-select :deep(.el-select__wrapper.is-focused) {
  box-shadow: 0 0 0 1px #95c3f6;
  background: #f0f6ff;
}
.select-icon {
  width: 24px;
  height: 24px;
  color: #909399;
}
</style>
