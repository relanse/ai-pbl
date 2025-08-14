<template>
    <div>
        <ComponentB :label="label">

        </ComponentB>
    </div>
</template>
<script setup lang="ts">
defineProps({
    label: String,
})
</script>
<style scoped></style>