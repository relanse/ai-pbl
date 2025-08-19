<template>
  <div class="page-container">
    <div class="course-create-container">
      <el-card shadow="never" class="custom_card">
        <template #header>
          <div class="card-header">
            <span>课程信息</span>
          </div>
        </template>
        <el-form :model="form" label-width="100px" label-position="right">
          <el-form-item label="所属等级" required>
            <el-button
              type="primary"
              @click="levelDialogVisible = true"
              class="level-button"
            >
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
      <el-card shadow="never" class="custom_card">
        <template #header>
          <div class="card-header">
            <span>课程内容</span>
          </div>
        </template>
        <el-form :model="form" label-width="100px" label-position="right">
          <el-form-item label="课程类型" required>
            <el-radio-group v-model="form.type">
              <el-radio label="video">录播</el-radio>
              <el-radio label="stream">直播</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="视频文件" v-if="form.type === 'video'" required>
            <el-upload
              action="#"
              class="file-upload"
              :show-file-list="false"
              :drag="true"
            >
              <el-icon :size="50"><UploadFilled /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="腾讯会议"
            v-else-if="form.type === 'stream'"
            required
          >
            <el-input
              v-model="form.streamUrl"
              placeholder="请输入腾讯会议链接"
            />
          </el-form-item>
          <el-form-item label="配套项目" required>
            <el-select v-model="form.xiangmuId" placeholder="请选择项目名称" />
          </el-form-item>
          <el-form-item label="课程小结" required>
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="3"
              placeholder="请输入课程小结"
            />
          </el-form-item>
          <el-form-item label="课件上传" required>
            <el-upload
              action="#"
              class="file-upload"
              :show-file-list="false"
              :drag="true"
            >
              <el-icon :size="50"><UploadFilled /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="btn-container">
        <el-button type="default" @click="$router.back()">取消</el-button>
        <el-button type="primary">保存并发布</el-button>
      </div>
    </div>
    <div class="progress-container">
      <el-card shadow="never" class="progress-card">
        <template #header>
          <div class="progress-header">
            <span>课程序列</span>
          </div>
        </template>
      </el-card>
    </div>
  </div>
  <levelDialog
    v-model:visible="levelDialogVisible"
    :initial-selected-id="form.levelId"
    @confirm="handleLevelConfirm"
  />
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
  ElIcon,
  ElSelect
} from 'element-plus'
import {ref, reactive, onMounted, onUnmounted} from 'vue'
import {UploadFilled} from '@element-plus/icons-vue'
import levelDialog from './common/levelDialog.vue'

const ChooseWhereImageFrom = ref('ai')
const levelDialogVisible = ref(false)

// 4. 定义步骤条所需的数据
const courseSteps = ref([
  {title: '步骤一：课程信息'},
  {title: '步骤二：课程内容'}
])
const activeStep = ref(1) // 当前高亮的步骤

const form = reactive({
  levelId: '',
  levelName: '',
  xiangmuId: '',
  name: '',
  type: 'video', // 默认录播
  streamUrl: '', // 直播视频的URL
  description: '',
  coverUrl: '' // 存储封面图片的URL
})

// 5. 添加滚动监听逻辑
let observer: IntersectionObserver
onMounted(() => {
  const options = {
    root: null,
    threshold: 0.5
  }

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'info-section') {
          activeStep.value = 1
        } else if (entry.target.id === 'content-section') {
          activeStep.value = 2
        }
      }
    })
  }, options)
})
// 6. 组件销毁时停止监听
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
const handleLevelConfirm = (level: {
  id: string
  title: string
  subtitle: string
}) => {
  form.levelId = level.id
  form.levelName = `${level.title}: ${level.subtitle}`
  levelDialogVisible.value = false
}

const generateImage = () => {
  // 模拟生成AI图片的逻辑
  console.log('生成AI图片')
  // 在这里可以调用API或其他逻辑来生成图片
}
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: space-between;
}
.course-create-container {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.btn-container {
  /* 让按钮容器也撑满父容器宽度，这样才有空间进行内部居中 */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.progress-container {
  width: 25%;
  position: sticky; /* 让侧边栏滚动时固定 */
  top: 20px; /* 距离顶部20px */
}
.progress-card {
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  border-radius: 12px;
  border: 2px solid #d2dce7;
}

.progress-card :deep(.el-card__header) {
  border-bottom: 2px solid #d2dce7;
}
.progress-header {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.custom_card {
  max-width: 100%;
  margin: 0;
  border-radius: 12px;
  border: 2px solid #d2dce7;
}
.custom_card :deep(.el-card__header) {
  border-bottom: none;
}
.custom_card .card-header {
  font-size: 18px;
  font-weight: bold;
}
.custom_card .level-button {
  width: 15%;
  text-align: center;
  justify-content: center;
}
.ai-image-container {
  width: 50%;
  position: relative;
}
.ai-image-container .image-placeholder {
  width: 100%;
  height: 200px;
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ai-image-container .generate-image-btn {
  position: absolute;
  bottom: 15%;
  left: 37.5%;
}
.image-upload {
  width: 50%;
}
.image-upload :deep(.el-upload-dragger) {
  width: 100%;
  height: 200px;
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-upload {
  width: 50%;
}
.file-upload :deep(.el-upload-dragger) {
  width: 100%;
  height: 200px;
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-textarea :deep(.el-textarea__inner) {
  /* 设置最小高度和宽度 */
  min-height: 32px !important;

  /* 设置最大高度和宽度 */
  max-height: 200px !important;
}
</style>
