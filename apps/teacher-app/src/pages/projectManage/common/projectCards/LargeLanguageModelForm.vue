<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item label="引导话术" prop="guideText">
      <el-input v-model="form.guideText" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="内置prompt" prop="prompt">
      <el-input v-model="form.prompt" placeholder="请输入" />
    </el-form-item>
    <div>
      <span>模型选择</span>
      <el-select v-model="selectAIModel" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <el-form-item label="是否记录" prop="isRecord">
      <el-radio-group v-model="form.isRecord">
        <el-radio :value="true">是</el-radio>
        <el-radio :value="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {
  ElForm,
  ElFormItem,
  ElRadio,
  ElRadioGroup,
  ElInput,
  ElSelect,
  ElOption
} from 'element-plus'
const selectAIModel = ref('chatGpt')
const options = [
  {value: 'chatGpt', label: 'chatGpt'},
  {value: 'deepSeek', label: 'deepSeekR3'}
]
interface TextForm {
  guideText: string
  prompt: string
  selectAiModel: 'chatGpt' | 'deepSeek'
  isRecord: boolean
}

const form = reactive<TextForm>({
  guideText: '',
  prompt: '',
  selectAiModel: 'chatGpt',
  isRecord: true
})

const rules = reactive<FormRules<TextForm>>({
  guideText: [{required: false, message: '请输入引导话术', trigger: 'blur'}]
})

const formRef = ref<FormInstance>()
</script>

<style scoped>
.illustration-content {
  margin-top: 10px;
  width: 100%;
}
.el-form-item {
  margin-bottom: 22px;
}
.el-form[label-position='top'] .el-form-item {
  margin-bottom: 12px;
}
</style>
