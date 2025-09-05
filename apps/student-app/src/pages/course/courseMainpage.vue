<template>
  <div class="course-mainpage-wrapper">
    <BackButton class="back-button" to="/course" />
    <div class="course-mainpage-maintainer">
      <div class="course-mainpage-header">
        <MyIcon name="VmyClass" /><span
          style="font-size: 24px; font-weight: bold"
          >我的课程</span
        >
      </div>
      <div class="course-mainpage-content">
        <div
          v-for="course in courseLevelData?.courses"
          :key="course.id"
          class="course-card"
        >
          <div class="course-image-background">
            <div class="image-backing"></div>
            <img :src="course.image" alt="Course Image" />
            <button class="start-button" @click="goToCourseDetail(course.id)">
              开始学习
            </button>
          </div>
          <div class="course-info">
            <h3 style="font-size: 16px; color: #333333; font-weight: bold">
              {{ course.title }}
            </h3>
            <p style="font-size: 14px; margin: 8px 0; color: #666666">
              {{ course.description }}
            </p>
            <div
              class="course-edition"
              style="margin-top: auto; margin-bottom: 4px"
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  padding-right: 12px;
                "
              >
                <!-- TODO：给herf添加链接 -->
                <MyIcon name="courseContent" style="width: 16px" />
                <a href="#" class="clickable-text" @click.prevent>课程内容</a>
              </div>
              <div style="display: flex; align-items: center; gap: 4px">
                <circle class="grey-dot" />
                <a href="#" class="clickable-text" @click.prevent
                  >设定角色身份</a
                ><circle class="grey-dot" />
                <a href="#" class="clickable-text" @click.prevent
                  >给出身份细节</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
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
const route = useRoute()
const router = useRouter()

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
        description:
          '这是“初识AI”的简介，带你了解人工智能的基本概念。这是“初识AI”的简介，带你了解人工智能的基本概念。这是“初识AI”的简介，带你了解人工智能的基本概念。这是“初识AI”的简介，带你了解人工智能的基本概念。',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 102,
        title: '课程二：简单指令',
        description: '学习如何向AI下达清晰、简单的指令。',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 103,
        title: '课程三：创意绘画',
        description: '探索如何使用AI进行简单的创意绘画。',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 104,
        title: '课程四：创意绘画',
        description: '探索如何使用AI进行简单的创意绘画。',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 105,
        title: '课程五：创意绘画',
        description: '探索如何使用AI进行简单的创意绘画。',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 106,
        title: '课程六：创意绘画',
        description: '探索如何使用AI进行简单的创意绘画。',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 107,
        title: '课程七：创意绘画',
        description: '探索如何使用AI进行简单的创意绘画。',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 108,
        title: '课程八：创意绘画',
        description: '探索如何使用AI进行简单的创意绘画。',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
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
onMounted(() => {
  const courseId = Number(route.params.id)
  if (!isNaN(courseId)) {
    const foundCourse = courseLevelsDatabase.find(
      level => level.id === courseId
    )
    if (foundCourse) {
      courseLevelData.value = foundCourse
    } else {
      console.error('未找到对应的课程等级')
    }
  }
})
const goToCourseDetail = (courseId: number) => {
  router.push(`/course/detail/${courseId}`)
}
</script>

<style scoped>
.course-mainpage-wrapper {
  display: flex;
  width: 100%;
  height: calc(100% - 20px);
  background-color: #f6f6f6;
  margin: 20px;
  margin-bottom: 0px;
}
.back-button {
  margin: 16px;
}
.course-mainpage-maintainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
  overflow-y: auto;
}
.course-mainpage-header {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}
.course-mainpage-content {
  height: 100%;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-content: flex-start;
}
.course-card {
  width: 400px;
  height: 170px;
  display: flex;
  gap: 12px;
  border: 1px solid #ffffff;
  border-radius: 16px;
  background-color: #ffffff;
}
.course-info {
  display: flex;
  flex-direction: column;
  margin: 12px;
  margin-left: 0;
}
.course-info > p {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 显示的行数 */
  line-clamp: 3; /* 标准属性 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.course-image-background {
  position: relative;
  height: 150px;
  width: 100px;
  border-radius: 16px;
  margin: 12px;
  margin-right: 16px;
}
.image-backing {
  position: absolute;
  height: 150px;
  width: 100px;
  border-radius: 16px;
  background: linear-gradient(to bottom, #eaf6ff, #ffffff);
  box-shadow: 2px 0px 4px rgba(141, 173, 255, 0.33); /* #8DADFF at 33% opacity */
  top: 0;
  left: 5px;
  z-index: 0;
}
.course-image-background > img {
  position: relative;
  z-index: 1;
  height: 150px;
  width: 100px;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 2/3;
}
.start-button {
  position: absolute;
  z-index: 2;
  background-color: #007bff;
  height: 28px;
  width: 75px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  bottom: 10px; /* 10px from the bottom */
  left: 12px; /* 12px from the left */
}
.course-edition {
  display: flex;
  align-items: center;
}
.grey-dot {
  background-color: #999999;
  border: 2px solid var(--bg1);
  border-radius: 50%;
  height: 2px;
  right: 0;
  width: 2px;
}
.clickable-text {
  color: #666666;
  font-size: 12px;
  text-decoration: none; /* 移除下划线 */
  cursor: pointer;
  transition: color 0.2s linear;
}
.clickable-text:hover {
  color: #007bff; /* 悬停时变色 */
}
</style>
