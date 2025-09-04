<template>
  <div class="course-map-wrapper">
    <div class="sidebar">
      <div class="sidebar-menu">
        <div
          v-for="button in sidebarButtons"
          :key="button.id"
          class="sidebar-button"
          @click="activeButton = button.id"
        >
          <MyButton
            :background="
              activeButton === button.id ? button.background : '#e7f0ff'
            "
            :class="{
              'active-sidebar-button': activeButton === button.id,
              'inactive-sidebar-button': activeButton !== button.id
            }"
            style="width: 100%; height: 60px"
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
          <img
            :src="course.image"
            alt="Course Image"
            style="height: auto; border-radius: 27px; margin-right: 20px"
          />
          <div
            class="course-description"
            style="flex-direction: column; flex: 1; padding-right: 20px"
          >
            <h1 style="color: #333333">课程介绍</h1>
            <span>{{ course.description }}</span>
            <MyButton
              class="entry-button"
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
import {ElCard} from 'element-plus'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
import MyButton from '@/components/common/MyButton.vue'
// 变量声明区
const courseList = ref([
  {
    id: 1,
    title: 'L1.认知基础',
    description:
      '欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打开你的新旅程吧~欢迎来到新手的世界打~',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
  },
  {
    id: 2,
    title: 'L2.专项训练',
    description: '欢迎来到新手的世界打开你的新旅程吧~',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
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
  background-color: #f6f6f6;
}
.sidebar {
  width: 180px;
  flex-shrink: 0; /* 防止侧边栏被压缩 */
  background-color: #e7f0ff;
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
  margin: 20px 0 0 20px;
}
.course-map-maintainer > span {
  padding-top: 32px;
  height: 100px;
  font-size: 28px;
  font-weight: bold;
  padding-left: 40px;
  color: #333333;
}
.course-map-card {
  border: none;
  overflow: unset;
  padding: 20px 40px;
}
.course-map-card > :deep(.el-card__header) {
  border-bottom: none;
  font-size: 18px;
  font-weight: bold;
  padding: 0;
  position: relative;
}
.course-map-card > :deep(.el-card__body) {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 0 0;
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
  position: relative;
  padding: 16px;
  font-size: 16px;
  background-color: #e7f0ff;
  border-radius: 32px;
  display: flex;
  height: 200px;
}
.course-map-content > img {
  object-fit: cover; /* 防止图片拉伸变形 */
  aspect-ratio: 6 / 5; /* 例如，维持一个 16:9 的宽高比 */
}
.course-description > span {
  font-weight: normal;
  /* 以下是实现多行文本截断的关键代码 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6; /* 您可以修改这个数字来控制显示的行数 */
  -webkit-box-orient: vertical;
  line-height: 1.5; /* 调整行高以获得更好的视觉效果 */
}
.entry-button {
  height: 50px;
  width: 120px;
  background: linear-gradient(to right, #6696ff, #63a2fd);
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
