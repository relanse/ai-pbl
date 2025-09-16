<template>
  <div class="lesson-edit-page">
    <div class="header">
      <h2 class="breadcrumb">{{ pageTitle }}</h2>
    </div>
    <div class="card form-card">
      <el-form
        ref="formRef"
        :model="form"
        :rules="isDetailMode ? {} : rules"
        label-width="96px"
      >
        <!-- 标题 -->
        <el-form-item
          label="课程标题"
          :prop="isDetailMode ? '' : 'name'"
          :required="!isDetailMode"
        >
          <template v-if="isDetailMode">
            <div class="detail-text">{{ form.name || '这是一段课程标题' }}</div>
          </template>
          <el-input
            v-else
            v-model="form.name"
            placeholder="请输入"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <!-- 预览对话框 -->
        <el-dialog v-model="preview.visible" title="预览" width="70%">
          <FilePreview v-if="preview.file" :file="preview.file" />
        </el-dialog>

        <!-- 类型 -->
        <el-form-item
          label="课程类型"
          :prop="isDetailMode ? '' : 'type'"
          :required="!isDetailMode"
        >
          <template v-if="isDetailMode">
            <div class="detail-text type-badge">{{ form.type }}</div>
          </template>
          <el-radio-group v-else v-model="form.type">
            <el-radio label="录播" />
            <el-radio label="腾讯会议" />
          </el-radio-group>
        </el-form-item>

        <!-- 腾讯会议地址（仅当选择腾讯会议） -->
        <el-form-item
          v-if="form.type === '腾讯会议'"
          label="会议地址"
          :prop="isDetailMode ? '' : 'meetingUrl'"
        >
          <template v-if="isDetailMode">
            <div class="detail-text">{{ form.meetingUrl || '会议地址' }}</div>
          </template>
          <el-input
            v-else
            v-model="form.meetingUrl"
            placeholder="请输入腾讯会议链接，例如 https://meeting.tencent.com/..."
          />
        </el-form-item>

        <!-- 视频上传占位/预览（仅录播显示） -->
        <el-form-item
          v-if="form.type === '录播'"
          label="课程视频"
          :prop="isDetailMode ? '' : 'video'"
        >
          <div class="video-row">
            <template v-if="isDetailMode">
              <!-- 详情模式：只显示视频预览，使用原型图中的样式 -->
              <div class="video-detail">
                <div class="video-name">
                  {{ form.videoName || '上传的视频的名称.mp4' }}
                </div>
                <div class="video-preview-detail">
                  <video
                    v-if="form.video?.url"
                    controls
                    :src="form.video?.url"
                  />
                  <div v-else class="video-placeholder-detail">
                    <div class="play-button">
                      <div class="play-icon">▶</div>
                    </div>
                    <div class="video-controls">
                      <div class="progress-bar">
                        <div class="progress-track">
                          <div class="progress-thumb" style="left: 5%"></div>
                        </div>
                      </div>
                      <div class="control-row">
                        <div class="time">00:23</div>
                        <div class="volume-control">
                          <div class="volume-icon">🔊</div>
                          <div class="volume-bar"></div>
                        </div>
                        <div class="fullscreen">⛶</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- 编辑模式：保持原有的上传逻辑 -->
              <!-- 占位态：el-upload 容器 -->
              <template v-if="!form.video?.url && !uploadState.uploading">
                <el-upload
                  class="video-uploader"
                  :show-file-list="false"
                  accept="video/mp4"
                  :before-upload="beforeVideoUpload"
                  :http-request="uploadVideoReq"
                >
                  <div class="video-placeholder">
                    <img
                      :src="VideoUploadIcon"
                      class="video-icon"
                      alt="upload"
                    />
                    <div class="hint">点击上传视频</div>
                  </div>
                </el-upload>
                <div class="video-tip">
                  建议900*600px，mp4格式，视频小于50M
                  <br />
                  <span class="demo-tip"
                    >📋 当前为演示模式，上传将使用本地预览</span
                  >
                </div>
              </template>

              <!-- 上传中：Element 进度条 -->
              <template v-else-if="uploadState.uploading">
                <div class="video-progress-card">
                  <div class="name">{{ uploadState.fileName }}</div>
                  <el-progress
                    :percentage="Math.min(uploadState.progress, 100)"
                    :stroke-width="10"
                  />
                  <div class="ok" v-if="uploadState.progress >= 100">
                    视频上传成功
                  </div>
                  <el-button link type="primary" @click="cancelUpload"
                    >取消上传</el-button
                  >
                </div>
              </template>

              <!-- 预览态 -->
              <template v-else>
                <div class="video-preview">
                  <video controls :src="form.video?.url" />
                  <el-button class="del" circle @click="removeVideo"
                    ><el-icon><Delete /></el-icon
                  ></el-button>
                </div>
              </template>
            </template>
          </div>
        </el-form-item>

        <!-- 视频名称（仅录播显示） -->
        <el-form-item
          v-if="form.type === '录播' && !isDetailMode"
          label="视频名称"
          prop="videoName"
        >
          <el-input
            v-model="form.videoName"
            placeholder="请输入视频名称（可不含扩展名）"
            maxlength="80"
          />
        </el-form-item>

        <!-- 课程资料 -->
        <el-form-item label="课程资料">
          <template v-if="isDetailMode">
            <div class="files-detail">
              <div v-if="!form.files?.length" class="no-files">
                暂无课程资料
              </div>
              <div v-else class="file-list-detail">
                <div
                  class="file-row-detail"
                  v-for="(f, i) in form.files"
                  :key="i"
                  @click="openPreview(f)"
                >
                  <div class="file-icon-detail" :class="extClass(getExt(f))">
                    {{ getExt(f) }}
                  </div>
                  <div class="file-info">
                    <div class="file-name-detail">{{ f.name }}</div>
                    <div class="file-size">{{ f.size }}</div>
                  </div>
                  <div class="file-preview-btn">👁</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="files">
              <el-upload
                ref="fileUploadRef"
                class="file-upload"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="onFileChange"
                :before-upload="beforeFileUpload"
                :accept="acceptTypes"
                multiple
              >
                <el-button type="primary">{{
                  form.files?.length ? '继续添加' : '选择课件'
                }}</el-button>
              </el-upload>
              <div class="tip">注：学员可下载您在此上传的课件</div>
            </div>
          </template>
        </el-form-item>
        <el-form-item v-if="!isDetailMode">
          <div class="file-list" v-if="form.files?.length">
            <div
              class="file-row"
              v-for="(f, i) in form.files"
              :key="i"
              @click="openPreview(f)"
            >
              <div class="left">
                <span class="file-icon" :class="extClass(getExt(f))">{{
                  getExt(f)
                }}</span>
                <span class="file-name">{{ f.name }}</span>
              </div>
              <div class="right">
                <span class="divider"></span>
                <button
                  class="file-remove"
                  title="删除"
                  @click.stop="removeFile(i)"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </el-form-item>

        <!-- 封面 -->
        <el-form-item
          label="课程封面"
          :prop="isDetailMode ? '' : 'cover'"
          :required="!isDetailMode"
        >
          <template v-if="isDetailMode">
            <div class="cover-detail">
              <img
                :src="
                  form.cover || 'https://dummyimage.com/240x160/ffe4cc/ffffff'
                "
                alt="cover"
                class="cover-image-detail"
              />
              <div class="cover-info">
                <div class="cover-size">900*600px</div>
                <div class="cover-format">JPG格式</div>
                <div class="cover-file-size">3.2M</div>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-if="!form.cover" class="cover-uploader" @click="pickCover">
              <img :src="CoverUploadIcon" class="video-icon" alt="upload" />
              <div class="hint">点击添加封面图</div>
            </div>
            <div v-else class="cover-preview">
              <img :src="form.cover" alt="cover" />
              <el-button class="del" circle @click="removeCover"
                ><el-icon><Delete /></el-icon
              ></el-button>
            </div>
            <input
              ref="coverInput"
              type="file"
              accept="image/png,image/jpeg"
              class="hidden"
              @change="onCoverChange"
            />
          </template>
        </el-form-item>

        <!-- 简介 -->
        <el-form-item
          label="课程介绍"
          :prop="isDetailMode ? '' : 'intro'"
          :required="!isDetailMode"
        >
          <template v-if="isDetailMode">
            <div class="detail-text intro-text">
              {{
                form.intro ||
                '这是一些课程的介绍内容，这是一些课程的介绍内容，这是一些课程的介绍内容，这是一些课程的介绍内容，这是一些课程的介绍内容，这是一些课程的介绍内容。'
              }}
            </div>
          </template>
          <el-input
            v-else
            type="textarea"
            v-model="form.intro"
            :rows="4"
            maxlength="50"
            show-word-limit
            placeholder="请输入课程简介"
          />
        </el-form-item>

        <!-- 知识要点 -->
        <el-form-item
          label="知识要点"
          :prop="isDetailMode ? '' : 'points'"
          :required="!isDetailMode"
        >
          <template v-if="isDetailMode">
            <div class="points-detail">
              <div
                class="point-item"
                v-for="(p, idx) in displayPoints"
                :key="idx"
              >
                <div class="point-label">要点{{ idx + 1 }}</div>
                <div class="point-content">
                  {{
                    p ||
                    `这是一些课程的介绍内容，这是一些课程的介绍内容，这是一些课程的介绍内容，这是一些课程的介绍内容，这是一些课程的介绍内容，这是一些课程的介绍内容。`
                  }}
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="points">
              <div class="point-row" v-for="(p, idx) in form.points" :key="idx">
                <span class="label">要点{{ idx + 1 }}</span>
                <el-input
                  v-model="form.points[idx]"
                  type="textarea"
                  :rows="3"
                  maxlength="50"
                  show-word-limit
                  placeholder="请输入要点内容"
                />
              </div>
              <el-button link type="primary" @click="addPoint"
                >+ 要点</el-button
              >
            </div>
          </template>
        </el-form-item>

        <!-- 底部操作按钮 -->
        <div class="actions">
          <template v-if="isDetailMode">
            <el-button @click="onCancel">返回</el-button>
            <el-button type="danger" @click="onDelete">删除</el-button>
            <el-button type="primary" @click="goEdit">编辑</el-button>
          </template>
          <template v-else>
            <el-button @click="onCancel">取消</el-button>
            <el-button @click="onSave">暂存</el-button>
            <el-button type="primary" @click="onPublish">发布</el-button>
          </template>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed, onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElButton,
  ElMessage,
  ElMessageBox,
  ElIcon,
  ElUpload,
  ElProgress,
  ElDialog
} from 'element-plus'
import type {UploadRequestOptions} from 'element-plus'
import VideoUploadIcon from '@aipbl/common/assets/icons/videoupload.svg'
import CoverUploadIcon from '@aipbl/common/assets/icons/coverUpload.svg'
import {Delete} from '@element-plus/icons-vue'
import FilePreview from '@aipbl/common/components/FilePreview/FilePreview.vue'
import {
  useCourseStore,
  type LessonItem,
  type LessonType
} from '@/stores/courseStore'

defineOptions({name: 'CourseLessonEdit'})

const route = useRoute()
const router = useRouter()
const store = useCourseStore()
store.init()

const courseId = computed(() => (route.params.courseId as string) || 'L1')
const lessonId = computed(() => route.params.lessonId as string | undefined)
const isEdit = computed(() => !!lessonId.value)
const isDetailMode = computed(() => route.name === 'course-lesson-detail')

const breadcrumbTitle = computed(() => {
  const defaultTitle = '新课程'
  if (!isEdit.value) return defaultTitle
  const l = store.getLesson(courseId.value, lessonId.value!)
  return l?.name || defaultTitle
})

// 页面自身标题：新建/编辑/详情
const pageTitle = computed(() => {
  if (isDetailMode.value) return '课程详情'
  return isEdit.value ? '编辑课程' : '新建课程'
})

// 详情模式下显示的知识要点（确保至少有2个）
const displayPoints = computed(() => {
  if (form.points.length >= 2) return form.points
  return ['要点1', '要点1'] // 默认显示两个要点
})

// 同步到 layout 面包屑（标题）
onMounted(() => {
  route.meta.title = breadcrumbTitle.value
})
watch(breadcrumbTitle, t => {
  route.meta.title = t
})

type FormShape = {
  name: string
  type: LessonType
  video: LessonItem['video']
  files: {name: string; size: string; url?: string; type?: string}[]
  cover: string
  intro: string
  points: string[]
  // 仅录播：视频名称
  videoName: string
  // 仅腾讯会议：会议链接
  meetingUrl: string
}

const emptyForm: FormShape = {
  name: '',
  type: '录播',
  video: null,
  files: [],
  cover: '',
  intro: '',
  points: [''],
  videoName: '',
  meetingUrl: ''
}

const form = reactive<FormShape>({...emptyForm})
const formRef = ref<InstanceType<typeof ElForm> | null>(null)

// 上传状态
const uploadState = reactive({
  selected: false,
  uploading: false,
  fileName: '',
  progress: 0,
  xhr: null as XMLHttpRequest | null
})

const rules = {
  name: [{required: true, message: '请输入课程标题', trigger: 'blur'}],
  type: [{required: true, message: '请选择课程类型', trigger: 'change'}],
  cover: [{required: true, message: '请上传课程封面', trigger: 'change'}],
  intro: [{required: true, message: '请输入课程介绍', trigger: 'blur'}],
  points: [
    {
      validator: (_: any, val: string[], cb: any) => {
        if (!val.length || !val[0] || !val[0].trim())
          cb(new Error('请至少填写一个要点'))
        else cb()
      },
      trigger: 'blur'
    }
  ],
  // 条件校验：录播需视频、视频名
  video: [
    {
      validator: (_: any, __: any, cb: any) => {
        if (form.type === '录播') {
          if (!form.video || !form.video.url)
            return cb(new Error('请上传课程视频'))
        }
        cb()
      },
      trigger: 'change'
    }
  ],
  videoName: [
    {
      validator: (_: any, v: string, cb: any) => {
        if (form.type === '录播') {
          if (!v || !v.trim()) return cb(new Error('请输入视频名称'))
        }
        cb()
      },
      trigger: 'blur'
    }
  ],
  // 条件校验：腾讯会议需会议地址
  meetingUrl: [
    {
      validator: (_: any, v: string, cb: any) => {
        if (form.type === '腾讯会议') {
          if (!v || !v.trim()) return cb(new Error('请输入会议地址'))
          const ok = /^https?:\/\/meeting\.tencent\.com\//i.test(v.trim())
          if (!ok) return cb(new Error('请输入有效的腾讯会议地址'))
        }
        cb()
      },
      trigger: 'blur'
    }
  ]
}

function loadForEdit() {
  if (!isEdit.value) return
  const l = store.getLesson(courseId.value, lessonId.value!)
  if (!l) return

  form.name = l.name
  form.type = l.type
  form.video = l.video || null
  form.videoName = l.video?.name || ''
  form.files = l.files
  form.cover = l.cover
  form.intro = l.intro
  form.points = l.points?.length ? [...l.points] : ['']
  form.meetingUrl = l.meetingUrl || ''

  // 详情模式下确保有示例数据
  if (isDetailMode.value) {
    if (!form.files?.length) {
      form.files = [
        {name: '附件名称.pdf', size: '3.2M', type: 'application/pdf'},
        {name: '附件名称.jpg', size: '3.2M', type: 'image/jpeg'}
      ]
    }
  }
}

function onCancel() {
  router.back()
}

function goEdit() {
  router.push({
    name: 'course-lesson-edit',
    params: {courseId: courseId.value, lessonId: lessonId.value}
  })
}

async function onDelete() {
  try {
    await ElMessageBox.confirm(
      '删除后不可恢复，是否确认删除此课程？',
      '删除课程',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )

    // 执行删除操作
    store.deleteLesson(lessonId.value!)
    ElMessage.success('课程删除成功')

    // 删除成功后返回课程列表
    router.push({
      name: 'course-sub-list',
      params: {courseId: courseId.value},
      query: {name: (route.query.name as string) || ''}
    })
  } catch {
    // 用户取消删除，不需要提示
  }
}

async function onSave() {
  const ok = await formRef.value?.validate().catch(() => false)
  if (!ok) return
  // 组装保存数据
  const payloadVideo =
    form.type === '录播'
      ? form.video
        ? {...form.video, name: form.videoName?.trim() || form.video.name}
        : null
      : undefined
  const payloadMeetingUrl =
    form.type === '腾讯会议' ? form.meetingUrl?.trim() || '' : undefined
  const id = store.saveLesson({
    id: lessonId.value,
    courseId: courseId.value,
    name: form.name,
    type: form.type,
    video: payloadVideo,
    meetingUrl: payloadMeetingUrl,
    files: form.files,
    cover: form.cover,
    intro: form.intro,
    points: form.points,
    status: 'draft'
  })
  ElMessage.success('已保存草稿')
  if (!lessonId.value) {
    router.replace({
      name: 'course-lesson-edit',
      params: {courseId: courseId.value, lessonId: id}
    })
  }
}

async function onPublish() {
  const ok = await formRef.value?.validate().catch(() => false)
  if (!ok) return
  const payloadVideo =
    form.type === '录播'
      ? form.video
        ? {...form.video, name: form.videoName?.trim() || form.video.name}
        : null
      : undefined
  const payloadMeetingUrl =
    form.type === '腾讯会议' ? form.meetingUrl?.trim() || '' : undefined
  store.saveLesson({
    id: lessonId.value,
    courseId: courseId.value,
    name: form.name,
    type: form.type,
    video: payloadVideo,
    meetingUrl: payloadMeetingUrl,
    files: form.files,
    cover: form.cover,
    intro: form.intro,
    points: form.points,
    status: 'published'
  })
  ElMessage.success('已发布')
  router.push({
    name: 'course-sub-list',
    params: {courseId: courseId.value},
    query: {name: (route.query.name as string) || ''}
  })
}

function addPoint() {
  form.points.push('')
}

function removeFile(i: number) {
  const f = form.files[i]
  if (f?.url && f.url.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(f.url)
    } catch {}
  }
  form.files.splice(i, 1)
}

function removeVideo() {
  form.video = null
  form.videoName = ''
}

const coverInput = ref<HTMLInputElement | null>(null)
function pickCover() {
  coverInput.value?.click()
}

function beforeVideoUpload(file: File) {
  if (!/\.mp4$/i.test(file.name)) {
    ElMessage.error('仅支持 mp4 格式视频')
    return false
  }
  return true
}

function uploadVideoReq(options: UploadRequestOptions): Promise<unknown> {
  const file = options.file as File
  if (!beforeVideoUpload(file)) {
    options.onError?.({name: 'invalid', message: 'invalid file'} as any)
    return Promise.reject(new Error('invalid file'))
  }

  uploadState.selected = true
  uploadState.fileName = file.name
  uploadState.progress = 0
  uploadState.uploading = true

  // 假的上传过程：模拟进度条和网络延迟
  return new Promise(resolve => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5 // 每次增加5-20%
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        // 模拟上传完成
        uploadState.progress = 100

        // 使用本地 blob URL 作为视频源
        const videoUrl = URL.createObjectURL(file)

        // 创建临时video元素获取时长
        const tempVideo = document.createElement('video')
        tempVideo.preload = 'metadata'
        tempVideo.onloadedmetadata = () => {
          const duration = tempVideo.duration
          const minutes = Math.floor(duration / 60)
          const seconds = Math.floor(duration % 60)
          const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`

          form.video = {
            name: file.name,
            url: videoUrl,
            duration: durationStr
          }
        }
        tempVideo.onerror = () => {
          // 如果获取时长失败，就不显示时长
          form.video = {
            name: file.name,
            url: videoUrl,
            duration: ''
          }
        }
        tempVideo.src = videoUrl

        form.videoName = file.name.replace(/\.[^/.]+$/, '') // 移除扩展名

        // 模拟成功响应
        const mockResponse = {
          code: 200,
          message: '上传成功',
          data: {
            url: videoUrl,
            name: file.name,
            size: file.size
          }
        }

        options.onSuccess?.(mockResponse as any)
        ElMessage.success('视频上传成功！')

        // 延迟隐藏上传状态
        setTimeout(() => {
          uploadState.uploading = false
        }, 800)

        resolve(mockResponse)
      } else {
        uploadState.progress = Math.floor(progress)
        options.onProgress?.({percent: Math.floor(progress)} as any)
      }
    }, 100) // 每100ms更新一次进度

    // 保存定时器引用以便取消
    uploadState.xhr = {
      abort: () => {
        clearInterval(interval)
        uploadState.uploading = false
        uploadState.progress = 0
      }
    } as XMLHttpRequest
  })
}

function cancelUpload() {
  uploadState.xhr?.abort()
  uploadState.uploading = false
  uploadState.selected = false
  uploadState.progress = 0
  ElMessage.info('已取消上传')
}

// ====== 附件上传与预览 ======
const acceptTypes = '.txt,.doc,.docx,.ppt,.pptx,.pdf,.png,.jpg,.jpeg,.gif'
function formatSize(size: number) {
  if (size < 1024) return size + 'B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + 'KB'
  return (size / (1024 * 1024)).toFixed(1) + 'MB'
}
function beforeFileUpload(file: File) {
  const okType = new RegExp(
    '\\.(txt|docx?|pptx?|pdf|png|jpe?g|gif)$',
    'i'
  ).test(file.name)
  const okSize = file.size <= 100 * 1024 * 1024
  if (!okType) {
    ElMessage.error('仅支持 txt/doc/ppt/pdf/图片')
    return false
  }
  if (!okSize) {
    ElMessage.error('单个文件需小于 100MB')
    return false
  }
  return true
}
function onFileChange(file: any) {
  // el-upload change 事件：当选择文件时调用，这里不走自动上传，直接塞入表单
  const raw = file.raw as File
  if (!beforeFileUpload(raw)) return
  const url = URL.createObjectURL(raw)
  const ext = raw.name.split('.').pop()?.toLowerCase() || ''
  let mime = raw.type || ''
  if (!mime) {
    const map: Record<string, string> = {
      pdf: 'application/pdf',
      txt: 'text/plain',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif'
    }
    mime = map[ext] || 'application/octet-stream'
  }
  form.files.push({name: raw.name, size: formatSize(raw.size), url, type: mime})
}

const preview = reactive({visible: false, file: null as any})
function openPreview(f: {name: string; url?: string; type?: string}) {
  preview.file = f
  preview.visible = true
}

function getExt(f: {name?: string}) {
  const n = f?.name || ''
  return (n.split('.').pop() || '').toUpperCase()
}
function extClass(ext: string) {
  if (!ext) return 'file'
  if (['PNG', 'JPG', 'JPEG', 'GIF', 'BMP', 'WEBP'].includes(ext)) return 'img'
  if (ext === 'PDF') return 'pdf'
  if (ext.startsWith('PPT')) return 'ppt'
  if (ext.startsWith('DOC')) return 'doc'
  if (ext === 'TXT') return 'txt'
  return 'file'
}

function onCoverChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const isOkType = /image\/(jpeg|png)/i.test(file.type)
  const isOkSize = file.size <= 5 * 1024 * 1024
  if (!isOkType) return ElMessage.error('仅支持 JPG/PNG 图片')
  if (!isOkSize) return ElMessage.error('图片大小需小于 5MB')
  const reader = new FileReader()
  reader.onload = () => {
    const img = new Image()
    img.onload = () => {
      const W = 900,
        H = 600
      const srcW = img.width,
        srcH = img.height
      // 居中裁剪 3:2
      const targetRatio = W / H
      const srcRatio = srcW / srcH
      let sx = 0,
        sy = 0,
        sw = srcW,
        sh = srcH
      if (srcRatio > targetRatio) {
        // 宽更大，裁掉左右
        sw = Math.round(srcH * targetRatio)
        sx = Math.round((srcW - sw) / 2)
      } else if (srcRatio < targetRatio) {
        // 高更大，裁掉上下
        sh = Math.round(srcW / targetRatio)
        sy = Math.round((srcH - sh) / 2)
      }
      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H)
      form.cover = canvas.toDataURL('image/jpeg', 0.9)
      // 触发校验
      formRef.value?.validateField('cover').catch(() => {})
    }
    img.src = reader.result as string
  }
  reader.readAsDataURL(file)
}

function removeCover() {
  form.cover = ''
  formRef.value?.validateField('cover').catch(() => {})
}

// 切换类型时清理无关字段并触发相应校验
watch(
  () => form.type,
  t => {
    if (t === '录播') {
      form.meetingUrl = ''
      // 校验相关字段
      formRef.value?.clearValidate?.(['meetingUrl'])
    } else if (t === '腾讯会议') {
      form.video = null
      form.videoName = ''
      uploadState.selected = false
      uploadState.uploading = false
      uploadState.progress = 0
      // 校验相关字段
      formRef.value?.clearValidate?.(['video', 'videoName'])
    }
  }
)

onMounted(loadForEdit)
</script>

<style scoped>
.lesson-edit-page {
  padding: 14px;
  background: #eaf2ff;
  min-height: 100%;
}
.breadcrumb {
  font-size: 18px;
  font-weight: 600;
  color: #2e4680;
  margin: 6px 0 12px;
}
.card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(46, 70, 128, 0.08);
}
.form-card {
  padding: 18px;
}

.video-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.video-uploader {
  width: 520px;
}
.video-placeholder {
  background: #f4f6fa;
  border-radius: 10px;
  width: 240px;
  height: 100px;
  border: 1px dashed #d8dee9;
  padding: 28px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.video-placeholder .video-icon {
  width: 56px;
  height: 56px;
}
.video-placeholder .hint {
  color: #6b7280;
}
.video-tip {
  color: #9aa0a6;
  font-size: 12px;
  padding-top: 8px;
  line-height: 1.4;
}
.demo-tip {
  color: #3b82f6;
  font-style: italic;
}
.video-preview {
  position: relative;
  width: 520px;
}
.video-preview video {
  width: 100%;
  border-radius: 12px;
  background: #111;
}
.video-preview .del {
  position: absolute;
  right: 8px;
  top: 8px;
}
.video-progress-card {
  width: 520px;
  background: #f7f9fc;
  border: 1px solid #eef1f5;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.video-progress-card .name {
  color: #374151;
  font-size: 14px;
}
.video-progress-card .ok {
  color: #28c76f;
  font-size: 12px;
}

.files {
  display: flex;
  align-items: center;
  gap: 10px;
}
.files .tip {
  color: #9aa0a6;
  font-size: 12px;
}
.file-list {
  margin-top: 8px;
  width: 520px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.file-row {
  background: #f7f9fc;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.file-row:hover {
  background: #f1f5fb;
}
.file-row .left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.file-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 24px;
  border-radius: 6px;
  background: #e5e7eb;
  color: #374151;
  font-size: 12px;
  font-weight: 700;
}
.file-icon.pdf {
  background: #fdecec;
  color: #d9534f;
}
.file-icon.img {
  background: #ecf8ff;
  color: #1f9fff;
}
.file-icon.ppt {
  background: #fff2e8;
  color: #f56700;
}
.file-icon.doc {
  background: #eef2ff;
  color: #3b5bfd;
}
.file-icon.txt {
  background: #f3f4f6;
  color: #6b7280;
}
.file-name {
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 380px;
}
.file-row .right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.divider {
  display: inline-block;
  width: 1px;
  height: 18px;
  background: #dcdfe6;
}
.file-remove {
  border: none;
  background: transparent;
  color: #9aa0a6;
  font-size: 16px;
  cursor: pointer;
  padding: 0 4px;
}
.file-remove:hover {
  color: #d9534f;
}

.cover-uploader {
  background: #f4f6fa;
  border-radius: 10px;
  width: 240px;
  height: 100px;
  border: 1px dashed #d8dee9;
  padding: 28px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.cover-uploader .camera {
  width: 46px;
  height: 34px;
  background: #c7d2fe;
  border-radius: 6px;
}
.cover-uploader .hint {
  color: #6b7280;
}
.cover-uploader .sub {
  color: #9aa0a6;
  font-size: 12px;
}
.cover-preview {
  position: relative;
  width: 240px;
  height: 160px;
}
.cover-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.cover-preview .del {
  position: absolute;
  right: 8px;
  top: 8px;
}
.hidden {
  display: none;
}

.points {
  width: 520px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.point-row .label {
  display: block;
  margin-bottom: 6px;
  color: #6b7280;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding-top: 8px;
}

/* 详情模式样式 */
.detail-text {
  color: #374151;
  font-size: 14px;
  line-height: 1.5;
  min-height: 22px;
}

.type-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #ecf8ff;
  color: #1f9fff;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.intro-text {
  line-height: 1.6;
  color: #6b7280;
}

/* 视频详情样式 */
.video-detail {
  width: 520px;
}

.video-name {
  color: #374151;
  font-size: 14px;
  margin-bottom: 12px;
}

.video-preview-detail {
  position: relative;
  width: 100%;
  height: 300px;
  background: #2d3748;
  border-radius: 8px;
  overflow: hidden;
}

.video-preview-detail video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-placeholder-detail {
  position: relative;
  width: 100%;
  height: 100%;
  background: #2d3748;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.play-icon {
  color: #2d3748;
  font-size: 24px;
  margin-left: 4px;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
}

.progress-bar {
  margin-bottom: 8px;
}

.progress-track {
  position: relative;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.progress-thumb {
  position: absolute;
  top: -4px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 12px;
}

.time {
  color: #4f9fff;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 6px;
}

.volume-bar {
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* 文件列表详情样式 */
.files-detail {
  width: 520px;
}

.no-files {
  color: #9ca3af;
  font-style: italic;
}

.file-list-detail {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-row-detail {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.file-row-detail:hover {
  background: #f1f5f9;
}

.file-icon-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 32px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  margin-right: 12px;
}

.file-icon-detail.pdf {
  background: #fee2e2;
  color: #dc2626;
}

.file-icon-detail.img {
  background: #dbeafe;
  color: #2563eb;
}

.file-info {
  flex: 1;
}

.file-name-detail {
  color: #374151;
  font-weight: 500;
  margin-bottom: 2px;
}

.file-size {
  color: #9ca3af;
  font-size: 12px;
}

.file-preview-btn {
  color: #6b7280;
  font-size: 16px;
  cursor: pointer;
}

/* 封面详情样式 */
.cover-detail {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.cover-image-detail {
  width: 240px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cover-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 8px;
}

.cover-size,
.cover-format,
.cover-file-size {
  color: #6b7280;
  font-size: 13px;
}

/* 知识要点详情样式 */
.points-detail {
  width: 520px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.point-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.point-label {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

.point-content {
  color: #374151;
  line-height: 1.6;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}
</style>
