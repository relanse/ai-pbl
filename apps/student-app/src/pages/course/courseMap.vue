<template>
  <div class="course-map-wrapper">
    <div class="sidebar">
      <div class="sidebar-menu">
        <div
          v-for="button in sidebarButtons"
          :key="button.id"
          class="sidebar-button"
        >
          <MyButton
            v-if="activeButton === button.id"
            :background="button.background"
            width="100%"
            height="60px"
          >
            {{ button.label }}
          </MyButton>
        </div>
      </div>
    </div>
    <div class="course-map-maintainer">
      <span>我的课程</span>
      <el-card
        shadow="never"
        class="course-map-card"
        v-for="course in courseList"
        :key="course.id"
      >
        <template #header>
          <span class="course-header-title">{{ course.title }}</span>
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
                  <img :src="levelCourse.image" />
                  <div v-if="index === 3" class="lock-overlay">
                    <my-icon name="courseLock" v-if="index === 3" />
                    <el-button
                      v-if="index === 3"
                      class="unlock-button"
                      type="primary"
                      round
                    >
                      解锁
                    </el-button>
                  </div>
                </div>
              </template>
              <div class="course-grid-body">
                {{ levelCourse.name }}
              </div>
            </el-card>
            <MyButton
              class="view-more-button"
              width="53px"
              icon-position="top-right"
              writing-mode="vertical-rl"
              background="linear-gradient(to bottom, #ff7f00, #ffc000)"
              @click="
                () => {
                  console.log('查看更多课程')
                }
              "
            >
              <span style="font-size: 16px; color: #ffffff">查看更多</span>
            </MyButton>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {ref} from 'vue'
import {ElCard, ElButton} from 'element-plus'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import MyButton from '@/components/common/MyButton.vue'
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
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 2,
        name: '课程二',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 3,
        name: '课程三',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 4,
        name: '课程四',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      }
    ]
  },
  {
    id: 2,
    title: 'L2.专项训练',
    description: '欢迎来到新手的世界打开你的新旅程吧~',
    courses: [
      {
        id: 1,
        name: '课程一',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 2,
        name: '课程二',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 3,
        name: '课程三',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      },
      {
        id: 4,
        name: '课程四',
        image:
          'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
      }
    ]
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
const activeButton = ref('my-course')
const sidebarButtons = ref([
  {
    id: 'my-course',
    label: '我的课程',
    background: 'linear-gradient(to right, #6696FF, #63A2FD)'
  },
  {
    id: 'my-certificate',
    label: '全部课程',
    background: 'linear-gradient(to right, #6696FF, #63A2FD)'
  },
  {
    id: 'favorites',
    label: '收藏夹',
    background: 'linear-gradient(to right, #6696FF, #63A2FD)'
  }
])
// 逻辑处理区
</script>

<style scoped>
.course-map-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
.sidebar {
  width: 180px;
  flex-shrink: 0; /* 防止侧边栏被压缩 */
  background-color: #e7f0ff;
  border-right: 1px solid #e0e0e0;
  /* 仅为示例，您可以自定义侧边栏样式 */
  height: 100%;
  overflow-y: auto; /* 如果侧边栏内容也可能超长，让其内部滚动 */
}
.sidebar-button {
  margin: 16px;
}
.course-map-maintainer {
  display: flex;
  flex-direction: column;
  flex: 1; /* 占据剩余的所有宽度 */
  height: 100%; /* 高度充满父容器 */
  background-color: #ffffff;
  overflow-y: auto;
}
.course-map-maintainer > span {
  padding-top: 16px;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
  padding-left: 20px;
}
.course-map-card {
  border: none;
  overflow: unset;
  padding: 16px 0;
}
.course-map-card > :deep(.el-card__header) {
  border-bottom: none;
  font-size: 18px;
  font-weight: bold;
  padding: 0px 20px;
  position: relative;
}
.course-header-title {
  font-size: 20px;
  font-weight: bold;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
}
.course-header-title::after {
  content: '';
  position: absolute;
  left: 16px;
  bottom: 0;
  width: 40px;
  height: 4px;
  background-color: #026bff;
  border-radius: 2px;
}
.course-map-content {
  padding: 20px;
  font-size: 16px;
  color: #666666;
  background-color: #e7f0ff;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
}
.course-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
.course-card {
  flex: 1 1 150px;
  min-width: 75px; /* 防止被过度压缩 */
  background-color: #e7f0ff;
  border: none;
}
.course-card > :deep(.el-card__header) {
  border-bottom: none;
  padding: 0;
}
.course-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* 可以给一个高度，确保垂直居中对齐 */
}
.course-image-container > img {
  width: 100%;
  border-radius: 27px;
  object-fit: cover; /* 防止图片拉伸变形 */
  aspect-ratio: 3 / 2; /* 例如，维持一个 16:9 的宽高比 */
}
.lock-overlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: auto;
  left: auto;
  width: 100%;
  height: 100%;
  border-radius: 27px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.course-grid-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  margin-bottom: -10px;
}
.unlock-button {
  margin-top: 10px;
  border-radius: 12px;
  border-color: #dbeaff;
  background-color: #dbeaff;
  color: #026bff;
}
</style>
