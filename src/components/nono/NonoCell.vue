<template>
  <div class="cell" @click="emit('change', state === 1 ? 0 : 1)">
    {{ cellContent }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  state: number;
}>();

const emit = defineEmits<{
  (e: "change", value: number): void;
}>();

const cellContent = computed(() => (props.state === 1 ? "X" : ""));
</script>

<style scoped>
.cell {
  display: grid;
  place-content: center;
  width: 2rem;
  aspect-ratio: 1;
  border: 1px solid;
  cursor: pointer;
}
</style>
