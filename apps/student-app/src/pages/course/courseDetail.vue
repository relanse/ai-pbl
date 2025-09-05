<template>
  <div class="course-detail-wrapper">
    <BackButton class="back-button" />
    <div class="course-detail-maintainer">
      <div class="course-detail-header">
        <MyIcon name="VmyClass" /><span
          style="font-size: 24px; font-weight: bold"
          >课程详情</span
        >
      </div>
      <div class="course-detail-content">
        <div v-for="course in courseLevelData?.courses" :key="course.id"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
// 子课程的数据结构
interface SubCourse {
  id: number
  title: string
  description: string
  image: string
}

// 课程等级的数据结构
interface CourseLevel {
  id: number
  title: string
  courses: SubCourse[]
}
// 变量声明区

// 模拟的完整课程数据库

const courseLevelData = ref<CourseLevel | null>(null)
const courseLevelsDatabase: CourseLevel[] = [
  {
    id: 1,
    title: 'L1.认知基础',
    courses: [
      {
        id: 101,
        title: '课程一：初识AI',
        description: '这是“初识AI”的简介，带你了解人工智能的基本概念。',
        image:
          'https://via.placeholder.com/400x225.png/6696ff/ffffff?text=AI+Basics'
      },
      {
        id: 102,
        title: '课程二：简单指令',
        description: '学习如何向AI下达清晰、简单的指令。',
        image:
          'https://via.placeholder.com/400x225.png/63a2fd/ffffff?text=Commands'
      },
      {
        id: 103,
        title: '课程三：创意绘画',
        description: '探索如何使用AI进行简单的创意绘画。',
        image:
          'https://via.placeholder.com/400x225.png/e7f0ff/000000?text=Drawing'
      }
    ]
  },
  {
    id: 2,
    title: 'L2.专项训练',
    courses: [
      {
        id: 201,
        title: '课程一：逻辑思维',
        description: '通过AI挑战，锻炼和提升你的逻辑思维能力。',
        image:
          'https://via.placeholder.com/400x225.png/6696ff/ffffff?text=Logic'
      },
      {
        id: 202,
        title: '课程二：数据分析',
        description: '学习如何利用AI工具对数据进行初步分析。',
        image: 'https://via.placeholder.com/400x225.png/63a2fd/ffffff?text=Data'
      }
    ]
  }
]

// 逻辑处理区
</script>

<style scoped>
.course-detail-wrapper {
  display: flex;
  width: 100%;
  height: calc(100% - 20px);
  background-color: #f6f6f6;
  margin: 20px;
  margin-bottom: 0px;
}
.back-button {
  margin: 16px 20px;
}
.course-detail-maintainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
  overflow-y: auto;
}
.course-detail-header {
  margin-top: 16px;
  display: flex;
}
.course-detail-content {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
