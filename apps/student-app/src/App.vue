<template>
  <div class="frame">
    <RouterView></RouterView>
  </div>
</template>
<script setup lang="ts">
import {RouterView} from 'vue-router'
import './styles/base.css'
</script>
<style scoped>
.frame {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}
</style>
