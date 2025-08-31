<template>
  <el-input
    class="my-input"
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <!-- 自定义前缀图标插槽 -->
    <template #prefix v-if="icon">
      <MyIcon :name="icon" class="input-icon" />
    </template>

    <!-- 保留原有的所有插槽 -->
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </el-input>
</template>

<script setup lang="ts">
import {ElInput} from 'element-plus'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import {iconNamesType} from '@aipbl/common/components/MyIcon/iconPath'
defineOptions({
  name: 'MyInput',
  inheritAttrs: false
})

// 定义组件的属性
const props = defineProps({
  // 继承 el-input 的 modelValue
  modelValue: {
    type: [String, Number],
    default: ''
  },
  // 自定义图标名称
  icon: {
    type: String as () => iconNamesType,
    default: ''
  }
})

// 定义事件
defineEmits(['update:modelValue'])
</script>

<style scoped>
.my-input {
  border-radius: 24px;
  height: 48px;
}

.my-input :deep(.el-input__wrapper) {
  border-radius: 24px;
  padding: 0 15px;
  box-shadow: 0 0 0 1px #e0e5ec;
  background: #eeeeee;
}

.my-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #95c3f6;
  background: #f0f6ff;
}

.input-icon {
  width: 24px;
  height: 24px;
}
</style>
