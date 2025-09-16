<template>
  <div class="course-map-wrapper">
    <div class="sidebar-wrapper">
        <CommonAside/>
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
              @click="goToCourseMainPage(course.id)"
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
import {useRouter} from 'vue-router'
import {ElCard, ElMenu, ElMenuItem} from 'element-plus'
import MyButton from '@/components/common/MyButton.vue'
import CommonAside from '@/components/common/CommonAside.vue'
import type {iconNamesType} from '@aipbl/common/components/MyIcon/iconPath'
interface SidebarButton {
  id: iconNamesType
  label: string
  path: string
}
// 变量声明区
const router = useRouter()
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
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
  },
  {
    id: 4,
    title: 'L4.进阶挑战',
    description: '欢迎来到新手的世界打开你的新旅程吧~',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
  }
])
const sidebarButtons = ref<SidebarButton[]>([
  {
    id: 'course',
    label: '我的课程',
    path: '/course' // 添加 path 属性
  },
  {
    id: 'certificate',
    label: '我的证书',
    path: '/certificate' //TODO: 示例路径，您需要创建对应路由
  },
  {
    id: 'levelTest',
    label: '等级考试',
    path: '/levelTest' //TODO: 示例路径，您需要创建对应路由
  }
])
// 逻辑处理区
const goToCourseMainPage = (id: number) => {
  router.push(`/course/all/${id}`)
}
</script>

<style scoped>
.course-map-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
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
  min-width: 400px;
  position: relative;
  padding: 16px;
  font-size: 16px;
  background-color: #e7f0ff;
  border-radius: 32px;
  display: flex;
  height: 200px;
  overflow: hidden;
}
.course-map-content > img {
  object-fit: cover; /* 防止图片拉伸变形 */
  aspect-ratio: 6 / 5; /* 例如，维持一个 16:9 的宽高比 */
}
.course-description > span {
  font-weight: normal;
  color: #666666;
  /* 以下是实现多行文本截断的关键代码 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 您可以修改这个数字来控制显示的行数 */
  line-clamp: 4; /* 标准属性 */
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
