<template>
  <div class="file-preview">
    <template v-if="isImage">
      <img :src="src" :alt="name" class="img" />
    </template>
    <template v-else-if="isVideo">
      <video :src="src" controls class="video">
        您的浏览器不支持视频播放。
      </video>
    </template>
    <template v-else-if="isAudio">
      <div class="audio-container">
        <div class="audio-info">
          <el-icon class="audio-icon"><VideoPlay /></el-icon>
          <span class="name">{{ name }}</span>
        </div>
        <audio :src="src" controls class="audio">
          您的浏览器不支持音频播放。
        </audio>
      </div>
    </template>
    <template v-else-if="isPdf">
      <iframe class="pdf" :src="src" />
    </template>
    <template v-else-if="isText">
      <div class="text-preview" v-loading="textLoading">
        <div class="text-header">
          <el-icon><Document /></el-icon>
          <span class="name">{{ name }}</span>
        </div>
        <pre v-if="textContent" class="text-content" :class="getTextClass()">{{ textContent }}</pre>
        <div v-else class="text-error">无法预览此文件内容</div>
      </div>
    </template>
    <template v-else-if="isOffice">
      <div class="office-preview">
        <div class="office-info">
          <el-icon class="office-icon"><Folder /></el-icon>
          <span class="name">{{ name }}</span>
          <span class="office-type">{{ getOfficeType() }}</span>
        </div>
        <div class="office-actions">
          <el-button type="primary" @click="openInNewTab">在新窗口打开</el-button>
          <el-button @click="downloadFile">下载文件</el-button>
        </div>
        <div class="office-note">
          提示：Office 文档需要相应的应用程序来打开和编辑
        </div>
      </div>
    </template>
    <template v-else>
      <div class="other">
        <el-icon><Document /></el-icon>
        <span class="name">{{ name }}</span>
        <span class="file-type">{{ getFileExtension() }}</span>
        <a :href="src" target="_blank" rel="noopener">在新窗口打开</a>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {Document, VideoPlay, Folder} from '@element-plus/icons-vue'

const props = defineProps<{
  file: {name: string; url?: string; type?: string}
}>()

const src = computed(() => props.file.url || '')
const mime = computed(() => (props.file.type || '').toLowerCase())
const name = computed(() => props.file.name)
const textContent = ref('')
const textLoading = ref(false)

// 获取文件扩展名
const getFileExtension = () => {
  const filename = name.value
  const lastDot = filename.lastIndexOf('.')
  return lastDot > 0 ? filename.substring(lastDot + 1).toUpperCase() : ''
}

// 图片格式检测
const isImage = computed(() => {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp']
  return imageTypes.includes(mime.value) || /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(name.value)
})

// 视频格式检测
const isVideo = computed(() => {
  const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/wmv']
  return videoTypes.includes(mime.value) || /\.(mp4|webm|ogg|avi|mov|wmv|m4v|3gp)$/i.test(name.value)
})

// 音频格式检测
const isAudio = computed(() => {
  const audioTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac', 'audio/flac']
  return audioTypes.includes(mime.value) || /\.(mp3|wav|ogg|m4a|aac|flac|wma)$/i.test(name.value)
})

// PDF格式检测
const isPdf = computed(() => {
  return mime.value === 'application/pdf' || /\.pdf$/i.test(name.value)
})

// 文本格式检测
const isText = computed(() => {
  const textTypes = [
    'text/plain', 'text/html', 'text/css', 'text/javascript', 'text/xml', 'text/csv',
    'application/json', 'application/xml', 'application/javascript'
  ]
  const textExtensions = /\.(txt|md|json|xml|html|css|js|ts|vue|jsx|tsx|py|java|cpp|c|h|php|rb|go|rs|swift|kotlin|dart|yaml|yml|ini|conf|cfg|log|sql|sh|bat|ps1)$/i
  return textTypes.includes(mime.value) || textExtensions.test(name.value)
})

// Office文档格式检测
const isOffice = computed(() => {
  const officeTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
  const officeExtensions = /\.(doc|docx|xls|xlsx|ppt|pptx)$/i
  return officeTypes.includes(mime.value) || officeExtensions.test(name.value)
})

// 获取Office文档类型
const getOfficeType = () => {
  if (/\.(doc|docx)$/i.test(name.value)) return 'Word 文档'
  if (/\.(xls|xlsx)$/i.test(name.value)) return 'Excel 表格'
  if (/\.(ppt|pptx)$/i.test(name.value)) return 'PowerPoint 演示文稿'
  return 'Office 文档'
}

// 获取文本类型的CSS类
const getTextClass = () => {
  const ext = getFileExtension().toLowerCase()
  const languageMap: Record<string, string> = {
    'js': 'language-javascript',
    'ts': 'language-typescript',
    'vue': 'language-vue',
    'html': 'language-html',
    'css': 'language-css',
    'json': 'language-json',
    'xml': 'language-xml',
    'py': 'language-python',
    'java': 'language-java',
    'cpp': 'language-cpp',
    'c': 'language-c',
    'php': 'language-php',
    'rb': 'language-ruby',
    'go': 'language-go',
    'rs': 'language-rust',
    'swift': 'language-swift',
    'kt': 'language-kotlin'
  }
  return languageMap[ext] || 'language-text'
}

// 加载文本内容
const loadTextContent = async () => {
  if (!isText.value || !src.value) return
  
  textLoading.value = true
  try {
    const response = await fetch(src.value)
    if (response.ok) {
      let content = await response.text()
      // 限制文本长度，避免显示过长的内容
      if (content.length > 10000) {
        content = content.substring(0, 10000) + '\n\n... (内容已截断，完整内容请下载文件查看)'
      }
      textContent.value = content
    } else {
      textContent.value = '无法加载文件内容'
    }
  } catch {
    textContent.value = '加载文件内容时出错'
  } finally {
    textLoading.value = false
  }
}

// 在新窗口打开
const openInNewTab = () => {
  if (src.value) {
    window.open(src.value, '_blank', 'noopener,noreferrer')
  }
}

// 下载文件
const downloadFile = () => {
  if (src.value) {
    const link = document.createElement('a')
    link.href = src.value
    link.download = name.value
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// 监听文件变化，加载文本内容
watch(() => props.file, () => {
  if (isText.value) {
    loadTextContent()
  }
}, { immediate: true })
</script>

<style scoped>
.file-preview {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

/* 图片样式 */
.img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 视频样式 */
.video {
  width: 100%;
  max-height: 60vh;
  border-radius: 8px;
  background: #000;
}

/* 音频样式 */
.audio-container {
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.audio-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.audio-icon {
  color: #3b82f6;
  font-size: 20px;
}

.audio {
  width: 100%;
  border-radius: 4px;
}

/* PDF样式 */
.pdf {
  width: 100%;
  height: 60vh;
  border: none;
  border-radius: 8px;
}

/* 文本预览样式 */
.text-preview {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
}

.text-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
}

.text-content {
  padding: 16px;
  margin: 0;
  background: #fafafa;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.text-error {
  padding: 16px;
  color: #ef4444;
  text-align: center;
}

/* 语法高亮类 */
.language-json { color: #0969da; }
.language-javascript { color: #d73a49; }
.language-typescript { color: #0550ae; }
.language-html { color: #e36209; }
.language-css { color: #6f42c1; }
.language-python { color: #0969da; }

/* Office文档样式 */
.office-preview {
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.office-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.office-icon {
  color: #3b82f6;
  font-size: 24px;
}

.office-type {
  color: #6b7280;
  font-size: 14px;
  padding: 2px 8px;
  background: #e5e7eb;
  border-radius: 12px;
}

.office-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 12px;
}

.office-note {
  color: #6b7280;
  font-size: 12px;
  font-style: italic;
}

/* 其他文件样式 */
.other {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.name {
  color: #374151;
  font-weight: 500;
  flex: 1;
}

.file-type {
  color: #6b7280;
  font-size: 12px;
  padding: 2px 6px;
  background: #e5e7eb;
  border-radius: 4px;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video {
    max-height: 40vh;
  }
  
  .pdf {
    height: 40vh;
  }
  
  .text-content {
    font-size: 12px;
    max-height: 300px;
  }
  
  .office-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .other {
    flex-wrap: wrap;
  }
}
</style>
