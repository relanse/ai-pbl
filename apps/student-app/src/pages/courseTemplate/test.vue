<template>
  <connectionPage :data="Data"></connectionPage>
</template>
<script setup lang="ts">
import Data from './1.json'
import connectionPage from './connectionPage.vue'

defineOptions({
  name: 'testPage'
})
</script>
<style scoped></style>
