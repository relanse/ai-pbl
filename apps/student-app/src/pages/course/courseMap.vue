<template>
  <div class="course-map-maintainer">
    <span>我的课程</span>
    <el-card
      shadow="never"
      class="course-map-card"
      v-for="course in courseList"
      :key="course.id"
    >
      <template #header>
        {{ course.title }}
      </template>
      <div class="course-map-content">
        课程介绍：{{ course.description }}
        <div class="course-grid">
          <el-card
            v-for="(levelCourse, index) in course.courses.slice(0, 4)"
            :key="levelCourse.id"
            class="course-card"
            shadow="never"
          >
            <template #header>
              <div class="course-image-container">
                <img :src="levelCourse.image" :alt="levelCourse.name" />
                <my-icon name="courseLock" v-if="index === 3" />
              </div>
            </template>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {ref} from 'vue'
import {ElCard} from 'element-plus'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
// 变量声明区
const courseList = ref([
  {
    id: 1,
    title: 'L1.认知基础',
    description: '欢迎来到新手的世界打开你的新旅程吧~',
    courses: [
      {
        id: 1,
        name: '课程一',
        image: 'https://via.placeholder.com/200x100',
        locked: false
      },
      {
        id: 2,
        name: '课程二',
        image: 'https://via.placeholder.com/200x100',
        locked: false
      },
      {
        id: 3,
        name: '课程三',
        image: 'https://via.placeholder.com/200x100',
        locked: false
      },
      {
        id: 4,
        name: '课程四',
        image: 'https://via.placeholder.com/200x100',
        locked: true
      }
    ]
  },
  {
    id: 2,
    title: 'L2.专项训练',
    description: '欢迎来到新手的世界打开你的新旅程吧~',
    courses: []
  },
  {
    id: 3,
    title: 'L3.综合应用',
    description: '欢迎来到新手的世界打开你的新旅程吧~',
    courses: []
  },
  {
    id: 4,
    title: 'L4.进阶挑战',
    description: '欢迎来到新手的世界打开你的新旅程吧~',
    courses: []
  }
])
// 逻辑处理区
</script>

<style scoped>
.course-map-maintainer {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.course-map-maintainer > span {
  font-size: 24px;
  font-weight: bold;
  padding-left: 20px;
}
.course-map-card {
  border: none;
}
.course-map-card > :deep(.el-card__header) {
  border-bottom: none;
  font-size: 18px;
  font-weight: bold;
  position: relative;
}
.course-map-card > :deep(.el-card__header)::after {
  content: '';
  position: absolute;
  left: 2.5%;
  bottom: 10%;
  width: 34px;
  height: 4px;
  background-color: #026bff;
  border-radius: 11px;
}
.course-map-content {
  padding: 20px;
  font-size: 16px;
  height: auto;
  color: #666666;
  background-color: #e7f0ff;
  border-radius: 32px;
}
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
