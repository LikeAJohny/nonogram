<template>
  <div
    :class="{
      cell: true,
      borderless: disabled,
      disabled: disabled && state === 1,
    }"
    @click="update"
  >
    {{ cellContent }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  state: number;
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: "change", value: number): void;
}>();

const update = () => {
  if (!props.disabled) emit("change", props.state === 1 ? 0 : 1);
};

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
  transition: all 1s ease;
}

.cell.disabled {
  background-color: var(--color-text);
}
.cell.borderless {
  border: none;
  cursor: default;
}
</style>
