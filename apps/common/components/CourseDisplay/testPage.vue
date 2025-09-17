<template>
  <div class="choices-wrapper">
    <!--顶部的AI部分-->
    <RobotPrompt v-model="titleInfo" />
    <!-- 主内容区 -->
    <div class="template-card"></div>
    <!-- 提交按钮 -->
    <div
      class="template-card-footer"
      :style="{backgroundImage: `url(${backgroundFooter})`}"
    >
      <MyButton @click="checkAnswer" class="submit-button">next </MyButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject} from 'vue'
import backgroundFooter from '../../assets/backgrounds/backgroundFooter.png'
import MyButton from '../CourseTemplate/components/MyButton.vue'
import RobotPrompt from '../CourseTemplate/components/RobotPrompt.vue'

const titleInfo = ref('和小鸿一起探索人工智能的奇妙世界')

// 定义事件
const emit = defineEmits<{
  answer: [
    answer: {userAnswer: string; isCorrect: boolean; correctAnswer: string}
  ]
  next: []
}>()

const checkAnswer = () => {
  emit('next')
}
</script>

<style scoped lang="scss">
.choices-wrapper {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  .template-card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 95%;
    border-radius: 32px;
    flex: 1 1 400px;
    border: 5px solid #6697ff;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 20px;

    .image-container {
      position: relative;

      @keyframes floatUpDown {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0);
        }
      }

      @keyframes scanRobot {
        0% {
          transform: translate(0, 0);
          opacity: 1;
        }
        25% {
          transform: translate(200px, -160px); // 右上位置
        }
        50% {
          transform: translate(0px, 60px); // 左下位置
        }
        75% {
          transform: translate(220px, -80px); // 右上位置
        }
        100% {
          transform: translate(0, 0); // 回到原位
          opacity: 1;
        }
      }

      .robot-img {
        width: 320px;
        height: 320px;
        animation: floatUpDown 2s ease-in-out infinite;
      }

      .magnifier-img {
        width: 160px;
        height: 160px;
        position: absolute;
        left: 0;
        bottom: 0;
        animation: scanRobot 12s ease-in-out infinite;
      }
    }
  }
}

.template-card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96%;
  border-radius: 32px;
  background-size: 100% 100%; /* 完全拉伸背景图 */
  background-repeat: no-repeat;
  height: 90px;
  border: 1px solid #ffffff;
  background-color: #e7f0ff;
}

.choices-options-item :deep(.el-radio) {
  margin-right: 10px;
}

.choices-options-item :deep(.el-radio-label) {
  font-size: clamp(14px, 2vw, 20px);
}

.submit-button {
  width: 150px;
  height: 50px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
}
</style>
