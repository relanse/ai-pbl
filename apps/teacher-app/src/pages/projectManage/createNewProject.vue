<template>
  <div class="page-wrapper">
    <div class="page-container">
      <!-- Main Content Area -->
      <div class="main-content">
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="form.projectName" placeholder="请输入项目名称" />
          </el-form-item>

          <VueDraggable
            v-model="form.questionBlocks"
            handle=".handle"
            :animation="150"
            class="draggable-area"
            ref="questionBlocksWrapperRef"
          >
            <div
              v-for="(block, index) in form.questionBlocks"
              :id="`block-${block.id}`"
              :key="block.id"
              class="question-block-wrapper"
              @click="activeBlockId = block.id"
              ref="questionBlocksRefs"
            >
              <el-icon class="handle"><Rank /></el-icon>
              <QuestionBlock
                v-model:type="block.type"
                @delete="deleteQuestionBlock(index)"
                class="project-card"
                :class="{'is-active': activeBlockId === block.id}"
              />
            </div>
          </VueDraggable>

          <!-- 新增项目模块按钮 -->
          <div class="add-block-container" @click="addQuestionBlock">
            <div class="add-block-button">
              <el-icon><Plus /></el-icon>
              <span>新增项目模块</span>
            </div>
          </div>
        </el-form>
      </div>

      <!-- Sidebar Area -->
      <div class="sidebar">
        <CardAnchdor
          v-model="activeBlockId"
          :items="anchorItems"
          @click="isClickingAnchor = true"
        />
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="footer-actions">
      <el-button>取消</el-button>
      <el-button type="primary">保存并发布</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 1. 移除了 onMounted, onUnmounted 的导入
import {reactive, ref, computed, watch, onMounted} from 'vue'
import {VueDraggable} from 'vue-draggable-plus'
import QuestionBlock from './common/projectCards/QuestionBlock.vue'
import CardAnchdor from '@/common/CardAnchdor.vue'

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElIcon,
  FormInstance,
  FormRules,
  ElMessage
} from 'element-plus'
import {Plus, Rank} from '@element-plus/icons-vue'

// --- 数据定义部分 (无变化) ---
interface QuestionBlockItem {
  id: number
  type: string
}
interface ProjectForm {
  projectName: string
  questionBlocks: QuestionBlockItem[]
}
const form = reactive<ProjectForm>({
  projectName: '',
  questionBlocks: [{id: Date.now(), type: 'llm'}]
})
const formRef = ref<FormInstance>()
const activeBlockId = ref<number | null>(form.questionBlocks[0]?.id || null)
const rules = reactive<FormRules<ProjectForm>>({
  projectName: [{required: true, message: '请输入项目名称', trigger: 'blur'}]
})
const typeToTitleMap: Record<string, string> = {
  llm: '大语言对话',
  file: '文件',
  choice: '选择题',
  text: '纯文本'
}
const anchorItems = computed(() => {
  return form.questionBlocks.map(block => ({
    id: block.id,
    title: typeToTitleMap[block.type] || '未知类型'
  }))
})
const questionBlocksWrapperRef = ref<HTMLDivElement>()
const questionBlocksRefs = ref<HTMLDivElement[]>()
const questionBlocksOb = ref<IntersectionObserver>()
const blockInView = ref<number[]>([])
watch(
  () => blockInView.value,
  () => {
    console.log(blockInView.value)
    activeBlockId.value = form.questionBlocks?.[blockInView.value[0]]?.id
  }
)
watch(
  () => [form.questionBlocks, questionBlocksRefs.value],
  () => {
    if (questionBlocksOb.value) {
      questionBlocksOb.value.disconnect()
    }
    const ob = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio <= 0.3) {
            blockInView.value?.filter(
              item =>
                item !==
                questionBlocksRefs.value?.findIndex(r => r === entry.target)
            )
          } else {
            const idx =
              questionBlocksRefs.value?.findIndex(
                item => item === entry.target
              ) || 0
            blockInView.value = Array.from(new Set([...blockInView.value, idx]))
          }
        })
      },
      {threshold: 0.3}
    )
    questionBlocksOb.value = ob

    questionBlocksRefs.value?.forEach(blockRef => {
      ob.observe(blockRef)
    })
  },
  {
    immediate: true
  }
)

// --- 方法定义部分 (无变化) ---
const addQuestionBlock = () => {
  const newBlock = {id: Date.now(), type: 'llm'}
  form.questionBlocks = [...form.questionBlocks, newBlock]
  // form.questionBlocks.push(newBlock)
  activeBlockId.value = newBlock.id
}
const deleteQuestionBlock = (index: number) => {
  if (form.questionBlocks.length <= 1) {
    ElMessage.error('至少保留一个项目模块')
    return
  }
  const deletedBlockId = form.questionBlocks[index].id
  form.questionBlocks.splice(index, 1)
  if (activeBlockId.value === deletedBlockId) {
    const newActiveIndex = Math.max(0, index - 1)
    activeBlockId.value = form.questionBlocks[newActiveIndex]?.id || null
  }
}

// 2. 引入一个标志位，防止滚动监听和点击事件冲突
const isClickingAnchor = ref(false)

// 3. 保留 watch 逻辑，但增加冲突判断
watch(activeBlockId, (newId, oldId) => {
  // 只有在点击导航时（isClickingAnchor 为 true）才执行滚动
  if (newId && newId !== oldId && isClickingAnchor.value) {
    const element = document.getElementById(`block-${newId}`)
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'center'})
      // 滚动动画结束后，重置标志位
      setTimeout(() => {
        isClickingAnchor.value = false
      }, 1000) // 1秒的延迟足够大部分滚动动画完成
    }
  }
})

// 4. 在 CardAnchdor 组件上监听点击事件，以触发滚动
// (这部分需要在 template 中修改，我将一并提供)
</script>

<style scoped>
/* 移除 .page-wrapper 和 .page-container 的高度和溢出控制 */
.page-wrapper {
  display: flex;
  flex-direction: column;
}
.page-container {
  display: flex;
  align-items: flex-start; /* 确保侧边栏从顶部对齐，有利于粘性定位 */
  gap: 24px;
  padding: 20px;
}
/* 移除 .main-content 的内部滚动条 */
.main-content {
  flex: 1;
  min-width: 0; /* 防止 flex 布局溢出 */
}
/* 确保侧边栏使用粘性定位，并依赖父级（Layout）的滚动条 */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 20px; /* 您可以根据 Layout 的顶部栏高度调整此值 */
}
.el-input {
  width: 100%;
}
.question-block-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 8px;
  /* 为滚动定位增加一个上边距，避免被顶部导航遮挡 */
  scroll-margin-top: 100px;
}
.handle {
  cursor: move;
  font-size: 20px;
  color: #909399;
  margin-top: 8px;
}
.project-card {
  flex-grow: 1;
  transition: box-shadow 0.3s;
}
.project-card.is-active {
  box-shadow: 0px 0px 12px rgba(64, 158, 255, 0.5);
}
.add-block-container {
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 30px;
}
.add-block-container:hover {
  border-color: #409eff;
}
.add-block-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #409eff;
  font-size: 14px;
}
.footer-actions {
  text-align: center;
  padding: 20px;
  background: #fff;
  border-top: 1px solid #e4e7ed;
}
</style>
