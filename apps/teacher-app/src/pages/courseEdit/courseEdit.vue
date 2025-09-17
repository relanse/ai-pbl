<template>
  <div>
    <!-- 顶部栏（按原型图） -->
    <div class="page-topbar">
      <div class="left">
        <img :src="bigBookIcon" alt="课程" class="topbar-book-icon" />
        <div class="titles">
          <div class="main-title">{{ topTitle }}</div>
          <div class="sub-title">
            {{ subTitle }}
            <span class="status-badge">待发布</span>
          </div>
        </div>
      </div>
      <div class="right">
        <el-button
          @click="isEdit = !isEdit"
          :type="isEdit ? 'default' : 'danger'"
        >
          {{ isEdit ? '预览交互' : '返回编辑 ' }}
        </el-button>
        <el-button plain @click="saveDraft" type="default">暂存草稿</el-button>
        <el-button type="primary" @click="submitCourse">发布全部</el-button>
      </div>
    </div>
    <el-container class="edit-container">
      <!-- 侧边预览区 -->
      <el-aside width="250px" class="edit-page">
        <div class="aside-header">
          <div class="title-wrap">
            <img :src="bookIcon" alt="目录" class="book-icon" />
            <h3>题目目录</h3>
          </div>
          <el-button
            class="add-page-icon-btn"
            text
            :icon="Plus"
            title="增加题目"
            @click="addEmptyPage"
          />
        </div>
        <!--可拖拽课程页面预览-->
        <VueDraggable
          v-model="courseData.pages"
          class="page-list"
          @end="onEnd"
          ghostClass="ghost"
        >
          <TransitionGroup type="transition" name="fade">
            <div
              v-for="(page, index) in courseData.pages"
              :key="page.uniqueId"
              class="page-thumbnail"
              :class="{active: index == selectedPageIndex}"
              @click="selectPage(index)"
            >
              <div class="thumbnail-header">
                <div class="title">
                  <i class="status-dot" :class="getPageStatus()"></i>
                  <template v-if="editingIndex === index">
                    <input
                      v-model="tempTitle"
                      class="title-input"
                      @click.stop
                      @keyup.enter="finishEditTitle(index)"
                      @keyup.esc="cancelEditTitle"
                      @blur="finishEditTitle(index)"
                      :placeholder="`题目 ${formatIndex(index + 1)}`"
                      maxlength="30"
                    />
                  </template>
                  <template v-else>
                    <span
                      class="title-text"
                      title="双击重命名"
                      @dblclick.stop="startEditTitle(index)"
                    >
                      {{ page.title || `题目 ${formatIndex(index + 1)}` }}
                    </span>
                  </template>
                </div>
                <div class="ops">
                  <el-button text circle class="drag-hint" title="拖拽排序">
                    <el-icon><Rank /></el-icon>
                  </el-button>
                  <el-button
                    text
                    type="danger"
                    :icon="Delete"
                    circle
                    class="delete-btn"
                    title="删除"
                    @click.stop="deletePage(index)"
                  />
                </div>
              </div>
              <div class="subtitle">
                {{ getTemplateName(page.templateType) }}
              </div>
            </div>
          </TransitionGroup>
        </VueDraggable>

        <!-- 底部原“增加页面”按钮已移至标题右侧，按原型图不再显示文字按钮 -->
      </el-aside>
      <!--顶部工具栏和编辑区-->
      <el-main :style="{paddingRight: mainPaddingRight}" class="animated-main">
        <div v-if="currentPageData" class="main-editor-content">
          <div class="template-display-area">
            <component :is="templateComponent" v-if="templateComponent" />
          </div>
        </div>
        <el-empty v-else description="请从左侧选择一个页面，或新增一个页面" />
      </el-main>
      <!-- 右侧侧边栏（可收起，覆盖式） -->
      <el-aside :style="{width: rightSidebarWidth}" class="right-sidebar">
        <!-- 折叠把手 -->
        <button
          class="collapse-handle"
          type="button"
          @click="toggleRightSidebar"
        >
          <el-icon v-if="!rightCollapsed"><ArrowRight /> </el-icon>
          <el-icon v-else><ArrowLeft /></el-icon>
        </button>
        <div v-if="!rightCollapsed" class="right-content">
          <el-tabs v-model="activeRightTab" class="right-tabs">
            <el-tab-pane label="模板库" name="templates">
              <div class="template-grid">
                <div
                  v-for="tpl in templateOpt"
                  :key="tpl.value"
                  class="template-card"
                  :class="{selected: isSelectedTemplate(tpl.value)}"
                >
                  <div
                    class="preview-box clickable"
                    title="点击切换为该模板"
                    @click="onClickTemplateThumb(tpl.value)"
                  >
                    <img :src="tpl.img" />
                  </div>
                  <div class="tpl-title">{{ tpl.label }}</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="素材库" name="assets">
              <div class="assets-pane">
                <el-tabs v-model="activeAssetTab" class="assets-subtabs">
                  <el-tab-pane label="图片" name="images">
                    <div class="asset-grid">
                      <div
                        v-for="(url, idx) in imageAssets"
                        :key="url + idx"
                        class="asset-item"
                      >
                        <div class="asset-thumb">
                          <img :src="url" alt="图片" />
                          <button
                            class="asset-del"
                            type="button"
                            title="删除"
                            @click.stop="removeImage(idx)"
                          >
                            <el-icon><Delete /></el-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="icon" name="icons">
                    <div class="asset-grid">
                      <div
                        v-for="(url, idx) in iconAssets"
                        :key="url + idx"
                        class="asset-item"
                      >
                        <div class="asset-thumb">
                          <img :src="url" alt="图标" />
                          <button
                            class="asset-del"
                            type="button"
                            title="删除"
                            @click.stop="removeIcon(idx)"
                          >
                            <el-icon><Delete /></el-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>

                <div class="assets-footer">
                  <el-button type="primary" @click="openUploadDialog"
                    >添加图片</el-button
                  >
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-aside>
    </el-container>
    <!-- 上传图片对话框 -->
    <el-dialog
      v-model="uploadDialogVisible"
      title="添加图片"
      width="420px"
      :append-to-body="true"
      class="upload-dialog"
    >
      <div class="upload-box">
        <div class="upload-drop">
          <el-upload
            drag
            :auto-upload="false"
            :multiple="true"
            accept="image/*"
            :show-file-list="false"
            v-model:file-list="uploadFiles"
            class="upload-el"
          >
            <div class="upload-placeholder">
              <img :src="uploadCloudIcon" alt="上传" />
              <div class="upload-tip">点击上传</div>
            </div>
          </el-upload>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button plain @click="onUploadCancel">取消</el-button>
          <el-button type="primary" @click="onUploadSubmit">提交</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 新增题目改为直接创建空模板，无需选择弹窗 -->
  </div>
</template>

<script setup lang="ts">
import {ref, computed, defineAsyncComponent, provide} from 'vue'
import {CourseTemplateProviderKey} from '@aipbl/common/components/CourseTemplate/provider' // 2. 导入 Key
import {VueDraggable} from 'vue-draggable-plus'
import {
  ElContainer,
  ElAside,
  ElMain,
  ElButton,
  ElTabs,
  ElTabPane,
  ElEmpty,
  ElMessage,
  ElMessageBox,
  ElDialog,
  ElUpload
} from 'element-plus'
import {ElIcon} from 'element-plus'
import {
  Delete,
  Plus,
  Rank,
  ArrowLeft,
  ArrowRight
} from '@element-plus/icons-vue'
import {getTemplateDefaultData} from '@aipbl/common/components/CourseTemplate/templateDefaults' //导入编辑完成后给后端的json格式
import {CourseDataType} from '@aipbl/common/components/CourseTemplate/type'
import {v4 as uuidv4} from 'uuid'
import bookIcon from '@aipbl/common/assets/icons/book.svg'
import bigBookIcon from '@aipbl/common/assets/icons/bigBook.svg'
import uploadCloudIcon from '@aipbl/common/assets/icons/uploadImg.svg'
import {defaultImageUrls, defaultIconUrls} from '@aipbl/common/assets/registry'
import type {UploadUserFile} from 'element-plus'
// 模板预览图（静态导入以确保打包器正确处理路径）
import previewConnection from '@aipbl/common/assets/templatePreview/connection.png'
import previewChoice from '@aipbl/common/assets/templatePreview/choice.png'
import previewDrag from '@aipbl/common/assets/templatePreview/drag.png'
import previewExpress from '@aipbl/common/assets/templatePreview/express.png'
import previewFind from '@aipbl/common/assets/templatePreview/find.png'
import previewMemory from '@aipbl/common/assets/templatePreview/memory.png'
import previewDraw from '@aipbl/common/assets/templatePreview/draw.png'
// 异步加载模板组件，提高初始加载性能
const ConnectionTemplate = defineAsyncComponent(
  () => import('@aipbl/common/components/CourseTemplate/ConnectionTemplate.vue')
)
const ChoicesTemplate = defineAsyncComponent(
  () => import('@aipbl/common/components/CourseTemplate/ChoicesTemplate.vue')
)
const DragTemplate = defineAsyncComponent(
  () => import('@aipbl/common/components/CourseTemplate/DragTemplate.vue')
)
const FindTemplate = defineAsyncComponent(
  () => import('@aipbl/common/components/CourseTemplate/FindTemplate.vue')
)
const MemoryTemplate = defineAsyncComponent(
  () => import('@aipbl/common/components/CourseTemplate/MemoryTemplate.vue')
)
const DrawTemplate = defineAsyncComponent(
  () => import('@aipbl/common/components/CourseTemplate/DrawTemplate.vue')
)
const ExpressTemplate = defineAsyncComponent(
  () => import('@aipbl/common/components/CourseTemplate/ExpressTemplate.vue')
)
const templateMap: {[key: string]: any} = {
  connection: ConnectionTemplate,
  choices: ChoicesTemplate,
  drag: DragTemplate,
  find: FindTemplate,
  memory: MemoryTemplate,
  draw: DrawTemplate,
  express: ExpressTemplate
}

//课程数据
const courseData = ref<CourseDataType<any>>({
  courseName: 'AI 应用课',
  version: '1.0.0',
  meta: {
    author: 'nas',
    createTime: '',
    updateTime: ''
  },
  pages: []
})
//当前选中页面index
const selectedPageIndex = ref<number | null>(
  courseData.value.pages.length > 0 ? 0 : null
)
//编辑区状态
const isEdit = ref(true) // 控制编辑/预览模式，true = 编辑
//传入模板数据
provide(CourseTemplateProviderKey, {
  isEdit,
  courseData,
  selectedPageIndex
})
//页面使用模板的名字
const getTemplateName = (type: string): string => {
  return (
    {
      connection: '连一连',
      choices: '选一选',
      drag: '拖一拖',
      memory: '记忆卡片',
      find: '找一找',
      definition: '定义',
      express: '表达',
      draw: '画一画'
    }[type] || '请选择模板'
  )
}
const templateOpt = [
  {
    value: 'connection',
    label: '连一连',
    img: previewConnection
  },
  {
    value: 'choices',
    label: '选一选',
    img: previewChoice
  },
  {
    value: 'drag',
    label: '拖一拖',
    img: previewDrag
  },
  {
    value: 'express',
    label: '表达',
    img: previewExpress
  },
  {
    value: 'find',
    label: '找一找',
    img: previewFind
  },
  {
    value: 'memory',
    label: '记忆卡片',
    img: previewMemory
  },
  {
    value: 'draw',
    label: '画一画',
    img: previewDraw
  }
]
// 旧弹窗状态已不再使用
//编辑区选择页面操作
const selectPage = (index: number) => {
  selectedPageIndex.value = index
}
const currentPageData = computed(() => {
  const index = selectedPageIndex.value
  if (index !== null) {
    return courseData.value.pages[index]
  }
  return null
})
// 顶部栏标题与副标题
const topTitle = computed(() => courseData.value.courseName || '课程编辑')
const subTitle = computed(() => {
  if (selectedPageIndex.value !== null) {
    return `题目 ${formatIndex(selectedPageIndex.value + 1)}`
  }
  return '请选择题目'
})
// 右侧栏状态
const rightCollapsed = ref(false)
const activeRightTab = ref('templates')
const toggleRightSidebar = () => {
  rightCollapsed.value = !rightCollapsed.value
}
// 统一控制右侧栏宽度与主区留白
const RIGHT_EXPANDED = 400
const RIGHT_COLLAPSED = 80
const rightSidebarWidth = computed(
  () => `${rightCollapsed.value ? RIGHT_COLLAPSED : RIGHT_EXPANDED}px`
)
const mainPaddingRight = computed(
  () => `${rightCollapsed.value ? 0 : RIGHT_EXPANDED}px`
)
const templateComponent = computed(() => {
  if (!currentPageData.value) return null
  return templateMap[currentPageData.value.templateType]
})

// 右侧模板项选中态判断
const isSelectedTemplate = (type: string) => {
  return currentPageData.value?.templateType === type
}

// 素材库：子标签
const activeAssetTab = ref<'images' | 'icons'>('images')
// 通过 common 包的 registry 统一提供默认素材
const imageAssets = ref<string[]>([...defaultImageUrls])
const iconAssets = ref<string[]>([...defaultIconUrls])

// 删除与上传
const removeImage = (idx: number) => {
  imageAssets.value.splice(idx, 1)
}
const removeIcon = (idx: number) => {
  iconAssets.value.splice(idx, 1)
}
const uploadDialogVisible = ref(false)
const uploadFiles = ref<UploadUserFile[]>([])
const openUploadDialog = () => {
  uploadDialogVisible.value = true
}
const onUploadCancel = () => {
  uploadFiles.value = []
  uploadDialogVisible.value = false
}
const onUploadSubmit = () => {
  // 将选择的文件转为本地 URL，加入图片素材列表
  const files = uploadFiles.value
  for (const f of files) {
    // el-upload 的 UploadUserFile 在选择后包含 raw 对象
    const raw = (f as any).raw as File | undefined
    if (raw) {
      const url = URL.createObjectURL(raw)
      imageAssets.value.unshift(url)
    } else if (f.url) {
      imageAssets.value.unshift(f.url)
    }
  }
  uploadFiles.value = []
  uploadDialogVisible.value = false
  ElMessage.success('图片已添加到素材库（仅本地）')
}

const onEnd = (event: any) => {
  selectedPageIndex.value = event.newIndex
}
//用于重新排序 pageId
const reorderPageIds = () => {
  courseData.value.pages.forEach((page, index) => {
    page.pageId = index + 1
  })
}

const deletePage = (index: number) => {
  ElMessageBox.confirm(
    `确定要删除 "页面 ${index + 1}" 吗? 此操作无法撤销。`,
    '警告',
    {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      if (selectedPageIndex.value == index && index - 1 >= 0) {
        selectedPageIndex.value = index - 1
      }
      courseData.value.pages.splice(index, 1)
      ElMessage({type: 'success', message: '删除成功'})
    })
    .catch(() => {
      // 用户取消操作
    })
}

const handleTemplateChange = (newType: string) => {
  // 如果选择的新模板和当前模板相同，则不执行任何操作
  if (
    !currentPageData.value ||
    newType === currentPageData.value.templateType
  ) {
    return
  }
  ElMessageBox.confirm('切换模板将会丢失当前页面的所有内容，确定吗?', '警告', {
    type: 'warning'
  })
    .then(() => {
      if (currentPageData.value) {
        currentPageData.value.templateType = newType
        currentPageData.value.data = getTemplateDefaultData(newType)
      }
    })
    .catch(() => {
      ElMessage.info('已取消切换')
    })
}

// 右侧栏：点击模板缩略图切换模板（沿用切换确认弹窗）
const onClickTemplateThumb = (newType: string) => {
  if (selectedPageIndex.value === null) {
    ElMessage.warning('请先在左侧选择一个题目')
    return
  }
  handleTemplateChange(newType)
}

// 新增空白题目
const addEmptyPage = () => {
  const idx = courseData.value.pages.length
  const newPage: any = {
    uniqueId: uuidv4(),
    pageId: idx + 1,
    templateType: '',
    data: {},
    title: `题目 ${formatIndex(idx + 1)}`
  }
  courseData.value.pages.push(newPage)
  selectPage(courseData.value.pages.length - 1)
}

const submitCourse = () => {
  reorderPageIds()
  courseData.value.meta.createTime = new Date().toISOString()
  courseData.value.meta.updateTime = new Date().toISOString()
  const CourseJson = JSON.stringify(courseData.value, null, 2) // 格式化JSON
  console.log('--------- 最终生成的课程JSON ---------')
  console.log(CourseJson)
  console.log('------------------------------------')
  ElMessage.success('提交成功')
}

const saveDraft = () => {
  // 可在此处调用后端草稿接口，当前仅做本地提示
  ElMessage.success('草稿已暂存')
}

// 工具：列表标题与状态
const formatIndex = (n: number) => String(n).padStart(2, '0')
// 简单规则：暂时全部展示为完成态，后续可根据 page.data 补充真实状态
const getPageStatus = () => 'success'

// 标题编辑逻辑
const editingIndex = ref<number | null>(null)
const tempTitle = ref('')
const startEditTitle = (index: number) => {
  editingIndex.value = index
  tempTitle.value =
    (courseData.value.pages[index] as any).title ||
    `题目 ${formatIndex(index + 1)}`
}
const finishEditTitle = (index: number) => {
  const v = tempTitle.value.trim()
  ;(courseData.value.pages[index] as any).title =
    v || `题目 ${formatIndex(index + 1)}`
  editingIndex.value = null
}
const cancelEditTitle = () => {
  editingIndex.value = null
}
</script>

<style scoped>
.edit-container {
  /* 顶部栏高度 64px，这里减去避免整体溢出 */
  height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
}

/* 顶部栏样式 */
.page-topbar {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: #f7f9fc; /* 接近原型的浅灰底 */
}
.page-topbar .left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.topbar-book-icon {
  width: 32px;
  height: 32px;
}
.titles {
  display: flex;
  flex-direction: column;
}
.main-title {
  font-size: 18px;
  font-weight: 700;
  color: #3a3a3a;
  line-height: 1.2;
}
.sub-title {
  margin-top: 2px;
  font-size: 14px;
  color: #7a7a7a;
  display: flex;
  align-items: center;
  gap: 8px;
}
.status-badge {
  font-size: 12px;
  color: #fff;
  background: #e06a1b; /* 橙色标签 */
  padding: 2px 8px;
  border-radius: 4px;
}
.page-topbar .right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 预览栏样式 */
.edit-page {
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.aside-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.book-icon {
  width: 18px;
  height: 18px;
}
.edit-page h3 {
  margin: 0;
  color: #303133;
}
.add-page-icon-btn {
  color: #909399;
}
.page-list {
  flex-grow: 1;
  overflow-y: auto;
}

.page-thumbnail {
  border: 1px solid #dcdfe6;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.3s;
}
.page-thumbnail:hover {
  border-color: #c0c4cc;
}
.page-thumbnail.active {
  border-color: #409eff;
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.5);
}
/*拖拽组件动画效果 */
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.fade-move,
.fade-enter-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-leave-active {
  position: absolute;
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(200px, 0);
}

.thumbnail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.thumbnail-header .title {
  display: flex;
  align-items: center;
  gap: 6px;
}
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #67c23a; /* 默认 success */
}
.status-dot.success {
  background-color: #67c23a;
}
.status-dot.warning {
  background-color: #e6a23c;
}
.status-dot.info {
  background-color: #909399;
}

.title-text {
  font-size: 13px; /* 标题略小，贴近原型 */
  font-weight: 600;
  color: #303133;
}
.title-input {
  height: 24px;
  line-height: 24px;
  padding: 0 6px;
  border: 1px solid #cfd6e4;
  border-radius: 4px;
  font-size: 13px;
  color: #303133;
  outline: none;
}
.title-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.15);
}
.subtitle {
  font-size: 12px; /* 副标题更小 */
  color: #909399;
}
.ops .el-button.drag-hint {
  opacity: 0.6;
}
.page-thumbnail .delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
}
.page-thumbnail:hover .delete-btn {
  opacity: 1;
}
/* 增加新页面按钮样式 */
/* .add-page-btn 已移除 */

/* 中间主编辑区样式 */
.main-editor-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5%;
  flex-shrink: 0;
}
.template-selector {
  margin-bottom: 0;
}
.template-display-area {
  margin-top: 20px;
  flex-grow: 1;
  height: 100%;
}

/* 动画过渡 */
.animated-main {
  transition: padding-right 0.25s ease;
}

/* 右侧侧边栏 */
.right-sidebar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  border-left: 1px solid #e4e7ed;
  background: #f7f9fc;
  transition: width 0.25s ease;
}
.collapse-handle {
  position: absolute;
  left: -14px;
  top: 12px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid #e4e7ed;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
.right-content {
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.right-tabs {
  height: 100%;
}
.right-tabs :deep(.el-tabs__content) {
  height: calc(100% - 40px);
  overflow-y: auto;
  overflow-x: hidden;
}
.template-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
.template-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
}
.template-card.selected {
  border-color: #2f68ff;
  box-shadow: 0 0 0 2px rgba(47, 104, 255, 0.15);
}
.preview-box {
  height: 88px;
  background: #f8fafc;
  border: 2px solid #e6eefc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 12px;
}
.preview-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
.preview-box.clickable {
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}
.preview-box.clickable:hover {
  border-color: #2f68ff;
  box-shadow: 0 0 0 2px rgba(47, 104, 255, 0.1);
}
.template-card.selected .preview-box {
  border-color: #2f68ff;
  box-shadow:
    inset 0 0 0 1px #2f68ff,
    0 0 0 2px rgba(47, 104, 255, 0.12);
}
.tpl-title {
  margin-top: 6px;
  font-weight: 600;
  color: #334155;
  font-size: 13px;
}
.template-card.selected .tpl-title {
  color: #2f68ff;
}
/* 已移除按钮布局 */
.assets-pane {
  padding: 4px;
}
.assets-empty {
  height: 120px;
  background: #fff;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}
/* 素材库样式 */
.assets-subtabs {
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
}
.assets-subtabs :deep(.el-tabs__content) {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.asset-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 4px 4px 72px 4px; /* 预留底部按钮区域 */
}
.asset-thumb {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 正方形 */
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.asset-thumb img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
.asset-del {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.assets-footer {
  position: sticky;
  bottom: 0;
  background: linear-gradient(180deg, rgba(247, 249, 252, 0), #f7f9fc 40%);
  padding: 10px 8px 6px;
  display: flex;
  justify-content: flex-end;
}
.upload-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}
.upload-dialog :deep(.el-dialog__header) {
  margin-right: 0;
}
.upload-dialog :deep(.el-dialog__body) {
  padding: 12px 20px 8px 20px;
}
.upload-box {
  display: flex;
  justify-content: center;
}
.upload-drop {
  width: 240px;
}
.upload-el {
  width: 100%;
  height: 100%;
}
.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #003ea5; /* 深蓝，与示例一致 */
}
.upload-placeholder img {
  width: 32px;
  height: 32px;
}
.upload-tip {
  font-size: 14px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
