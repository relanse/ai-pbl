<template>
  <img :src="currentIcon" />
</template>
<script setup lang="ts">
import {ref, watch} from 'vue'
import {iconPath} from './iconPath'

defineOptions({
  name: 'MyIcon'
})
const props = withDefaults(
  defineProps<{
    name: keyof typeof iconPath
  }>(),
  {
    name: 'user'
  }
)
const currentIcon = ref<string>('')
watch(
  props,
  async ({name}) => {
    const src = await iconPath[name]?.()
    if (!src) return
    currentIcon.value = src.default
  },
  {
    immediate: true
  }
)
</script>
<style scoped></style>
