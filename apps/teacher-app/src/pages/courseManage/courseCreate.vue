<template>
  <div class="course-create-container">
    <el-card shadow="never" class="class-message">
      <template #header>
        <div class="card-header">
          <span>课程信息</span>
        </div>
      </template>
      <el-form :model="form" label-width="100px" label-position="right">
        <el-form-item label="所属等级" required>
          <el-button type="primary" @click="levelDialogVisible = true">
            {{ form.levelName || '选择等级课程' }}
          </el-button>
        </el-form-item>
        <el-form-item label="课程名称" required>
          <el-input v-model="form.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="课程描述" required>
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入课程描述"
          />
        </el-form-item>
        <el-form-item label="课程封面" required>
          <el-radio-group v-model="ChooseWhereImageFrom">
            <el-radio label="ai" szie="large">AI生图</el-radio>
            <el-radio label="upload" szie="large">上传文件</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" " v-if="ChooseWhereImageFrom === 'ai'">
          <div class="ai-image-container">
            <div class="image-placeholder">
              <span>AI生成的插图</span>
            </div>
            <el-button
              type="primary"
              class="generate-image-btn"
              @click="generateImage"
            >
              重新生成
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label=" " v-else>
          <el-upload
            action="#"
            class="image-upload"
            :show-file-list="false"
            :drag="true"
          >
            <el-icon :size="50"><UploadFilled /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  ElForm,
  ElCard,
  ElInput,
  ElButton,
  ElFormItem,
  ElRadio,
  ElRadioGroup,
  ElUpload,
  ElIcon
} from 'element-plus'
import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {UploadFilled} from '@element-plus/icons-vue'
const router = useRouter()
const levelDialogVisible = ref(false)
const ChooseWhereImageFrom = ref('ai')
const form = reactive({
  levelId: '',
  levelName: '',
  name: '',
  description: '',
  coverUrl: '' // 存储封面图片的URL
})

const confirmLevelSelection = () => {
  // 在这里处理选择了某个等级后的逻辑
  form.levelId = 'L1-mock-id'
  form.levelName = 'L1 基础认知: AI入门'
  levelDialogVisible.value = false
}

const generateImage = () => {
  // 模拟生成AI图片的逻辑
  console.log('生成AI图片')
  // 在这里可以调用API或其他逻辑来生成图片
}
</script>

<style scoped>
.create-course-container {
  padding: 20px;
}
.class-message {
  max-width: 60%;
  margin: 0;
}
.class-message .card-header {
  font-size: 18px;
  font-weight: bold;
}
.image-upload {
  width: 50%;
}
.image-upload :deep(.el-upload-dragger) {
  height: 200px;
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-textarea :deep(.el-textarea__inner) {
  /* 设置最小高度和宽度 */
  min-height: 48px !important;

  /* 设置最大高度和宽度 */
  max-height: 200px !important;
}
</style>
