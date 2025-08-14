<template>
  <div class="course-manage-container">
    <!-- 搜索输入框 -->
    <el-input
      v-model="searchQuery"
      placeholder="请输入商品名称/商品编号"
      class="search-input"
      clearable
      @keyup.enter="handleSearch"
    >
      <template #append>
        <el-button @click="handleSearch" />
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

import {ElInput, ElButton} from 'element-plus'

const searchQuery = ref('') // 搜索关键词
const handleSearch = () => {
  searchQuery.value = '' // 清空搜索关键词
}
</script>

<style scoped>
.course-manage-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
