<template>
  <Suspense>
    <NonoGame />
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script setup lang="ts">
import NonoGame from "../components/nono/NonoGame.vue";
</script>

<style scoped></style>
