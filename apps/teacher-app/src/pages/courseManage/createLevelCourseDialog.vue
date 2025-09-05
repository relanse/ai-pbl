<template>
  <el-dialog
    :model-value="visible"
    width="648px"
    @update:model-value="$emit('update:visible', $event)"
    @close="resetForm"
    ><!-- 1. 添加关闭时重置表单的事件 -->
    <template #header>
      <div class="title">
        <span>新建等级课程</span>
      </div>
    </template>
    <el-form :model="form" label-width="auto">
      <el-form-item label="等级课程名称" required>
        <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item label="等级课程描述" required>
        <el-input
          type="textarea"
          v-model="form.description"
          placeholder="请输入课程描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="等级课程封面" required>
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
      <el-form-item label="是否解锁" required>
        <el-radio-group v-model="isLock">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {
  ElDialog,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElUpload,
  ElIcon
} from 'element-plus'
import {UploadFilled} from '@element-plus/icons-vue'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible', 'confirm'])

const form = reactive({
  name: '',
  description: ''
})
const isLock = ref(false)
const ChooseWhereImageFrom = ref('ai')
// 2. 确认时只发送数据，不再关闭自己
const handleConfirm = () => {
  // 可以在这里添加表单校验
  if (!form.name) {
    // ElMessage.warning('请输入课程名称');
    return
  }
  emit('confirm', {...form}) // 发送表单数据的副本
}

// 3. 新增一个方法，用于在弹窗关闭时清空输入内容
const resetForm = () => {
  form.name = ''
}
const generateImage = () => {
  // 模拟生成AI图片的逻辑
  console.log('生成AI图片')
  // 在这里可以调用API或其他逻辑来生成图片
}
</script>

<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  border-bottom: 2px solid #eee;
}
.dialog-footer {
  text-align: right;
}
.el-textarea :deep(.el-textarea__inner) {
  /* 设置最小高度和宽度 */
  min-height: 32px !important;

  /* 设置最大高度和宽度 */
  max-height: 200px !important;
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
  left: 35%;
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
  height: 100%;
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
