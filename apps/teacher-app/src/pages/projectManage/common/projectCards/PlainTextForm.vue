<template>
  <el-form ref="formRef" :model="textForm" :rules="rules" label-width="auto">
    <el-form-item label="引导话术" prop="guideText">
      <el-input v-model="textForm.guideText" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="插图" prop="illustration">
      <el-radio-group v-model="textForm.illustration">
        <el-radio value="aiImage">AI生图</el-radio>
        <el-radio value="upload">上传文件</el-radio>
      </el-radio-group>
      <div class="illustration-content">
        <component :is="currentComponent"></component>
      </div>
    </el-form-item>

    <el-form-item label="是否记录" prop="isRecord">
      <el-radio-group v-model="textForm.isRecord">
        <el-radio :value="true">是</el-radio>
        <el-radio :value="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {reactive, ref, computed} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {ElForm, ElFormItem, ElRadio, ElRadioGroup, ElInput} from 'element-plus'

import FileUpload from '@/common/FileUpload.vue'
import AIGenerateImage from '@/common/AIGenerateImage.vue'

interface TextForm {
  guideText: string
  illustration: 'aiImage' | 'upload'
  isRecord: boolean
}

const textForm = reactive<TextForm>({
  guideText: '',
  illustration: 'aiImage', // 默认选中 AI生图
  isRecord: true // 默认选中 是
})

const rules = reactive<FormRules<TextForm>>({
  guideText: [{required: false, message: '请输入引导话术', trigger: 'blur'}]
})

const componentMap = {
  upload: FileUpload,
  aiImage: AIGenerateImage
}

const currentComponent = computed(() => componentMap[textForm.illustration])

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
