<template>
  <button class="back-button" @click="handleBack">
    <MyIcon name="backArrow" class="back-icon"></MyIcon>
    <span class="back-text">返回</span>
  </button>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'
const props = defineProps<{
  to?: string // 'to' 是一个可选的字符串属性
}>()

const router = useRouter()

// 点击事件处理函数
const handleBack = () => {
  if (props.to) {
    // 如果 'to' 属性存在，则导航到指定路径
    router.push(props.to)
  } else {
    // 否则，执行默认的返回操作
    router.back()
  }
}
</script>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  border: 0.5px solid #6696ff;
  background: transparent;
  cursor: pointer;
  border-radius: 29px;
  height: 35px;
  width: 72px;
  justify-content: center;
}
.back-text {
  color: #026bff;
  font-size: 16px;
}
</style>
