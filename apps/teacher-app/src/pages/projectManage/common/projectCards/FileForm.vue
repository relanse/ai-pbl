<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item label="引导话术" prop="guideText">
      <el-input v-model="form.guideText" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <span>文件上传</span>
      <FileUpload></FileUpload>
    </el-form-item>
    <el-form-item label="是否记录" prop="isRecord">
      <el-radio-group v-model="form.isRecord">
        <el-radio :value="true">是</el-radio>
        <el-radio :value="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElRadioGroup,
  FormInstance,
  FormRules
} from 'element-plus'
import {reactive, ref} from 'vue'
import FileUpload from '@/common/FileUpload.vue'
interface FileForm {
  guideText: string
  isRecord: boolean
}
const form = reactive<FileForm>({
  guideText: '',
  isRecord: true
})
const rules = reactive<FormRules<FileForm>>({
  guideText: [{required: false, message: '请输入引导话术', trigger: 'blur'}]
})
const formRef = ref<FormInstance>()
</script>
<style scoped></style>
