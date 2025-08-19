<template>
  <el-form ref="formRef" :model="Form" :rules="rules" label-width="auto">
    <el-form-item label="引导话术" prop="guideText">
      <el-input v-model="Form.guideText" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="是否记录" prop="isRecord">
      <el-radio-group v-model="Form.isRecord">
        <el-radio :value="true">是</el-radio>
        <el-radio :value="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {ElForm, ElFormItem, ElRadio, ElRadioGroup, ElInput} from 'element-plus'
interface TextForm {
  guideText: string
  isRecord: boolean
}

const Form = reactive<TextForm>({
  guideText: '',
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
