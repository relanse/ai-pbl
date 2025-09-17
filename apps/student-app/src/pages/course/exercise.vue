<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, provide} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import BackButton from '@/components/common/BackButton.vue'
import MyButton from '@/components/common/MyButton.vue'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import {mockQuestions, type QuestionData} from '@/temp-data/mockQuestions'
import {CourseTemplateProviderKey} from '@aipbl/common/components/CourseTemplate/provider'

// 导入题目模板组件
import ChoicesTemplate from '@aipbl/common/components/CourseTemplate/ChoicesTemplate.vue'
import ConnectionTemplate from '@aipbl/common/components/CourseTemplate/ConnectionTemplate.vue'
import DragTemplate from '@aipbl/common/components/CourseTemplate/DragTemplate.vue'
import DrawTemplate from '@aipbl/common/components/CourseTemplate/DrawTemplate.vue'
import ExpressTemplate from '@aipbl/common/components/CourseTemplate/ExpressTemplate.vue'
import FindTemplate from '@aipbl/common/components/CourseTemplate/FindTemplate.vue'
import MemoryTemplate from '@aipbl/common/components/CourseTemplate/MemoryTemplate.vue'
import IntroTemplate from '@aipbl/common/components/CourseTemplate/IntroTemplate.vue'

defineOptions({
  name: 'ExercisePage'
})

// 路由相关
const route = useRoute()
const router = useRouter()
const courseId = route.params.id as string

// 课程信息
const courseTitle = ref('AI基础认知课程')
const totalSteps = ref(12)
const currentStep = ref(3) // 当前进度步骤

// 题目相关数据
const currentQuestionIndex = ref(0)
const currentQuestionAnswered = ref(false)

// 使用测试题目数据
const questions = ref<QuestionData[]>(mockQuestions)

// 为模板组件提供数据 Provider
const courseData = ref({
  courseName: 'AI基础认知课程',
  version: '1.0.0',
  meta: {
    author: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  pages: questions.value.map((question, index) => ({
    uniqueId: `question_${question.id}`,
    pageId: index,
    templateType: question.type,
    data: question.data
  }))
})

const selectedPageIndex = ref(0) // 当前选中的页面索引
const isEdit = ref(false) // 非编辑模式

// 提供 Provider 数据
provide(CourseTemplateProviderKey, {
  isEdit,
  courseData,
  selectedPageIndex
})

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
    choices: ChoicesTemplate,
    connection: ConnectionTemplate,
    drag: DragTemplate,
    draw: DrawTemplate,
    express: ExpressTemplate,
    find: FindTemplate,
    memory: MemoryTemplate,
    intro: IntroTemplate
  }

  return componentMap[currentQuestion.value?.type] || ChoicesTemplate
})

// 方法
const handleAnswer = (answerData: any) => {
  console.log('用户答案:', answerData)
  currentQuestionAnswered.value = true

  if (answerData.isCorrect) {
    console.log('答案正确！准备跳转下一题')
    // 正确答案的处理逻辑已经在模板组件中处理（显示消息和自动跳转）
  } else {
    console.log('答案错误，正确答案是:', answerData.correctAnswer)
    // 错误答案的处理逻辑已经在模板组件中处理（显示正确答案）
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    selectedPageIndex.value = currentQuestionIndex.value // 同步页面索引
    currentQuestionAnswered.value = false
    updateMobileProgressDot()
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    selectedPageIndex.value = currentQuestionIndex.value // 同步页面索引
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
  console.log('总题目数量:', questions.value.length)
  console.log('当前题目数据:', currentQuestion.value)
  console.log('当前题目类型:', currentQuestion.value?.type)
  console.log('Provider 数据:', courseData.value)

  // 确保初始状态同步
  selectedPageIndex.value = currentQuestionIndex.value

  updateMobileProgressDot()
  window.addEventListener('resize', updateMobileProgressDot)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMobileProgressDot)
})

// 更新移动端进度点位置
const updateMobileProgressDot = () => {
  if (window.innerWidth <= 768) {
    const progressLeft = questionProgressPercentage.value
    document.documentElement.style.setProperty(
      '--progress-left',
      `${progressLeft}%`
    )
  }
}
</script>

<template>
  <div class="exercise-wrapper">
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
        <component
          :is="currentQuestionComponent"
          :questionData="currentQuestion"
          @answer="handleAnswer"
          @next="nextQuestion"
        />
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

<style scoped>
.exercise-wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f6f8fa;
  overflow: hidden;
}

@keyframes dotPulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.9),
      0 2px 8px rgba(2, 107, 255, 0.4),
      0 0 0 8px rgba(2, 107, 255, 0.1);
  }
  50% {
    transform: scale(1.1);
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.9),
      0 2px 12px rgba(2, 107, 255, 0.6),
      0 0 0 12px rgba(2, 107, 255, 0.2);
  }
}

.question-marker.completed .marker-circle {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
}

.question-marker.current .marker-circle {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
  box-shadow: 0 2px 6px rgba(255, 152, 0, 0.3);
  animation: currentMarkerPulse 2s infinite;
}

.question-marker.upcoming .marker-circle {
  background-color: #f0f0f0;
  color: #999;
  border: 2px solid #e0e0e0;
}

.question-marker.completed .marker-label {
  color: #4caf50;
}

.question-marker.current .marker-label {
  color: #ff9800;
  font-weight: 600;
}

@keyframes currentMarkerPulse {
  0% {
    box-shadow: 0 2px 6px rgba(255, 152, 0, 0.3);
  }
  50% {
    box-shadow:
      0 2px 6px rgba(255, 152, 0, 0.6),
      0 0 0 6px rgba(255, 152, 0, 0.1);
  }
  100% {
    box-shadow: 0 2px 6px rgba(255, 152, 0, 0.3);
  }
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

@media (max-width: 768px) {
  .exercise-wrapper {
    flex-direction: column;
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
