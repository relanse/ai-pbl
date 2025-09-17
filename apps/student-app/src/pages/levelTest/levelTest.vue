<template>
  <div class="level-test-wrapper">
    <CommonAside class="sidebar" />
    <div class="level-test-maintainer">
      <span>等级考试</span>

      <!-- 考试统计 -->
      <div class="test-stats">
        <div class="stats-card">
          <div class="stats-number">{{ passedTests.length }}</div>
          <div class="stats-label">已通过考试</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ availableTests.length }}</div>
          <div class="stats-label">可参加考试</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ currentLevel }}</div>
          <div class="stats-label">当前等级</div>
        </div>
      </div>

      <!-- 等级考试路径 -->
      <div class="level-path">
        <h3 class="section-title">考试路径</h3>
        <div class="path-container">
          <div
            class="level-node"
            v-for="(level, index) in levelPath"
            :key="level.id"
            :class="{
              completed: level.status === 'completed',
              current: level.status === 'current',
              locked: level.status === 'locked'
            }"
          >
            <div class="node-circle">
              <MyIcon
                :name="
                  level.status === 'completed'
                    ? 'certificate'
                    : level.status === 'current'
                      ? 'levelTest'
                      : 'lock'
                "
                class="node-icon"
              />
            </div>
            <div class="node-info">
              <div class="node-title">{{ level.name }}</div>
              <div class="node-description">{{ level.description }}</div>
            </div>
            <div class="connector" v-if="index < levelPath.length - 1"></div>
          </div>
        </div>
      </div>

      <!-- 可参加的考试 -->
      <div class="section">
        <h3 class="section-title">可参加的考试</h3>
        <div class="test-grid">
          <el-card
            shadow="never"
            class="test-card available"
            v-for="test in availableTests"
            :key="test.id"
          >
            <template #header>
              <div class="test-header">
                <MyIcon name="levelTest" class="test-icon" />
                <span class="test-title">{{ test.title }}</span>
                <span class="test-level" :class="test.difficulty">{{
                  test.levelText
                }}</span>
              </div>
            </template>
            <div class="test-content">
              <img :src="test.image" alt="Test Image" class="test-image" />
              <div class="test-info">
                <p class="test-description">{{ test.description }}</p>
                <div class="test-details">
                  <div class="detail-item">
                    <MyIcon name="book" style="font-size: 14px" />
                    <span>{{ test.questionCount }} 道题目</span>
                  </div>
                  <div class="detail-item">
                    <MyIcon name="user" style="font-size: 14px" />
                    <span>{{ test.duration }} 分钟</span>
                  </div>
                  <div class="detail-item">
                    <MyIcon name="certificate" style="font-size: 14px" />
                    <span>及格线: {{ test.passingScore }}%</span>
                  </div>
                </div>
                <div class="test-requirements" v-if="test.requirements">
                  <div class="requirement-title">参考条件:</div>
                  <ul class="requirement-list">
                    <li v-for="req in test.requirements" :key="req">
                      {{ req }}
                    </li>
                  </ul>
                </div>
                <div class="test-actions">
                  <MyButton
                    class="start-test-button"
                    @click="startTest(test)"
                    :disabled="!canTakeTest(test)"
                  >
                    <span style="font-size: 14px; color: #ffffff">
                      {{ canTakeTest(test) ? '开始考试' : '条件不足' }}
                    </span>
                  </MyButton>
                  <MyButton
                    class="preview-button"
                    type="default"
                    @click="previewTest(test)"
                  >
                    <span style="font-size: 14px">预览题目</span>
                  </MyButton>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 已通过的考试 -->
      <div class="section">
        <h3 class="section-title">已通过的考试</h3>
        <div class="test-grid">
          <el-card
            shadow="never"
            class="test-card passed"
            v-for="test in passedTests"
            :key="test.id"
          >
            <template #header>
              <div class="test-header">
                <MyIcon name="certificate" class="test-icon passed" />
                <span class="test-title">{{ test.title }}</span>
                <span class="test-score">{{ test.score }}分</span>
              </div>
            </template>
            <div class="test-content">
              <img :src="test.image" alt="Test Image" class="test-image" />
              <div class="test-info">
                <p class="test-description">{{ test.description }}</p>
                <div class="test-results">
                  <div class="result-item">
                    <span class="label">考试时间:</span>
                    <span class="value">{{ test.completedDate }}</span>
                  </div>
                  <div class="result-item">
                    <span class="label">用时:</span>
                    <span class="value">{{ test.timeUsed }} 分钟</span>
                  </div>
                  <div class="result-item">
                    <span class="label">正确率:</span>
                    <span class="value success"
                      >{{
                        Math.round(
                          ((test.correctAnswers || 0) /
                            (test.totalQuestions || 1)) *
                            100
                        )
                      }}%</span
                    >
                  </div>
                  <div class="result-item">
                    <span class="label">获得证书:</span>
                    <span class="value certificate">{{
                      test.certificateEarned
                    }}</span>
                  </div>
                </div>
                <MyButton class="review-button" @click="reviewTest(test)">
                  <span style="font-size: 14px; color: #ffffff">查看详情</span>
                </MyButton>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {ref, computed} from 'vue'
import {ElCard, ElMessage} from 'element-plus'
import MyButton from '@/components/common/MyButton.vue'
import CommonAside from '@/components/common/CommonAside.vue'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'

defineOptions({
  name: 'LevelTestPage'
})

// 考试数据接口
interface LevelTest {
  id: number
  title: string
  description: string
  image: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  levelText: string
  questionCount: number
  duration: number // 分钟
  passingScore: number // 及格分数百分比
  requirements?: string[]
  // 已完成考试的额外字段
  score?: number
  completedDate?: string
  timeUsed?: number
  correctAnswers?: number
  totalQuestions?: number
  certificateEarned?: string
}

interface LevelNode {
  id: number
  name: string
  description: string
  status: 'completed' | 'current' | 'locked'
}

// 变量声明区
// 等级路径
const levelPath = ref<LevelNode[]>([
  {
    id: 1,
    name: 'L1 入门级',
    description: 'AI基础认知',
    status: 'completed'
  },
  {
    id: 2,
    name: 'L2 初级',
    description: '编程基础',
    status: 'completed'
  },
  {
    id: 3,
    name: 'L3 中级',
    description: '机器学习入门',
    status: 'current'
  },
  {
    id: 4,
    name: 'L4 高级',
    description: '深度学习应用',
    status: 'locked'
  },
  {
    id: 5,
    name: 'L5 专家级',
    description: 'AI项目实战',
    status: 'locked'
  }
])

// 可参加的考试
const availableTests = ref<LevelTest[]>([
  {
    id: 1,
    title: '机器学习基础认证考试',
    description: '测试您对机器学习基本概念、算法和应用的掌握程度。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    difficulty: 'intermediate',
    levelText: '中级',
    questionCount: 50,
    duration: 90,
    passingScore: 70,
    requirements: ['完成AI基础课程', '获得编程入门证书', '学习时长超过20小时']
  },
  {
    id: 2,
    title: 'Python数据分析认证考试',
    description: '评估您使用Python进行数据处理、分析和可视化的能力。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    difficulty: 'intermediate',
    levelText: '中级',
    questionCount: 40,
    duration: 75,
    passingScore: 75,
    requirements: ['完成Python基础课程', '完成数据分析项目']
  },
  {
    id: 3,
    title: '深度学习高级认证考试',
    description: '挑战您对深度学习架构、优化和部署的深度理解。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    difficulty: 'advanced',
    levelText: '高级',
    questionCount: 60,
    duration: 120,
    passingScore: 80,
    requirements: [
      '通过机器学习基础认证',
      '完成深度学习专项课程',
      '提交原创项目作品'
    ]
  }
])

// 已通过的考试
const passedTests = ref<LevelTest[]>([
  {
    id: 101,
    title: 'AI基础认知考试',
    description: '人工智能基础概念和发展历程的综合测试。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    difficulty: 'beginner',
    levelText: '入门',
    questionCount: 30,
    duration: 45,
    passingScore: 60,
    score: 85,
    completedDate: '2024-03-10',
    timeUsed: 35,
    correctAnswers: 26,
    totalQuestions: 30,
    certificateEarned: 'AI基础认知证书'
  },
  {
    id: 102,
    title: '编程基础认证考试',
    description: '编程思维和基础语法的综合评估。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    difficulty: 'beginner',
    levelText: '入门',
    questionCount: 35,
    duration: 60,
    passingScore: 70,
    score: 78,
    completedDate: '2024-02-25',
    timeUsed: 52,
    correctAnswers: 28,
    totalQuestions: 35,
    certificateEarned: '编程入门证书'
  }
])

// 计算属性
const currentLevel = computed(() => {
  const currentNode = levelPath.value.find(node => node.status === 'current')
  return currentNode ? currentNode.name : 'L1 入门级'
})

// 逻辑处理区
const canTakeTest = (test: LevelTest) => {
  // 简单的条件检查逻辑，实际中应该检查用户的具体完成情况
  if (!test.requirements) return true

  // 这里可以根据实际需求添加更复杂的条件检查
  return test.difficulty !== 'advanced' // 示例：高级考试需要特殊条件
}

const startTest = (test: LevelTest) => {
  if (!canTakeTest(test)) {
    ElMessage.warning('请先满足参考条件')
    return
  }

  ElMessage.info(`即将开始考试: ${test.title}`)
  // 这里可以跳转到考试页面
  // router.push(`/test/${test.id}`)
}

const previewTest = (test: LevelTest) => {
  ElMessage.info(`预览考试: ${test.title}`)
  // 这里可以打开预览弹窗或跳转到预览页面
}

const reviewTest = (test: LevelTest) => {
  ElMessage.success(`查看考试详情: ${test.title}`)
  // 这里可以跳转到考试结果详情页面
}
</script>

<style scoped>
.level-test-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

.level-test-maintainer {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background-color: #ffffff;
  overflow-y: auto;
  margin: 20px 0 0 20px;
}

.level-test-maintainer > span {
  padding-top: 32px;
  height: 100px;
  font-size: 28px;
  font-weight: bold;
  padding-left: 40px;
  color: #333333;
}

.test-stats {
  display: flex;
  gap: 20px;
  padding: 0 40px 20px 40px;
  margin-bottom: 20px;
}

.stats-card {
  flex: 1;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  color: white;
}

.stats-number {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stats-label {
  font-size: 14px;
  opacity: 0.9;
}

.level-path {
  padding: 0 40px;
  margin-bottom: 40px;
}

.path-container {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  padding: 20px 0;
}

.level-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 150px;
  flex-shrink: 0;
}

.node-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.level-node.completed .node-circle {
  background: linear-gradient(135deg, #00b894, #00a085);
  color: white;
}

.level-node.current .node-circle {
  background: linear-gradient(135deg, #0984e3, #74b9ff);
  color: white;
  animation: pulse 2s infinite;
}

.level-node.locked .node-circle {
  background: #ddd;
  color: #999;
}

.node-icon {
  font-size: 24px;
}

.node-info {
  text-align: center;
}

.node-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.node-description {
  font-size: 12px;
  color: #666;
}

.connector {
  position: absolute;
  top: 30px;
  right: -50px;
  width: 100px;
  height: 2px;
  background: #ddd;
  z-index: -1;
}

.level-node.completed + .level-node .connector {
  background: linear-gradient(to right, #00b894, #ddd);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(9, 132, 227, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(9, 132, 227, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(9, 132, 227, 0);
  }
}

.section {
  margin-bottom: 40px;
  padding: 0 40px;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 8px;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 16px;
  bottom: 0;
  width: 40px;
  height: 4px;
  background-color: #026bff;
  border-radius: 2px;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 20px;
}

.test-card {
  border: none;
  overflow: visible;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.test-card.available {
  background: linear-gradient(135deg, #fff5e6 0%, #ffe4b3 100%);
}

.test-card.passed {
  background: linear-gradient(135deg, #e6fff0 0%, #b3ffcc 100%);
}

.test-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.test-card > :deep(.el-card__header) {
  border-bottom: none;
  padding: 20px 20px 10px 20px;
}

.test-card > :deep(.el-card__body) {
  padding: 10px 20px 20px 20px;
}

.test-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.test-icon {
  font-size: 24px;
  color: #f39c12;
}

.test-icon.passed {
  color: #27ae60;
}

.test-title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  flex: 1;
}

.test-level {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.test-level.beginner {
  background-color: #2ecc71;
  color: white;
}

.test-level.intermediate {
  background-color: #f39c12;
  color: white;
}

.test-level.advanced {
  background-color: #e74c3c;
  color: white;
}

.test-level.expert {
  background: linear-gradient(45deg, #8e44ad, #3498db);
  color: white;
}

.test-score {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
  background-color: #27ae60;
  color: white;
}

.test-content {
  display: flex;
  gap: 15px;
}

.test-image {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.test-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.test-description {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  margin: 0;
}

.test-details,
.test-results {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-item,
.result-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.result-item {
  justify-content: space-between;
}

.label {
  color: #909399;
  font-weight: 500;
  min-width: 70px;
}

.value {
  color: #333333;
}

.value.success {
  color: #27ae60;
  font-weight: bold;
}

.value.certificate {
  color: #f39c12;
  font-weight: bold;
}

.test-requirements {
  font-size: 13px;
}

.requirement-title {
  color: #909399;
  font-weight: 500;
  margin-bottom: 5px;
}

.requirement-list {
  margin: 0;
  padding-left: 15px;
  color: #666666;
}

.requirement-list li {
  margin-bottom: 3px;
}

.test-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.start-test-button,
.review-button {
  height: 36px;
  flex: 1;
  background: linear-gradient(to right, #6696ff, #63a2fd);
}

.preview-button {
  height: 36px;
  flex: 1;
  border: 1px solid #6696ff;
  color: #6696ff;
}

.start-test-button:disabled {
  background: #c0c4cc !important;
  cursor: not-allowed;
}
</style>
