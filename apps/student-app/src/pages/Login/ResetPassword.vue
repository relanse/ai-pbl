<template>
  <loginFormTemplate>
    <div class="container">
      <div class="title">
        <h2>重置密码</h2>
      </div>
      <div class="form">
        <el-form v-model="form">
          <el-form-item>
            <MyInput
              class="form-input"
              v-model="form.telephone"
              placeholder="请输入密码"
              size="large"
              type="password"
              icon="lock"
            >
            </MyInput>
          </el-form-item>
          <el-form-item>
            <MyInput
              class="form-input"
              v-model="form.password"
              placeholder="请重新输入密码"
              size="large"
              type="password"
              icon="unlock"
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
const form = ref({
  telephone: '',
  password: ''
})
const handleRestForm = () => {
  router.push('/login')
}
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
  margin-top: 40px;
}
</style>
