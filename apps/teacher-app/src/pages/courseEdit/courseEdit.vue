<template>
  <div>
    <el-container class="edit-container">
      <!-- 侧边预览区 -->
      <el-aside width="250px" class="edit-page">
        <h3>课程页面</h3>
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
                <span>页面 {{ index + 1 }}</span>
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  @click.stop="deletePage(index)"
                />
              </div>
              <small>{{ getTemplateName(page.templateType) }}</small>
            </div>
          </TransitionGroup>
        </VueDraggable>

        <el-button
          class="add-page-btn"
          type="primary"
          @click="addPageDialogVisible = true"
          :icon="Plus"
          long
        >
          增加页面
        </el-button>
      </el-aside>
      <!--顶部工具栏和编辑区-->
      <el-main>
        <div v-if="currentPageData" class="main-editor-content">
          <!-- 顶部工具栏 -->
          <div class="toolbar">
            <el-form-item label="页面模板:" class="template-selector">
              <el-select
                :model-value="currentPageData.templateType"
                placeholder="切换页面模板"
                @change="handleTemplateChange"
                :disabled="!isEdit"
                style="width: 100px"
              >
                <el-option
                  v-for="item in templateOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <div class="action-buttons">
              <el-button
                @click="isEdit = !isEdit"
                :type="isEdit ? 'primary' : 'danger'"
              >
                {{ isEdit ? '预览交互' : '返回编辑 ' }}
              </el-button>
              <el-button type="success" @click="submitCourse">
                提交课程
              </el-button>
            </div>
          </div>
          <div class="template-display-area">
            <component :is="templateComponent" v-if="templateComponent" />
          </div>
        </div>
        <el-empty v-else description="请从左侧选择一个页面，或新增一个页面" />
      </el-main>
    </el-container>
    <!--创建新页面el-dialog对话框-->
    <AddPageDialog
      v-model="addPageDialogVisible"
      :opt="templateOpt"
      @confirm="confirmAddPage"
    />
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
  ElSelect,
  ElOption,
  ElEmpty,
  ElMessage,
  ElMessageBox,
  ElFormItem
} from 'element-plus'
import {Delete, Plus} from '@element-plus/icons-vue'
import {getTemplateDefaultData} from '@aipbl/common/components/CourseTemplate/templateDefaults' //导入编辑完成后给后端的json格式
import {CourseDataType} from '@aipbl/common/components/CourseTemplate/type'
import {v4 as uuidv4} from 'uuid'
import AddPageDialog from './AddPageDialog.vue'
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
    }[type] || '未知模板'
  )
}
const templateOpt = [
  {value: 'connection', label: '连一连'},
  {value: 'choices', label: '选一选'},
  {value: 'drag', label: '拖一拖'},
  {value: 'express', label: '表达'},
  {value: 'find', label: '找一找'},
  {value: 'memory', label: '记忆卡片'},
  {value: 'draw', label: '画一画'}
]
const addPageDialogVisible = ref(false)
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
const templateComponent = computed(() => {
  if (!currentPageData.value) return null
  return templateMap[currentPageData.value.templateType]
})

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

const confirmAddPage = (templateType: string) => {
  const newPage = {
    //创建时，uniqueId 用于内部追踪，pageId 用于排序
    uniqueId: uuidv4(),
    pageId: courseData.value.pages.length + 1, // 新页面的 pageId 就是当前长度+1
    templateType: templateType,
    data: getTemplateDefaultData(templateType)
  }
  courseData.value.pages.push(newPage)
  selectPage(courseData.value.pages.length - 1)
  addPageDialogVisible.value = false
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
</script>

<style scoped>
.edit-container {
  height: 100vh;
}

/* 预览栏样式 */
.edit-page {
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.edit-page h3 {
  margin-top: 0;
  color: #303133;
  text-align: center;
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
  font-weight: bold;
  margin-bottom: 5px;
}

.page-thumbnail small {
  color: #909399;
}
/* 增加新页面按钮样式 */
.add-page-btn {
  width: 100%;
  margin-top: 15px;
}

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
  overflow-y: auto; /* 如果模板内容过高，允许滚动 */
}
</style>
