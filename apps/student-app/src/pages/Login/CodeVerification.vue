<template>
  <loginFormTemplate>
    <div class="container">
      <div class="title">
        <h2>手机号验证</h2>
      </div>
      <div class="form">
        <el-form v-model="form">
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
              v-model="form.verificationCode"
              placeholder="请输入验证码"
              size="large"
              icon="solidLock"
            >
              <template #suffix>
                <div
                  class="get-code-button"
                  :class="{disabled: countdown > 0}"
                  @click="getCode"
                >
                  {{ buttonText }}
                </div>
              </template>
            </MyInput>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-btn">
        <MyButton style="width: 400px" @click="handleToRest">确认</MyButton>
      </div>
    </div>
  </loginFormTemplate>
</template>
<script setup lang="ts">
import loginFormTemplate from '@/components/LoginFormTemplate.vue'
import {computed, ref} from 'vue'
import {ElForm, ElFormItem} from 'element-plus'
import MyInput from '@/components/common/MyInput.vue'
import MyButton from '@/components/common/MyButton.vue'
import router from '@/router/index'
const form = ref({
  telephone: '',
  verificationCode: ''
})
const countdown = ref(0)
const buttonText = computed(() => {
  return countdown.value > 0 ? `${countdown.value}s` : '获取验证码'
})
const getCode = () => {
  if (countdown.value > 0) return

  // 发送验证码逻辑
  console.log('发送验证码')

  // 开始倒计时
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
const handleToRest = () => {
  router.push('/password-find/rest')
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
  width: 400px;
}
/* 获取验证码按钮样式 */
.get-code-button {
  font-size: 16px;
  font-weight: 500;
  color: #1664ff;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}
.get-code-button.disabled {
  color: #999;
  cursor: not-allowed;
}
.get-code-button::before {
  content: '';
  transform: translateX(-1000%);
  height: 30px; /* 分隔线高度 */
  width: 1px; /* 分隔线宽度 */
  background-color: #95c3f6; /* 分隔线颜色 */
}
.form-btn {
  margin-top: 40px;
}
</style>
