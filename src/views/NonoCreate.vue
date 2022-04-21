<template>
  <div>
    <div>
      <label for="rows">Rows</label>
      <input type="number" id="rows" v-model="state.rows" />
    </div>
    <div>
      <label for="cols">Cols</label>
      <input type="number" id="cols" v-model="state.cols" />
    </div>
  </div>
  <br />
  <div>
    <div class="board">
      <div class="row" v-for="(row, ri) in state.grid" :key="ri">
        <div
          class="cell"
          v-for="(_, ci) in row"
          :key="ci"
          @click="updateCell(ri, ci)"
        >
          {{ state.grid[ri][ci] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { Grid } from "@/types/level";

const state = reactive({
  rows: 4,
  cols: 4,
  grid: new Array(4).fill(0).map(() => new Array(4).fill(0)),
});

watch(
  () => [state.rows, state.cols],
  () => (state.grid = generateGrid(state.rows, state.cols))
);

function updateCell(ri: number, ci: number): void {
  state.grid[ri][ci] = state.grid[ri][ci] === 1 ? 0 : 1;
}

function generateGrid(rows: number, cols: number): Grid {
  return new Array(rows)
    .fill(0)
    .map((_, ri) =>
      new Array(cols)
        .fill(0)
        .map((_, ci) =>
          state.grid[ri] && state.grid[ri][ci] ? state.grid[ri][ci] : 0
        )
    );
}
</script>

<style scoped>
.row {
  display: flex;
  place-items: center;
}
.cell {
  display: grid;
  place-content: center;
  width: 2rem;
  aspect-ratio: 1;
  border: 1px solid;
  cursor: pointer;
  transition: all 1s ease;
}
</style>
