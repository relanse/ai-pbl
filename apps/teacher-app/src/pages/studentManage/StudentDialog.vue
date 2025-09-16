<template>
  <el-dialog
    :model-value="modelValue"
    width="680px"
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
      label-width="100px"
      class="student-form"
    >
      <el-form-item label="学生姓名" prop="studentName">
        <el-input v-model="form.studentName" placeholder="请输入" maxlength="20" show-word-limit />
      </el-form-item>

      <el-form-item label="出生年月" prop="birth">
        <el-date-picker
          v-model="form.birth"
          type="month"
          value-format="YYYY-MM"
          placeholder="请选择"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择">
          <el-option label="男" value="male" />
          <el-option label="女" value="female" />
        </el-select>
      </el-form-item>

      <el-form-item label="学校" prop="school">
        <el-input v-model="form.school" placeholder="请输入" maxlength="20" show-word-limit />
      </el-form-item>

      <el-form-item label="年级班级">
        <div class="grade-class-row">
          <el-form-item prop="grade" label-width="0" style="width: 100px;">
            <el-select v-model="form.grade" placeholder="选择年级" class="grade-select">
              <el-option label="一年级" value="1" />
              <el-option label="二年级" value="2" />
              <el-option label="三年级" value="3" />
              <el-option label="四年级" value="4" />
              <el-option label="五年级" value="5" />
              <el-option label="六年级" value="6" />
            </el-select>
          </el-form-item>
          <el-form-item prop="classNo" label-width="0">
            <el-input v-model="form.classNo" placeholder="班级号" class="class-input" maxlength="2" />
          </el-form-item>
        </div>
      </el-form-item>

      <el-form-item label="家长姓名" prop="parentName">
        <el-input v-model="form.parentName" placeholder="请输入" maxlength="20" show-word-limit />
      </el-form-item>

      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入" maxlength="20" show-word-limit />
      </el-form-item>

      <el-form-item label="与学生关系" prop="relation">
        <el-select v-model="form.relation" placeholder="请选择">
          <el-option label="父亲" value="father" />
          <el-option label="母亲" value="mother" />
        </el-select>
      </el-form-item>

      <el-form-item label="学生头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          accept="image/*"
          @change="onAvatarChange"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><UploadFilled /></el-icon>
        </el-upload>
      </el-form-item>
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
  ElSelect,
  ElOption,
  ElUpload,
  ElDatePicker,
  ElIcon,
  ElMessage
} from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  student?: any
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'saveSuccess', payload: any): void
}>()

const formRef = ref<FormInstance>()
const form = reactive({
  studentName: '',
  birth: '', // YYYY-MM
  gender: '', // male/female
  school: '',
  grade: '',
  classNo: '',
  parentName: '',
  phone: '',
  relation: '', // father/mother
  avatar: ''
})

watch(
  () => props.student,
  newVal => {
    if (newVal) {
      form.studentName = newVal.name || ''
      form.birth = (newVal.birth || '').slice(0, 7) || ''
      // 将存储的“男/女”映射为选择项“male/female”
      if (newVal.gender === '男' || newVal.gender === 'male') form.gender = 'male'
      else if (newVal.gender === '女' || newVal.gender === 'female') form.gender = 'female'
      else form.gender = ''
  // 回填年级与班级，支持像 “三年2班/小学五年级 三班” 的字符串
  const gc = String(newVal.gradeClass || '')
  if (gc.includes('一')) form.grade = '1'
  else if (gc.includes('二')) form.grade = '2'
  else if (gc.includes('三')) form.grade = '3'
  else if (gc.includes('四')) form.grade = '4'
  else if (gc.includes('五')) form.grade = '5'
  else if (gc.includes('六')) form.grade = '6'
  const classMatch = gc.match(/(\d{1,2})班/)
  form.classNo = classMatch ? classMatch[1] : ''
      form.school = newVal.school || ''
      form.parentName = newVal.parentName || ''
      form.phone = newVal.phone || ''
      form.relation = newVal.relation || ''
      form.avatar = newVal.avatar || ''
    }
  },
  {immediate: true} // immediate: true 可以在组件初始化时就执行一次
)

const rules = reactive<FormRules>({
  studentName: [{ required: true, message: '请输入学生姓名', trigger: 'blur' }],
  birth: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  school: [{ required: true, message: '请输入学校', trigger: 'blur' }],
  grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
  classNo: [
    { required: true, message: '请输入班级号', trigger: 'blur' },
    { pattern: /^\d{1,2}$/, message: '班级号为1-2位数字', trigger: 'blur' }
  ],
  parentName: [{ required: true, message: '请输入家长姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^(1\d{10}|[0-9\-\s]{7,20})$/, message: '手机号11位或7-20位数字/空格/横线', trigger: 'blur' }
  ],
  relation: [{ required: true, message: '请选择关系', trigger: 'change' }],
  // avatar 校验在提交时根据是否编辑/新增动态控制
})

// Handlers
const handleClose = () => {
  formRef.value?.resetFields()
  // 重置表单的每个字段
  form.studentName = ''
  form.birth = ''
  form.gender = ''
  form.school = ''
  form.grade = ''
  form.classNo = ''
  form.parentName = ''
  form.phone = ''
  form.relation = ''
  form.avatar = ''
  emit('update:modelValue', false)
}

const handleSave = async () => {
  if (!formRef.value) return
  await formRef.value.validate(valid => {
    if (valid) {
      // 将表单数据返回给父组件，便于写入 Pinia 或发请求
      // 动态校验头像：新增必填(Edit无student时)，编辑可不改
      if (!props.student && !form.avatar) {
        // 新增必须有头像
        ElMessage.warning('请上传学生头像')
        return
      }
      const payload = {
        // account 不再从弹窗填写，新增时由父组件生成，编辑时保留原值
        studentName: form.studentName,
        gender: form.gender,
        birth: form.birth, // YYYY-MM
        gradeClass: form.grade && form.classNo ? `小学${['零','一','二','三','四','五','六'][Number(form.grade)]}年级 ${Number(form.classNo)}班` : '',
        school: form.school,
        parentName: form.parentName,
        phone: form.phone,
        relation: form.relation,
        avatar: form.avatar
      }
      emit('saveSuccess', payload)
      handleClose() // Close dialog after successful save
    } else {
      console.log('表单校验失败!')
    }
  })
}

// 头像选择：生成本地预览 URL 存入表单（后端接入时可改为直传并返回 URL）
const onAvatarChange = (file: any) => {
  const raw: File | undefined = file?.raw
  if (!raw) return
  if (!raw.type?.startsWith('image/')) return
  const url = URL.createObjectURL(raw)
  form.avatar = url
}
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 18px;
  padding: 10px 15px 15px 15px; /* 控制文字位置：上、右、下、左 */
  border-bottom: 1.21px solid #e0e6ed;
}
.student-form :deep(.el-input),
.student-form :deep(.el-select),
.student-form :deep(.el-date-editor) {
  width: 100%;
}
.grade-class-row { display: flex; gap: 10px; }
.grade-select { width: 160px; }
.class-input { width: 120px; }
.avatar-uploader {
  width: 104px;
  height: 104px;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8c99ab;
}
.avatar-uploader:hover { border-color: #409eff; }
.avatar-uploader-icon { font-size: 28px; color: #8c99ab; }
.avatar { width: 104px; height: 104px; border-radius: 6px; object-fit: cover; }
</style>
