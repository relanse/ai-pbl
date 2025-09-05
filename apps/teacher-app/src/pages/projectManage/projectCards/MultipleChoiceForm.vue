<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="70px"
    label-position="left"
  >
    <el-form-item label="引导话术" prop="guideText">
      <el-input v-model="form.guideText" placeholder="请输入引导话术" />
    </el-form-item>

    <el-form-item
      v-for="(option, index) in form.options"
      :label="'选项 ' + (index + 1)"
      :key="option.id"
      :prop="'options.' + index + '.value'"
      :rules="{
        required: false,
        message: '选项内容不能为空',
        trigger: 'blur'
      }"
    >
      <div class="option-item">
        <el-input
          v-model="option.value"
          placeholder="请输入选项内容"
          class="option-input"
        />
        <div class="option-btn">
          <span @click="addOption">+</span>
          <span @click="removeOption(index)" v-if="form.options.length > 1">
            -
          </span>
        </div>
      </div>
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
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {ElForm, ElFormItem, ElRadio, ElRadioGroup, ElInput} from 'element-plus'

interface ChoiceOption {
  id: number
  value: string
}

interface ChoiceForm {
  guideText: string
  options: ChoiceOption[]
  isRecord: boolean
}

const form = reactive<ChoiceForm>({
  guideText: '',
  options: [{id: Date.now(), value: ''}],
  isRecord: true
})

const rules = reactive<FormRules<ChoiceForm>>({
  guideText: [{required: false, message: '请输入引导话术', trigger: 'blur'}]
})

const addOption = () => {
  form.options.push({
    id: Date.now(), // 使用时间戳确保 key 的唯一性
    value: ''
  })
}

const removeOption = (index: number) => {
  if (form.options.length > 1) {
    form.options.splice(index, 1)
  }
}

const formRef = ref<FormInstance>()
</script>

<style scoped>
.option-item {
  display: flex;
  align-items: center;
}
.option-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 25px;
  color: #8593a7;
}
.el-input {
  width: 350px;
  margin-right: 10px;
}
:deep(.el-form-item__label) {
  font-weight: 500;
}
</style>
