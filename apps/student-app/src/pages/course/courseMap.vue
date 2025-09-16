<template>
  <div class="course-map-wrapper">
    <CommonAside ref="sidebarRef" class="sidebar" />
    <div
      class="course-map-maintainer"
      :class="{'sidebar-collapsed': sidebarRef?.isCollapsed}"
    >
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
import {ElCard} from 'element-plus'
import MyButton from '@/components/common/MyButton.vue'
import CommonAside from '@/components/common/CommonAside.vue'

// 变量声明区
const router = useRouter()
const sidebarRef = ref()
const courseList = ref([
  {
    id: 1,
    title: '第一级：认知基础',
    description:
      '本课程为初学者设计，将带您进入编程的奇妙世界。您将学习基本的编程概念，掌握核心术语，并熟悉常用的开发工具。这是您开启编程旅程的第一步，为未来的学习打下坚实的基础。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
  },
  {
    id: 2,
    title: '第二级：专项训练',
    description:
      '在掌握了基础知识后，本课程将带您进行专项技能的深入训练。我们将通过一系列有针对性的练习和项目，帮助您巩固和扩展您的编程能力，让您在特定的技术领域变得更加专业。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
  },
  {
    id: 3,
    title: '第三级：综合应用',
    description:
      '本课程旨在培养您综合运用多种技术解决实际问题的能力。您将参与到更复杂的项目中，学习如何将不同的知识点融会贯通，构建出功能完善的应用程序。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
  },
  {
    id: 4,
    title: '第四级：进阶挑战',
    description:
      '准备好迎接挑战了吗？本课程将引导您探索编程领域的高级主题，挑战真实世界中的复杂项目。完成本课程后，您将具备解决高难度技术问题的能力，为您的职业生涯铺平道路。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861'
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
  transition: margin-left 0.3s ease;
}

.course-map-maintainer.sidebar-collapsed {
  margin-left: 10px; /* 当侧边栏折叠时减少左边距 */
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
