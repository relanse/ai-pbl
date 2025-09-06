<template>
  <div class="course-detail-wrapper">
    <BackButton />
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'
// 变量声明区
const route = useRoute()
// 生命周期钩子区
onMounted(() => {
  const courseId = route.params.id
  console.log('接收到的课程ID是:', courseId)
})
// 方法区
</script>

<style scoped></style>
