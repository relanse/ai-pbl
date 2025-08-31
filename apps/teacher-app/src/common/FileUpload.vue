<template>
  <el-upload
    class="file-uploader"
    drag
    multiple
    :limit="5"
    :on-exceed="handleExceed"
  >
    <MyIcon name="upload" class="custom-upload-icon" />
    <div class="el-upload__text">
      将文件拖到此区域，或<em>点击上传</em>
      <div class="el-upload__tip">
        最多可上传5个附件，每个附件大小不能超过3M
      </div>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import {ElMessage, ElUpload} from 'element-plus'
import type {UploadProps} from 'element-plus'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
      files.length + uploadFiles.length
    } 个文件`
  )
}
</script>

<style scoped>
.file-uploader :deep(.el-upload-dragger) {
  /* 确保虚线框显示 */
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  padding: 40px 20px;
  background-color: #fafafa;
  transition: border-color 0.3s;
  height: 200px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.file-uploader :deep(.el-upload-dragger:hover) {
  border-color: var(--el-color-primary);
}

/* 为你的自定义图标设置样式 */
.custom-upload-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 1px; /* 图标和文字之间的间距 */
}

.el-upload__text {
  color: #606266;
  font-size: 14px;
}

.el-upload__text em {
  color: var(--el-color-primary);
  font-style: normal;
}

.el-upload__tip {
  text-align: center;
  margin-top: 1px;
  color: #909399;
  font-size: 12px;
}
</style>
