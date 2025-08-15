<template>
  <el-dialog
    :model-value="modelValue"
    width="35%"
    @close="handleClose"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="title">
        <span>{{ title }}</span>
      </div>
    </template>
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="left"
      label-width="auto"
      class="student-form"
    >
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="学生姓名" prop="studentName">
            <el-input
              v-model="form.studentName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入">
              <template #append>岁</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="年级" prop="grade">
            <el-select v-model="form.grade" placeholder="请选择">
              <el-option label="小学一年级" value="1"></el-option>
              <el-option label="小学二年级" value="2"></el-option>
              <el-option label="小学三年级" value="3"></el-option>
              <el-option label="小学四年级" value="4"></el-option>
              <el-option label="小学五年级" value="5"></el-option>
              <el-option label="小学六年级" value="6"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="学校" prop="school">
            <el-input v-model="form.school" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="家长姓名" prop="parentName">
            <el-input v-model="form.parentName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElCol,
  ElRow,
  ElSelect,
  ElOption
} from 'element-plus'

const props = defineProps<{
  modelValue: boolean
  title: string
  student?: any
}>()

const emit = defineEmits(['update:modelValue', 'saveSuccess'])

const formRef = ref<FormInstance>()
const form = reactive({
  account: '',
  studentName: '',
  gender: '',
  age: '',
  grade: '',
  school: '',
  parentName: '',
  phone: ''
})

watch(
  () => props.student,
  newVal => {
    if (newVal) {
      form.account = newVal.id
      form.studentName = newVal.name
      form.gender = newVal.gender
      form.age = newVal.age
      form.grade = newVal.grade
      form.school = newVal.school
      form.parentName = newVal.parentName
      form.phone = newVal.phone
    }
  },
  {immediate: true} // immediate: true 可以在组件初始化时就执行一次
)

const rules = reactive<FormRules>({
  account: [{required: true, message: '请输入账号', trigger: 'blur'}],
  studentName: [{required: true, message: '请输入学生姓名', trigger: 'blur'}],
  age: [{required: true, message: '请输入年龄 ', trigger: 'blur'}],
  gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
  grade: [{required: true, message: '请选择年级', trigger: 'blur'}],
  school: [{required: true, message: '请输入学校', trigger: 'blur'}],
  parentName: [{required: true, message: '请输入家长姓名', trigger: 'blur'}],
  phone: [{required: true, message: '请输入联系电话', trigger: 'blur'}]
})

// Handlers
const handleClose = () => {
  formRef.value?.resetFields()
  // 重置表单的每个字段
  form.account = ''
  form.studentName = ''
  form.gender = ''
  form.age = ''
  form.grade = ''
  form.school = ''
  form.parentName = ''
  form.phone = ''
  emit('update:modelValue', false)
}

const handleSave = async () => {
  if (!formRef.value) return
  await formRef.value.validate(valid => {
    if (valid) {
      // API request logic goes here
      console.log('保存学生数据:', form)
      emit('saveSuccess')
      handleClose() // Close dialog after successful save
    } else {
      console.log('表单校验失败!')
    }
  })
}
</script>

<style scoped>
.el-select {
  width: 100%;
}

.title {
  font-weight: bold;
  font-size: 18px;
  padding: 10px 15px 15px 15px; /* 控制文字位置：上、右、下、左 */
  border-bottom: 1.21px solid #e0e6ed;
}
</style>
