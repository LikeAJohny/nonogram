<template>
  <div class="create-form">
    <div class="form-group">
      <label for="rows">Rows</label>
      <input type="number" id="rows" v-model="state.rows" tabindex="1" />
    </div>
    <div class="form-group">
      <label for="cols">Cols</label>
      <input type="number" id="cols" v-model="state.cols" tabindex="2" />
    </div>
    <div class="form-group">
      <button @click="save" tabindex="3">Save Level</button>
    </div>
  </div>
  <div class="level">
    <div class="board">
      <div class="row" v-for="(row, ri) in state.grid" :key="ri">
        <div
          :class="{ cell: true, filled: state.grid[ri][ci] === 1 }"
          v-for="(_, ci) in row"
          :key="ci"
          @click="updateCell(ri, ci)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import type { Grid } from "@/types/level";

const state = reactive(initState());

watch(
  () => [state.rows, state.cols],
  () => (state.grid = generateGrid(state.rows, state.cols))
);

function initState() {
  return {
    rows: 4,
    cols: 4,
    grid: new Array(4).fill(0).map(() => new Array(4).fill(0)),
  };
}

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

function save(): void {
  console.log(state.grid);
}

onMounted(() => {
  document.getElementById("rows")?.focus();
});
</script>

<style scoped>
.create-form {
  display: flex;
  column-gap: 1rem;
  margin-top: 2rem;
}
.form-group {
  display: grid;
}
.level {
  display: grid;
  place-content: center;
  width: 100%;
  margin-top: 2rem;
}
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
  transition: all 0.33s ease;
}
.cell.filled {
  background-color: var(--color-text);
}
</style>
