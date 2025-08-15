<template>
  <div class="student-card-container">
    <!-- 角色设定卡 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>角色设定卡</span>
        </div>
      </template>
      <div class="card-content">
        <p><strong>姓名：</strong>{{ data.character.name }}</p>
        <p><strong>性格关键词：</strong>{{ data.character.keywords }}</p>
        <p><strong>成长故事：</strong>{{ data.character.story }}</p>
      </div>
    </el-card>

    <!-- 聊天记录 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>聊天记录</span>
        </div>
      </template>
      <div class="card-content">
        <div
          v-for="(dialogue, index) in data.chatLog"
          :key="index"
          class="dialogue-item"
        >
          <p class="dialogue-title">{{ dialogue.title }}</p>
          <p v-if="dialogue.user"><strong>小星：</strong>{{ dialogue.user }}</p>
          <p v-if="dialogue.ai"><strong>AI：</strong>{{ dialogue.ai }}</p>
          <p v-if="dialogue.modification">
            <strong>修改点：</strong>{{ dialogue.modification }}
          </p>
          <p v-if="dialogue.optimization">
            <strong>优化结果：</strong>{{ dialogue.optimization }}
          </p>
          <p v-if="dialogue.operation">
            <strong>AI操作：</strong>{{ dialogue.operation }}
          </p>
        </div>
      </div>
    </el-card>

    <!-- 歌曲说明书 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>歌曲说明书</span>
        </div>
      </template>
      <div class="card-content">
        <p><strong>曲风：</strong>{{ data.songDescription.style }}</p>
        <p><strong>结构：</strong>{{ data.songDescription.structure }}</p>
        <p><strong>情绪走向：</strong></p>
        <ul>
          <li
            v-for="(emotion, index) in data.songDescription.emotion"
            :key="index"
          >
            {{ emotion }}
          </li>
        </ul>
      </div>
    </el-card>

    <!-- 作品呈现 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>作品呈现</span>
        </div>
      </template>
      <div class="card-content audio-player">
        <el-icon :size="30" color="#409EFC"><VideoPlay /></el-icon>
        <div class="audio-info">
          <p>{{ data.workShowcase.file.name }}</p>
          <span>{{ data.workShowcase.file.size }}</span>
          <span>{{ data.workShowcase.file.date }}</span>
          <span>{{ data.workShowcase.file.duration }}</span>
        </div>
        <audio
          controls
          :src="data.workShowcase.file.url"
          class="audio-control"
        ></audio>
      </div>
    </el-card>

    <!-- 学习反思卡 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>学习反思卡</span>
        </div>
      </template>
      <div class="card-content">
        <p><strong>最有效提问：</strong></p>
        <p class="reflection-text">
          “{{ data.reflection.mostEffectiveQuestion.original }}” → 改为“{{
            data.reflection.mostEffectiveQuestion.revised
          }}”
        </p>
        <p><strong>最大问题：</strong></p>
        <p class="reflection-text">{{ data.reflection.biggestProblem }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ElCard, ElIcon} from 'element-plus'
import {VideoPlay} from '@element-plus/icons-vue'

defineProps<{
  data: any // 接收一个包含所有卡片信息的对象
}>()
</script>

<style scoped>
.student-card-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
}

.box-card {
  border-radius: 8px;
}

.card-header {
  font-weight: bold;
  font-size: 18px;
}

.card-content {
  font-size: 14px;
  line-height: 1.8;
}

.card-content p {
  margin: 8px 0;
}

.dialogue-item {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.dialogue-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.dialogue-title {
  font-weight: bold;
  margin-bottom: 10px;
}

ul {
  padding-left: 20px;
  margin: 8px 0;
}

.audio-player {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
}

.audio-info {
  flex-grow: 1;
}

.audio-info p {
  font-weight: bold;
  margin: 0;
}

.audio-info span {
  font-size: 12px;
  color: #909399;
  margin-right: 10px;
}

.audio-control {
  width: 100%;
  position: absolute;
  left: 0;
  opacity: 0; /* 隐藏原生播放器，但保留其功能 */
  cursor: pointer;
}

.reflection-text {
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
}
</style>
