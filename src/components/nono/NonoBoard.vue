<template>
  <div class="board">
    <div class="row" v-for="(_, ri) in state.grid" :key="ri">
      <div class="cell" v-for="(_, ci) in state.grid" :key="ci">
        <NonoCell
          :state="state.grid[ri][ci]"
          @change="updateCell($event, ri, ci)"
          :disabled="state.won"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import NonoCell from "./NonoCell.vue";
import type { Level } from "../../types/level";

const props = defineProps<{ level: Level }>();
const emit = defineEmits<{ (e: "win", value: boolean): void }>();
const state = reactive({ won: false, grid: generateGrid() });

watch(
  () => props.level,
  () => {
    state.grid = generateGrid();
  }
);

function generateGrid() {
  return new Array(props.level.rows)
    .fill(0)
    .map(() => new Array(props.level.cols).fill(0));
}

function updateCell(num: number, ri: number, ci: number): void {
  state.grid[ri][ci] = num;

  if (isWin()) {
    state.won = true;
    emit("win", true);
  }
}

function isWin(): boolean {
  return JSON.stringify(props.level.solution) === JSON.stringify(state.grid);
}
</script>

<style scoped>
.row {
  display: flex;
  place-items: center;
}
</style>
