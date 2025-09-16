<template>
  <div class="course-detail-wrapper">
    <div class="page-content-container">
      <div class="top-area">
        <BackButton />
      </div>

      <div v-if="loadingError" class="error-message">
        <p>{{ loadingError }}</p>
      </div>

      <template v-else>
        <div class="video-section-background">
          <div class="main-content-wrapper">
            <div class="video-container">
              <div class="video-title">
                <MyIcon name="whiteRadius" class="my-button-radius"></MyIcon>
                <div class="video-title-text">
                  {{ courseInfo?.name || '课程标题' }}
                </div>
              </div>
              <video controls width="100%" height="100%">
                <source src="" type="video/mp4" />
              </video>
            </div>
            <div class="course-intro">
              <div class="intro-content">
                <h2>
                  <span class="intro-title">课程简介:</span>
                  <span class="intro-desc">{{ courseInfo?.desc }}</span>
                </h2>
              </div>
              <MyButton
                style="height: 52px; border-radius: 21.06px"
                @click="goToExercise"
                >继续学习</MyButton
              >
            </div>
          </div>
        </div>

        <div class="bottom-content-wrapper">
          <div class="bottom-area">
            <div class="left-section">
              <h2 class="section-title">
                <MyIcon name="book" :width="42" />
                知识要点
              </h2>
              <ul class="knowledge-points">
                <li
                  v-for="(point, index) in keyPoints"
                  :key="index"
                  class="knowledge-point-item"
                >
                  <h3>要点{{ index + 1 }}</h3>
                  <p>{{ point }}</p>
                </li>
              </ul>
            </div>
            <div class="right-section">
              <h2 class="section-title">
                <MyIcon name="bookshelf" :width="42" />
                课程资料
              </h2>
              <div
                v-for="(file, index) in fileList"
                :key="index"
                class="file-item"
              >
                <div class="file-info">
                  <div class="file-icon" :class="file.type">
                    {{ file.type.toUpperCase() }}
                  </div>
                  <div class="file-details">
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-size">{{ file.size }}</span>
                  </div>
                </div>
                <div class="file-actions">
                  <button class="action-btn preview" @click="openPreview(file)">
                    预览
                  </button>
                  <button class="action-btn download">下载</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 文件预览弹窗 -->
    <div
      v-if="previewVisible"
      class="preview-modal-overlay"
      @click="closePreview"
    >
      <div class="preview-modal-content" @click.stop>
        <div class="preview-header">
          <h3>{{ fileToPreview?.name }}</h3>
          <button @click="closePreview" class="close-btn">&times;</button>
        </div>
        <div class="preview-body">
          <div v-if="previewError" class="preview-error-message">
            {{ previewError }}
          </div>
          <template v-else-if="fileToPreview">
            <!-- 图片预览 -->
            <img
              v-if="
                ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(
                  fileToPreview.type
                )
              "
              :src="fileToPreview.url"
              :alt="fileToPreview.name"
              class="preview-image"
            />
            <!-- PDF 预览 -->
            <div
              v-else-if="fileToPreview.type === 'pdf'"
              class="pdf-preview-container"
            >
              <div v-if="previewError" class="preview-error-message">
                {{ previewError }}
                <br /><small>URL: {{ fileToPreview.url }}</small>
              </div>
              <!-- 使用iframe作为主要预览方式 -->
              <iframe
                v-else
                :src="fileToPreview.url + '#toolbar=1&navpanes=0&scrollbar=1'"
                class="preview-pdf-iframe"
                frameborder="0"
                @load="previewError = null"
                @error="previewError = 'PDF加载失败，请检查文件路径'"
              >
                您的浏览器不支持PDF预览，请
                <a
                  :href="fileToPreview.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  >点击这里下载</a
                >
              </iframe>

              <!-- 备用：vue-pdf-embed（如果iframe不工作） -->
              <!-- 
              <vue-pdf-embed
                :source="fileToPreview.url"
                class="preview-pdf"
                @loading-failed="(error) => { previewError = 'PDF加载失败: ' + error.message }"
                @loaded="() => { previewError = null }"
              />
              -->
            </div>
            <!-- 文本预览 -->
            <pre
              v-else-if="fileToPreview.type === 'txt'"
              class="preview-text"
              >{{ textContent || '加载中...' }}</pre
            >
            <!-- 不支持的格式 -->
            <div v-else class="unsupported-preview">
              <p>不支持预览 .{{ fileToPreview.type }} 类型的文件。</p>
              <p>您可以直接下载查看。</p>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- AI对话按钮 -->
    <div class="ai-chat-button" @click="drawer = true">
      <div class="ai-chat-button-icon">
        <MyIcon name="microphone" style="height: 40px" />
        <span>AI对话</span>
      </div>
    </div>

    <!-- AI对话侧边栏 -->
    <transition name="slide-fade">
      <div v-if="drawer" class="chat-panel">
        <div class="chat-header">
          <button @click="drawer = false" class="back-button">
            <MyIcon name="backArrow" class="back-icon"></MyIcon>
          </button>
          <span>AI助教</span>
          <div style="width: 24px"></div>
        </div>
        <div class="chat-content">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="message-item"
            :class="message.role"
          >
            <p>{{ message.content }}</p>
          </div>
        </div>
        <div class="chat-footer">
          <div class="input-area">
            <div
              class="chat-icon-icon-container"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <div class="chat-icon-icon">
                <MyIcon name="backArrow" style="height: 20px" />
              </div>
              返回
            </div>
            <div>
              <div class="ai-chat-button-icon">
                <MyIcon name="microphone" style="height: 40px" />
                <span>点击讲话</span>
              </div>
            </div>
            <div
              class="chat-icon-icon-container"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <div class="chat-icon-icon">
                <MyIcon name="keyboard" style="height: 20px" />
              </div>
              键盘
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'
import MyButton from '@/components/common/MyButton.vue'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import {getAiResponseStream} from '@aipbl/common/services/aiServices'
import {getCourseDetail, type CourseInfo} from '@/services/courseService'
// 引入 vue-pdf-embed
import VuePdfEmbed from 'vue-pdf-embed'

type CoreMessage = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  /**
   * If the message has a role of `tool`, the `toolInvocations` property will be present.
   */
  toolInvocations?: {
    toolName: string
    args: any
  }[]
}

const route = useRoute()
const router = useRouter()
const courseId = route.params.id as string
const courseInfo = ref<CourseInfo>({
  id: '103',
  name: '人工智能入门',
  desc: '本课程将从零开始，系统地介绍人工智能的核心概念、发展历程以及关键技术。学员将通过丰富的实例和项目，掌握机器学习、深度学习等前沿技术，为进入AI领域打下坚实的基础。',
  keyPoints: [
    '人工智能的定义与分类',
    '机器学习、深度学习与人工智能的关系',
    '人工智能发展简史上的里程碑事件',
    '当前主流的人工智能研究方向和应用领域'
  ],
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  materials: [
    {name: '课程讲义.pdf', size: '2.1MB'},
    {name: '相关论文集.zip', size: '10.5MB'}
  ]
})
const drawer = ref(false)
const userInput = ref('')
const messages = ref<CoreMessage[]>([])
const loadingError = ref<string | null>(null)
const ispending = ref(false)

// 预览相关状态
const previewVisible = ref(false)
const fileToPreview = ref<{name: string; type: string; url: string} | null>(
  null
)
const previewError = ref<string | null>(null)
const textContent = ref<string | null>(null)

// 打开预览弹窗
const openPreview = async (file: {name: string; type: string; url: string}) => {
  fileToPreview.value = file
  previewVisible.value = true
  previewError.value = null
  textContent.value = null

  // 如果是文本文件，尝试获取内容
  if (file.type === 'txt' && file.url !== '#') {
    try {
      const response = await fetch(file.url)
      if (!response.ok) throw new Error('网络响应错误')
      textContent.value = await response.text()
    } catch (error) {
      console.error('获取文本文件内容失败:', error)
      previewError.value = '无法加载文本文件内容。'
    }
  }

  // 如果是PDF文件，检查文件是否可访问
  if (file.type === 'pdf' && file.url !== '#') {
    try {
      const response = await fetch(file.url, {method: 'HEAD'})
      if (!response.ok) {
        previewError.value = '无法访问PDF文件，请检查文件路径。'
      }
    } catch (error) {
      console.error('检查PDF文件失败:', error)
      previewError.value = '无法访问PDF文件。'
    }
  }
}

// 关闭预览弹窗
const closePreview = () => {
  previewVisible.value = false
}

const keyPoints = ref([
  '人工智能基础概念与发展历史，包括从图灵测试到现代深度学习的演变过程',
  '机器学习算法原理，涵盖监督学习、无监督学习和强化学习的基本框架',
  '深度学习网络结构，详解卷积神经网络(CNN)和循环神经网络(RNN)的工作机制',
  '自然语言处理技术，探讨大型语言模型的训练方法与应用场景'
])

const fileList = ref([
  {
    name: 'AI基础知识讲义.pdf',
    size: '3.4Mb',
    type: 'pdf',
    url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
  },
  {
    name: '课程核心概念.txt',
    size: '0.1Mb',
    type: 'txt',
    url: '/课程核心概念.txt'
  },
  {name: '系统架构图.png', size: '0.5Mb', type: 'png', url: '/系统架构图.png'},
  {name: '机器学习算法实践.pptx', size: '2.8Mb', type: 'pptx', url: '#'},
  {name: '深度学习代码示例.zip', size: '5.2Mb', type: 'zip', url: '#'},
  {
    name: '课后习题集.pdf',
    size: '1.5Mb',
    type: 'pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
])

onMounted(async () => {
  // try {
  //   console.log('接收到的课程ID是:', courseId)
  //   courseInfo.value = await getCourseDetail(courseId)
  // } catch (error) {
  //   console.error('获取课程详情失败:', error)
  //   loadingError.value = '课程加载失败，请检查课程ID是否正确或稍后再试。'
  // }
})

// 跳转到题目页面
const goToExercise = () => {
  router.push(`/course/${courseId}/exercise`)
}

const askAI = async () => {
  if (!userInput.value.trim()) return

  ispending.value = true
  const newUserMessage: CoreMessage = {role: 'user', content: userInput.value}
  messages.value.push(newUserMessage)
  userInput.value = ''

  const assistantMessage: CoreMessage = {role: 'assistant', content: ''}
  messages.value.push(assistantMessage)

  try {
    await getAiResponseStream({
      messages: messages.value.slice(0, -1) as any,
      onContent: content => {
        assistantMessage.content += content
      },
      onFinish: () => {
        ispending.value = false
      }
    })
  } catch (error) {
    assistantMessage.content = '抱歉，AI助教出了一点问题，请稍后再试。'
    console.error('AI响应出错:', error)
  }
}
</script>

<style scoped lang="scss">
.course-detail-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.page-content-container {
  width: 100%;
  max-width: 1440px; /* 增加了最大宽度 */
}

.top-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.error-message {
  text-align: center;
  padding: 40px;
  background-color: #fff5f5;
  color: #d9534f;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 30px;
}

.video-section-background {
  background: url('@common/assets/backgrounds/backgroundVedio.png') no-repeat
    center center;
  background-size: contain; /* 确保背景图完整显示 */
  display: flex;
  align-items: center;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
}

.main-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.video-container {
  position: relative;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  aspect-ratio: 16 / 9;
  background-color: #000;
  video {
    border-radius: 15px;
    width: 100%;
    height: 100%;
  }
}

.video-title {
  position: absolute;
  top: -60px;
  background: linear-gradient(92.56deg, #6696ff 1.43%, #63a2fd 93.64%);
  color: white;
  padding: 10px 25px;
  z-index: 0;
  width: clamp(200px, 50%, 400px);
  height: 99px;
  border-radius: 27px;
  .my-button-radius {
    position: absolute;
    transform: scale(1.5);
    left: 14px;
    top: 14px;
    z-index: 1;
  }
  .video-title-text {
    padding: 8px;
    font-family: Inter;
    font-weight: 700;
    font-size: 28px;
    line-height: 100%;
  }
}

.course-intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  h2 {
    font-family: Inter;
    font-size: 18px;
    line-height: 172%;
    margin: 0;
  }
  .intro-title {
    font-weight: 700;
    color: #333;
  }
  .intro-desc {
    font-weight: 400;
    color: #666;
    margin-left: 8px;
  }
}

.bottom-content-wrapper {
  width: 100%;
}

.bottom-area {
  display: flex;
  gap: 30px;
  width: 100%;
  margin: 0 auto;
}

.left-section {
  background-color: #f4f8ff;
  border-radius: 32px;
  flex: 1;
}
.right-section {
  background-color: #f4f8ff;
  border-radius: 32px;
  flex: 0.8;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  padding: 30px 30px 20px 30px;
  border-bottom: 1px solid #d5e5ff;
}

.knowledge-points {
  list-style: none;
  padding: 0;
  margin: 0;
}

.knowledge-point-item {
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 12px;
  h3 {
    font-size: 16px;
    margin: 0 0 8px 0;
    color: #0066ff;
  }
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
  }
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  &:last-child {
    border-bottom: none;
  }
}

.file-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.file-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
  &.pdf {
    background-color: #f44336;
  }
  &.pptx {
    background-color: #ff9800;
  }
  &.zip {
    background-color: #9c27b0;
  }
}

.file-details {
  display: flex;
  flex-direction: column;
  .file-name {
    font-weight: 500;
  }
  .file-size {
    font-size: 12px;
    color: #888;
  }
}

.file-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: none;
  border: 1px solid #0066ff;
  color: #0066ff;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #0066ff;
    color: white;
  }
  &.download {
    background-color: #0066ff;
    color: white;
    &:hover {
      background-color: #0052cc;
    }
  }
}

@media (max-width: 768px) {
  .top-area {
    padding: 0;
  }
  .video-section-background {
    padding: 20px;
  }
  .video-title {
    font-size: 14px;
    padding: 8px 15px;
    left: 15px;
    top: -10px;
  }
  .course-intro {
    flex-direction: column;
    align-items: flex-start;
  }
  .bottom-content-wrapper {
    padding: 0;
  }
}

.ai-chat-button {
  position: fixed;
  right: 40px;
  bottom: 100px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.ai-chat-button-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 4.6px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image:
    linear-gradient(180deg, #dfeaff 0%, #dde8ff 100%),
    linear-gradient(180deg, #ccdfff 0%, #4182ee 100%);
  box-shadow: 0px 20px 26.4px 0px #026bff38;
}
span {
  color: #4383ee;
  font-family: Inter;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
}

.chat-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 200;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  @media (min-width: 500px) {
    width: clamp(0px, 50%, 600px);
  }
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
  .back-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.chat-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-item {
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.5;
}

.message-item.user {
  background-color: #0066ff;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.message-item.assistant {
  background-color: #fff;
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.chat-footer {
  padding: 15px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  background-color: #f4f8ff;
}

.input-area {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 35vh;

  border-radius: 22px;
  padding: 5px 10px;
  .chat-icon-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 44px;
    background: #ffffff;
    border-radius: 50%;
    border: 1px solid #deebff;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* 文件预览弹窗样式 */
.preview-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.preview-modal-content {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  width: 85vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid #eee;
  flex-shrink: 0;
}

.preview-header h3 {
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 60px);
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #888;
  padding: 0 10px;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #333;
}

.preview-body {
  flex-grow: 1;
  padding: 10px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f0f2f5;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.pdf-preview-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
}

.preview-pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: #fff;
}

.preview-pdf {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}

.preview-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: left;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  overflow: auto;
}

.unsupported-preview,
.preview-error-message {
  color: #666;
  font-size: 16px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.preview-error-message {
  color: #d9534f;
  background-color: #fff5f5;
}
</style>
