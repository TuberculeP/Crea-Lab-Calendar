<template>
  <button v-bind="props" />
</template>

<script setup lang="ts">
const props = defineProps();
</script>

<style scoped>
button {
  background-color: var(--color-vibrant-orange);
}
</style>
