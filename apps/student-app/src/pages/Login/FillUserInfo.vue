<template>
  <loginFormTemplate>
    <div class="container">
      <div class="title">
        <h2>填写个人信息</h2>
      </div>
      <div class="form">
        <el-form v-model="form">
          <el-form-item>
            <MyInput
              class="form-input"
              v-model="form.name"
              placeholder="请输入姓名"
              size="large"
              type="password"
              icon="lock"
            >
            </MyInput>
          </el-form-item>
          <el-form-item>
            <MyInput
              class="form-input"
              v-model="form.age"
              placeholder="请输入年龄"
              size="large"
              type="text"
              icon="age"
            >
            </MyInput>
          </el-form-item>
          <el-form-item>
            <MySelect
              v-model="form.gender"
              :options="genderOpt"
              placeholder="请选择性别"
              size="large"
              icon="gender"
            >
            </MySelect>
          </el-form-item>

          <el-form-item>
            <MySelect
              v-model="form.grade"
              :options="gradeOpt"
              placeholder="请选择年级"
              size="large"
              icon="grade"
            >
            </MySelect>
          </el-form-item>
          <el-form-item>
            <MyInput
              class="form-input"
              v-model="form.telephone"
              placeholder="请输入手机号码"
              size="large"
              icon="telephone"
            >
            </MyInput>
          </el-form-item>
          <el-form-item>
            <MyInput
              class="form-input"
              v-model="form.school"
              placeholder="请输入学校"
              size="large"
              icon="school"
            >
            </MyInput>
          </el-form-item>
          <el-form-item>
            <MyInput
              class="form-input"
              v-model="form.parent"
              placeholder="请输入家长姓名"
              size="large"
              icon="parent"
            >
            </MyInput>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-btn">
        <MyButton style="width: 400px" @click="handleRestForm">确认</MyButton>
      </div>
    </div>
  </loginFormTemplate>
</template>
<script setup lang="ts">
import loginFormTemplate from '@/components/LoginFormTemplate.vue'
import {ref} from 'vue'
import router from '@/router/index'
import {ElForm, ElFormItem} from 'element-plus'
import MyInput from '@/components/common/MyInput.vue'
import MyButton from '@/components/common/MyButton.vue'
import MySelect from '@/components/common/MySelect.vue'
import {UserInfoType, Grade} from '@/types/user'
const form = ref<Partial<UserInfoType>>({
  name: '',
  age: undefined,
  gender: undefined,
  telephone: undefined,
  grade: undefined,
  school: '',
  parent: ''
})
const handleRestForm = () => {
  router.push('/login')
}
const genderOpt = [
  {
    value: '男',
    label: '男'
  },
  {
    value: '女',
    label: '女'
  }
]
const gradeOpt = [
  {
    value: Grade.Grade1,
    label: '一年级'
  },
  {
    value: Grade.Grade2,
    label: '二年级'
  },
  {
    value: Grade.Grade3,
    label: '三年级'
  },
  {
    value: Grade.Grade4,
    label: '四年级'
  },
  {
    value: Grade.Grade5,
    label: '五年级'
  },
  {
    value: Grade.Grade6,
    label: '六年级'
  }
]
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
}
.title {
  font-family: Microsoft YaHei;
  font-weight: 700;
  font-style: Bold;
  font-size: 14px;
}
.form {
  width: 100%;
  width: 400px;
}
.form-btn {
  margin-top: -10px;
}
</style>
