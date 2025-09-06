<template>
  <div class="wrapped">
    <!-- 顶部机器人提示 -->
    <RobotPrompt v-model="data.prompt" />
    <!-- 外部带边框的容器 -->
    <div class="bordered-container">
      <!-- 卡片左右两侧标题 -->
      <div class="header">
        <EditableText class="title" v-model="data.leftColumn.title" />
        <EditableText class="title" v-model="data.rightColumn.title" />
      </div>

      <!-- 主内容区域，分为两栏 -->
      <div class="main-content">
        <!-- 左侧栏 -->
        <div class="column">
          <div
            v-for="(card, index) in data.leftColumn.cards"
            :key="card.id"
            class="card card-left"
            :style="{backgroundColor: card.color}"
          >
            <div class="card-icon-background">
              <EditableImage class="card-icon" v-model="card.img" />
            </div>

            <div class="card-text">
              <EditableText class="card-title" v-model="card.content" />
              <EditableText class="card-tag" v-model="card.tag" />
            </div>
            <el-button
              v-if="isEdit"
              @click="removeCard(index)"
              class="delete-btn"
              type="danger"
              size="small"
              circle
              >-</el-button
            >
          </div>
        </div>

        <!-- 右侧栏 -->
        <div class="column">
          <div
            v-for="card in data.rightColumn.cards"
            :key="card.id"
            class="card card-right"
          >
            <EditableText class="card-title" v-model="card.content" />
            <!-- 删除按钮已移至左侧卡片，保持同步删除 -->
          </div>
        </div>
      </div>

      <!-- 底部同步增加按钮 -->
      <div
        v-if="isEdit && data.leftColumn.cards.length < 4"
        class="footer-actions"
      >
        <el-button
          @click="addCard"
          class="add-btn"
          type="primary"
          plain
          :icon="Plus"
        >
          添加一组选项
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ElButton} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import {computed, defineModel, inject, onMounted, ref, watch} from 'vue'
import EditableText from './EditableText.vue'
import EditableImage from './EditableImage.vue'
import RobotPrompt from './RobotPrompt.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
import {getTemplateDefaultData} from './templateDefaults'
import {CourseConnectionType, CourseDataType} from './type'
import {v4 as uuidv4} from 'uuid'
const {isEdit, courseData, selectedPageIndex} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const data = computed({
  get: () => {
    if (selectedPageIndex.value !== null) {
      return courseData.value.pages[selectedPageIndex.value]
        .data as CourseConnectionType
    }
    return getTemplateDefaultData('connection') as CourseConnectionType
  },
  set: val => {
    if (selectedPageIndex.value) {
      courseData.value.pages[selectedPageIndex.value].data = val
    }
  }
})

// --- 颜色循环数组 ---
const cardColors = ['#a0c4ff', '#ffd6a0', '#b2f7b2', '#d8b4fe']

// --- 添加/删除卡片的逻辑 ---
const addCard = () => {
  // 根据当前卡片数量决定下一个颜色
  const nextColorIndex = data.value.leftColumn.cards.length % cardColors.length
  const newColor = cardColors[nextColorIndex]

  // 使用时间戳确保 ID 唯一
  const newId = uuidv4()

  const newLeftCard = {
    id: newId,
    content: '新选项',
    tag: '新标签',
    img: '',
    color: newColor
  }
  const newRightCard = {
    id: newId,
    content: '新答案',
    color: '#eaf2ff'
  }
  data.value.leftColumn.cards.push(newLeftCard)
  data.value.rightColumn.cards.push(newRightCard)
}

const removeCard = (index: number) => {
  // 同步删除左右两侧对应索引的卡片
  data.value.leftColumn.cards.splice(index, 1)
  data.value.rightColumn.cards.splice(index, 1)
}
</script>

<style scoped>
.wrapped {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f9fc;
}
.bordered-container {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 25px;
  width: 900px;
  max-width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.header {
  display: flex;
  justify-content: space-around; /* 改为 space-around 让标题居中于各自的栏目上 */
  margin-bottom: 20px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  flex: 1;
}
.main-content {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.card-icon-background {
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
.card {
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  position: relative; /* 为了删除按钮的绝对定位 */
  transition: all 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.card-left {
  height: 70px;
}
.card-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0; /* 防止图标被压缩 */
}
.card-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.card-title {
  font-weight: bold;
  font-size: 16px;
}
.card-tag {
  font-size: 13px;
  color: #555;
}
.card-right {
  background-color: #f0f7ff;
  justify-content: center;
  font-weight: 500;
  height: 70px;
}
.delete-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  opacity: 0;
  transition: opacity 0.2s;
}
.card:hover .delete-btn {
  opacity: 1; /* 鼠标悬浮在卡片上时显示删除按钮 */
}
.footer-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.add-btn {
  width: 50%;
  border-style: dashed;
}
</style>
