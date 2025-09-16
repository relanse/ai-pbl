<template>
  <div class="exercise-wrapper">
    <!-- 左侧课程进度条 -->
    <div class="progress-sidebar">
      <div class="course-progress">
        <div class="course-info">
          <div class="course-title">{{ courseTitle }}</div>
        </div>

        <div class="progress-bar-container">
          <!-- 进度百分比显示 -->
          <div class="progress-percentage">
            {{ currentQuestionIndex + 1 }}
            <span class="percentage-symbol">/{{ questions.length }}</span>
          </div>

          <!-- 简单垂直进度条 -->
          <div class="simple-progress-bar">
            <!-- 蓝色小球，独立定位 -->
            <div
              v-if="questionProgressPercentage > 0"
              class="progress-ball"
              :style="{top: `${questionProgressPercentage}%`}"
            ></div>
            <!-- 进度填充条 -->
            <div
              class="progress-fill"
              :style="{height: `${questionProgressPercentage}%`}"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧主内容区 -->
    <div class="main-content">
      <!-- 顶部导航 -->
      <div class="top-navigation">
        <BackButton :to="`/course/detail/${courseId}`" />
        <div class="question-counter">
          题目 {{ currentQuestionIndex + 1 }}/{{ questions.length }}
        </div>
      </div>

      <!-- 题目内容区域 -->
      <div class="question-content">
        <component :is="currentQuestionComponent" />
      </div>

      <!-- 底部导航按钮 -->
      <div class="bottom-navigation">
        <MyButton
          v-if="currentQuestionIndex > 0"
          class="nav-button secondary"
          @click="previousQuestion"
        >
          <MyIcon name="backArrow" style="margin-right: 8px" />
          上一题
        </MyButton>

        <div class="nav-spacer"></div>

        <MyButton
          v-if="currentQuestionIndex < questions.length - 1"
          class="nav-button primary"
          @click="nextQuestion"
          :disabled="!currentQuestionAnswered"
        >
          下一题
          <MyIcon
            name="backArrow"
            style="margin-left: 8px; transform: rotate(180deg)"
          />
        </MyButton>

        <MyButton
          v-else
          class="nav-button primary"
          @click="finishExercise"
          :disabled="!currentQuestionAnswered"
        >
          完成练习
        </MyButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, provide, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import BackButton from '@/components/common/BackButton.vue'
import MyButton from '@/components/common/MyButton.vue'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'

// 导入题目模板组件
import FindTemplate from '@aipbl/common/components/CourseTemplate/FindTemplate.vue'
import MemoryTemplate from '@aipbl/common/components/CourseTemplate/MemoryTemplate.vue'
import DragTemplate from '@aipbl/common/components/CourseTemplate/DragTemplate.vue'
import DrawTemplate from '@aipbl/common/components/CourseTemplate/DrawTemplate.vue'
import ExpressTemplate from '@aipbl/common/components/CourseTemplate/ExpressTemplate.vue'

// 导入 Provider
import {CourseTemplateProviderKey} from '@aipbl/common/components/CourseTemplate/provider'

// 导入背景图片
import DefaultFindBackground from '@aipbl/common/assets/backgrounds/DefaultFindBackground.png'

defineOptions({
  name: 'ExercisePage'
})

// 路由相关
const route = useRoute()
const router = useRouter()
const courseId = route.params.id as string

// 课程信息
const courseTitle = ref('AI基础认知课程')

// 题目相关数据
const currentQuestionIndex = ref(0)
const currentQuestionAnswered = ref(false)

// 模拟题目数据
const questions = ref([
  {
    id: 1,
    type: 'find', // 对应 FindTemplate
    data: {
      prompt: '找一找下面有什么用到AI的物品',
      backgroundImg: DefaultFindBackground,
      items: [
        {id: 1, x: 100, y: 200, found: false, name: '智能手机'},
        {id: 2, x: 300, y: 150, found: false, name: '智能音箱'},
        {id: 3, x: 200, y: 300, found: false, name: '扫地机器人'}
      ]
    }
  },
  {
    id: 2,
    type: 'express', // 对应 ExpressTemplate
    data: {
      prompt: '请描述一下你对人工智能的理解',
      title: 'AI理解表达',
      textareaExample: '请描述你对AI的理解，包括它的应用和影响...',
      textareaInput: '',
      category: '表达',
      cards: [
        {
          id: '1',
          name: '优化表达',
          icon: '',
          prompt: '请帮我优化这段关于AI的表达，使其更加准确和完整。'
        },
        {
          id: '2',
          name: '补充观点',
          icon: '',
          prompt: '请帮我补充更多关于AI的观点和见解。'
        }
      ]
    }
  },
  {
    id: 3,
    type: 'drag',
    data: {
      prompt: '请将下面的AI应用拖拽到正确的分类中。',
      title: 'AI应用分类',
      subtitle: '将应用拖到正确的类别',
      itemmean: 'AI应用',
      items: [
        {id: '1', title: '语音识别', color: '#649FFE'},
        {id: '2', title: '图像识别', color: '#FF9401'},
        {id: '3', title: '机器翻译', color: '#6EE188'},
        {id: '4', title: '自动驾驶', color: '#A9A7FB'}
      ],
      targetmean: '应用领域',
      targets: [
        {
          id: '1',
          title: '自然语言处理',
          subtitle: 'NLP相关应用',
          correctItems: ['语音识别', '机器翻译']
        },
        {
          id: '2',
          title: '计算机视觉',
          subtitle: 'CV相关应用',
          correctItems: ['图像识别', '自动驾驶']
        }
      ]
    }
  }
])

// 转换题目数据为 CourseTemplate 期望的格式
const courseDataForProvider = computed(() => ({
  courseName: courseTitle.value,
  version: '1.0.0',
  meta: {
    author: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  pages: questions.value.map((question, index) => ({
    uniqueId: `question-${question.id}`,
    pageId: index,
    templateType: question.type,
    data: question.data
  }))
}))

// 提供 CourseTemplate 需要的数据（必须在组件渲染前提供）
provide(CourseTemplateProviderKey, {
  isEdit: ref(false),
  courseData: courseDataForProvider,
  selectedPageIndex: currentQuestionIndex
})

// 调试日志
console.log('当前题目索引:', currentQuestionIndex.value)
console.log('courseDataForProvider:', courseDataForProvider.value)
console.log(
  '当前题目:',
  courseDataForProvider.value.pages[currentQuestionIndex.value]
)

// 计算属性
const questionProgressPercentage = computed(() => {
  if (questions.value.length <= 1) return 0
  return (currentQuestionIndex.value / (questions.value.length - 1)) * 100
})

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value]
})

const currentQuestionComponent = computed(() => {
  const componentMap: Record<string, any> = {
    find: FindTemplate, // 找一找游戏
    drag: DragTemplate,
    draw: DrawTemplate,
    express: ExpressTemplate
  }

  return componentMap[currentQuestion.value?.type] || FindTemplate
})

// 题目完成状态检测
const isCurrentQuestionCompleted = computed(() => {
  const question = currentQuestion.value
  if (!question) return false

  switch (question.type) {
    case 'find':
      // Find类型：所有物品都被找到
      if (
        question.data &&
        'items' in question.data &&
        Array.isArray(question.data.items)
      ) {
        return question.data.items.every((item: any) => item.found === true)
      }
      return false

    case 'express':
      // Express类型：输入了文本内容
      if (
        question.data &&
        'textareaInput' in question.data &&
        question.data.textareaInput
      ) {
        return (question.data.textareaInput as string).trim().length > 10 // 至少输入10个字符
      }
      return false

    case 'drag':
      // Drag类型：所有物品都被正确拖拽到目标区域
      // 这里需要检查拖拽逻辑，暂时返回false
      return false

    default:
      return false
  }
})

// 监听题目完成状态
watch(isCurrentQuestionCompleted, isCompleted => {
  if (isCompleted && !currentQuestionAnswered.value) {
    currentQuestionAnswered.value = true

    // 显示完成提示
    ElMessage.success('太棒了！题目完成！')

    // 2秒后自动进入下一题
    setTimeout(() => {
      if (currentQuestionIndex.value < questions.value.length - 1) {
        nextQuestion()
      } else {
        // 如果是最后一题，显示完成提示
        ElMessage.success('恭喜完成所有练习！')
      }
    }, 2000)
  }
})

// 方法
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    currentQuestionAnswered.value = false
    updateMobileProgressDot()
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    currentQuestionAnswered.value = false
    updateMobileProgressDot()
  }
}

const finishExercise = () => {
  ElMessage.success('恭喜完成练习！')
  // 这里可以跳转到成绩页面或返回课程详情
  router.push(`/course/detail/${courseId}`)
}

// 生命周期
onMounted(() => {
  console.log('题目页面已加载，课程ID:', courseId)
  updateMobileProgressDot()
  window.addEventListener('resize', updateMobileProgressDot)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMobileProgressDot)
})

// 更新移动端进度条宽度
const updateMobileProgressDot = () => {
  if (window.innerWidth <= 768) {
    const progressWidth = questionProgressPercentage.value
    document.documentElement.style.setProperty(
      '--progress-width',
      `${progressWidth}%`
    )
  }
}
</script>

<style scoped>
.exercise-wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f6f8fa;
  overflow: hidden;
}

/* 左侧进度条样式 */
.progress-sidebar {
  width: 280px;
  background: linear-gradient(180deg, #e7f0ff 0%, #dde8ff 100%);
  padding: 30px 20px;
  flex-shrink: 0;
  border-right: 1px solid #e0e6ff;
}

.course-progress {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.course-info {
  text-align: center;
  margin-bottom: 30px;
}

.course-title {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8px;
}

.progress-text {
  font-size: 14px;
  color: #026bff;
  font-weight: 600;
}

.progress-bar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  margin: 20px 0;
}

.progress-percentage {
  font-size: 28px;
  font-weight: bold;
  color: #026bff;
  text-align: center;
  margin-bottom: 10px;
}

.progress-percentage .percentage-symbol {
  font-size: 20px;
  color: #999;
  font-weight: normal;
}

.simple-progress-bar {
  width: 8px;
  height: 100%;
  background-color: #e0e6ff;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  min-height: 300px;
}

.progress-fill {
  width: 100%;
  background: linear-gradient(180deg, #026bff 0%, #4a90e2 100%);
  border-radius: 4px;
  transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  top: 0; /* 从顶部开始填充 */
}

.progress-ball {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #026bff, #4a90e2);
  border-radius: 50%;
  border: 3px solid #ffffff;
  box-shadow: 0 2px 8px rgba(2, 107, 255, 0.3);
  transition: top 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10; /* 确保在进度条上方 */
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  overflow-y: auto;
}

.top-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e6ed;
  flex-shrink: 0;
}

.question-counter {
  font-size: 16px;
  font-weight: 600;
  color: #026bff;
  background-color: #e7f0ff;
  padding: 8px 16px;
  border-radius: 20px;
}

.robot-section {
  padding: 20px 30px;
  background-color: #f8f9fa;
  flex-shrink: 0;
}

.question-content {
  flex: 1;
  padding: 20px 30px;
  overflow-y: auto;
  min-height: 0;
}

.bottom-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #ffffff;
  border-top: 1px solid #e0e6ed;
  flex-shrink: 0;
}

.nav-spacer {
  flex: 1;
}

.nav-button {
  display: flex;
  align-items: center;
  min-width: 120px;
  justify-content: center;
}

.nav-button.secondary {
  background: transparent;
  border: 1px solid #026bff;
  color: #026bff;
}

.nav-button.secondary:hover {
  background-color: #e7f0ff;
}

.nav-button.primary {
  background: linear-gradient(135deg, #026bff, #4a90e2);
  border: none;
  color: white;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .progress-sidebar {
    width: 240px;
    padding: 20px 15px;
  }

  .course-title {
    font-size: 16px;
  }

  .step-label {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .exercise-wrapper {
    flex-direction: column;
  }

  .progress-sidebar {
    width: 100%;
    height: 120px;
    padding: 15px;
    border-right: none;
    border-bottom: 1px solid #e0e6ff;
  }

  .progress-bar-container {
    flex-direction: row;
    height: 60px;
    align-items: center;
    gap: 15px;
  }

  .progress-percentage {
    font-size: 20px;
    margin-bottom: 0;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .simple-progress-bar {
    height: 8px;
    width: 100%;
    min-height: auto;
  }

  .progress-fill {
    height: 100%;
    width: var(--progress-width, 0%);
    left: 0;
    bottom: auto;
  }

  .progress-ball {
    top: 50%;
    left: var(--progress-width, 0%);
    transform: translateY(-50%) translateX(-50%);
    bottom: auto;
  }

  .main-content {
    flex: 1;
  }

  .top-navigation,
  .bottom-navigation {
    padding: 15px 20px;
  }

  .question-content {
    padding: 15px 20px;
  }
}
</style>
