<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="user-aside">
          <el-button round :icon="ArrowLeftBold" size="large"> 返回</el-button>
        </div>
      </el-aside>
      <el-main class="user-wrapped">
        <img class="waveLeft" src="@/assets/waveLeft.png" />
        <img class="waveRight" src="@/assets/waveRight.png" />
        <div class="user-header">
          <h2>个人中心</h2>
          <div class="user-container">
            <el-avatar
              class="user-img"
              :src="useUserStore().userState.avatarUrl || DefaultAvatar"
              :size="90"
            />
            <div class="user-info">
              <span style="font-size: 20px; font-weight: 700">
                {{ useUserStore().userState.username || '用户' }}
              </span>
              <span style="font-size: 16px">
                账号:{{ useUserStore().userState.userid || 'hsksjsjhggg' }}
              </span>
            </div>

            <el-button
              class="edit-btn"
              v-if="!isEditing"
              @click="startEditing"
              round
              :icon="EditPen"
              size="large"
            >
              编辑
            </el-button>
          </div>
        </div>

        <div class="user-main">
          <el-form :model="form">
            <el-row>
              <el-form-item>
                <MyInput
                  class="form-input"
                  v-model="form.name"
                  size="large"
                  placeholder="姓名"
                  icon="user"
                  :disabled="!isEditing"
                />
              </el-form-item>
              <el-form-item>
                <MyInput
                  class="form-input"
                  v-model="form.telephone"
                  placeholder="电话号码"
                  size="large"
                  icon="telephone"
                  :disabled="!isEditing"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <MyInput
                  class="form-input"
                  v-model="form.age"
                  placeholder="年龄"
                  size="large"
                  icon="age"
                  :disabled="!isEditing"
                >
                  <template #suffix>
                    <span class="unit">岁</span>
                  </template>
                </MyInput>
              </el-form-item>
              <el-form-item>
                <MyInput
                  class="form-input"
                  v-model="form.school"
                  size="large"
                  placeholder="学校"
                  icon="school"
                  :disabled="!isEditing"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <MySelect
                  class="form-select"
                  v-model="form.gender"
                  size="large"
                  placeholder="性别"
                  icon="gender"
                  :disabled="!isEditing"
                >
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </MySelect>
              </el-form-item>
              <el-form-item>
                <MyInput
                  class="form-input"
                  v-model="form.parent"
                  placeholder="家长"
                  size="large"
                  icon="parent"
                  :disabled="!isEditing"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <MySelect
                  class="form-select"
                  v-model="form.grade"
                  size="large"
                  placeholder="年级"
                  icon="grade"
                  :disabled="!isEditing"
                >
                  <el-option
                    v-for="item in userGrade"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </MySelect>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div v-if="isEditing" class="bottom-btn">
          <MyButton
            @click="cancelEditing"
            color="transparent"
            icon="blueRadius"
            style="color: #6598fe; border: 2px solid #63a2fd"
            >取消</MyButton
          >
          <MyButton @click="saveChanges">保存</MyButton>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {
  ElContainer,
  ElAside,
  ElMain,
  ElButton,
  ElAvatar,
  ElForm,
  ElFormItem,
  ElRow,
  ElOption
} from 'element-plus'
import {ArrowLeftBold, EditPen} from '@element-plus/icons-vue'
import {useUserStore} from '@/stores/user'
import DefaultAvatar from '@aipbl/common/assets/DefaultAvatar.png'
import MyButton from '@/components/common/MyButton.vue'
import MyInput from '@/components/common/MyInput.vue'
import MySelect from '@/components/common/MySelect.vue'
import {Grade, type UserInfoType} from '@/types/user'
import {ref} from 'vue'
const isEditing = ref(false)
const form = ref<UserInfoType>({
  name: '张明',
  age: 20,
  gender: '女',
  grade: Grade.Grade3,
  telephone: 1354689921,
  school: '逸夫中学',
  parent: '李四'
})
const originalForm = ref<UserInfoType>({...form.value})
const startEditing = () => {
  //备份原始数据
  originalForm.value = {...form.value}
  isEditing.value = true
}
const cancelEditing = () => {
  // 恢复原始数据
  form.value = {...originalForm.value}
  isEditing.value = false
}
const saveChanges = () => {
  console.log('保存用户信息:', form.value)
  originalForm.value = {...form.value}
  isEditing.value = false
}
const userGrade = [
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
.user-aside .el-button {
  font-size: 16px;
  color: #026bff;
  border: #6696ff solid 0.5px;
}
.user-wrapped {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  max-height: 650px;
  margin: 0 1%;
  width: 90vh; /* 在小屏幕上留出边距 */
  height: 90vh; /* 高度不超过视口的90% */
  overflow: hidden;
  border-radius: 24px; /* 四角圆角 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  background: linear-gradient(
    180deg,
    #649ffe 0% 30%,
    #ffffff 30% 80%,
    #e7f0ff 100%
  );
}
.user-wrapped::after {
  content: '';
  position: absolute;
  width: 100%;
  top: 85%; /* 位于容器80%高度处 */
  left: 0;
  height: 1px; /* 线的厚度 */
  background-color: #e0e0e0; /* 浅灰色分割线 */
  z-index: 1; /* 确保线在内容之上 */
}
.waveLeft {
  position: absolute;
  top: 120px;
  width: 100%;
  left: 0;
}
.waveRight {
  position: absolute;
  top: 90px;
  width: 100%;
  right: -100px;
}
.user-header {
  color: white;
}
.user-header h2 {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.user-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  gap: 20px;
}
.user-img {
  z-index: 3;
  border: 2px solid #87b9ff;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.edit-btn {
  color: #649ffe;
  width: 140px;
  height: 45px;
  font-size: 18px;
  margin-left: auto;
  margin-right: 10px;
  border: 1px solid;
  z-index: 3;
}
.user-main {
  margin: 50px auto;
}
.user-main .el-form-item {
  width: 300px;
  padding: 0 15px;
}

.form-input,
.form-select {
  width: 100%;
}
.bottom-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: auto;
}
:deep(.el-input.is-disabled),
:deep(.el-input.is-disabled .el-input__inner),
:deep(.el-input.is-disabled .el-input__wrapper),
:deep(.el-select__wrapper.is-disabled) {
  cursor: default !important;
  color: #026bff !important;
}

:deep(.el-input.is-disabled .el-input__wrapper),
:deep(.el-select__wrapper.is-disabled) {
  background-color: #f0f6ff;
}
:deep(.el-input.is-disabled .el-input__inner),
:deep(.el-select__wrapper.is-disabled) {
  -webkit-text-fill-color: #333333;
}
</style>
