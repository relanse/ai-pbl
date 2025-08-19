<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="auto"
    label-position="left"
  >
    <el-form-item label="引导话术" prop="guideText">
      <el-input v-model="form.guideText" placeholder="请输入引导话术" />
    </el-form-item>

    <!-- 动态选项部分 -->
    <el-form-item
      class="form-item"
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

// 1. 定义选项和表单的接口
interface ChoiceOption {
  id: number // 用于 v-for 的 key
  value: string
}

interface ChoiceForm {
  guideText: string
  options: ChoiceOption[]
  isRecord: boolean
}

// 2. 创建响应式表单数据，options 数组初始化一个空选项
const form = reactive<ChoiceForm>({
  guideText: '',
  options: [{id: Date.now(), value: ''}],
  isRecord: true
})

// 3. 定义表单验证规则
const rules = reactive<FormRules<ChoiceForm>>({
  guideText: [{required: false, message: '请输入引导话术', trigger: 'blur'}]
  // 选项的验证规则直接写在模板的 el-form-item 上了
})

// 4. 添加选项的方法
const addOption = () => {
  form.options.push({
    id: Date.now(), // 使用时间戳确保 key 的唯一性
    value: ''
  })
}

// 5. 删除选项的方法
const removeOption = (index: number) => {
  // 保证至少剩一个选项
  if (form.options.length > 1) {
    form.options.splice(index, 1)
  }
}

const formRef = ref<FormInstance>()
</script>

<style scoped>
.form-item {
  display: flex;
  align-items: center;
}
.option-item {
  display: flex;
  align-items: center;
  width: 100%;
}
.option-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 25px;
  color: #8593a7;
}
.option-input {
  flex-grow: 1;
  margin-right: 10px;
}
.el-form-item {
  margin-bottom: 22px;
}
.el-form[label-position='top'] .el-form-item {
  margin-bottom: 12px;
}
</style>
