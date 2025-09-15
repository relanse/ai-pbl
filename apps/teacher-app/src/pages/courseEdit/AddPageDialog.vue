<template>
  <el-dialog
    :model-value="modelValue"
    title="选择新页面的模板"
    width="30%"
    @update:model-value="emit('update:modelValue', $event)"
  >  nvm install 22
  nvm use 22
  node -v   # 应显示 v22.x.x
    <el-radio-group v-model="selectedTemplate">
      <el-radio
        v-for="item in opt"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ElDialog, ElRadioGroup, ElRadio, ElButton} from 'element-plus'
defineProps<{
  modelValue: boolean // 用于 v-model
  opt: {value: string; label: string}[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void // 用于 v-model
  (e: 'confirm', templateType: string): void // 用户点击确定时触发
}>()

const selectedTemplate = ref('connection')
const handleCancel = () => {
  emit('update:modelValue', false)
}

const handleConfirm = () => {
  emit('confirm', selectedTemplate.value)
  emit('update:modelValue', false) // 提交后自动关闭
}
</script>
