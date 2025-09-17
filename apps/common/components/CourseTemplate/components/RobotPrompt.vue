<template>
  <div class="robot-prompt">
    <div class="robot-background">
      <img :src="RobotImg" alt="robot" />
    </div>
    <div class="robot-text-background">
      <EditableText v-model="promptText" class="robot-text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineModel, onMounted} from 'vue'
import EditableText from './EditableText.vue'
import RobotImg from '../../../assets/robot.png'

// 使用 defineModel 来接收父组件的 v-model
const promptText = defineModel<string>()

onMounted(() => {
  const synth = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance(promptText.value)
  synth.speak(utterance)
})
</script>

<style scoped>
.robot-prompt {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 20px;
}
.robot-background {
  width: 70px;
  height: 70px;
  background-color: #6698ff;
  border: 3px solid #dbeaff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.robot-background img {
  width: 60px;
  height: 60px;
}
.robot-text-background {
  display: inline-block;
  max-width: 50%;
  background-color: #e0eaff;
  padding: 10px 20px;
  border-radius: 25px;
}
.robot-text {
  color: #316fef;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}
</style>
