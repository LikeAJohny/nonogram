<template>
  <div class="level">
    <h2>Level {{ level }}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  level: number;
}>();
</script>

<style scoped></style>
