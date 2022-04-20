<template>
  <div class="level-select">
    <select @change="onSelectLevel">
      <option value="1">Level 1</option>
      <option value="2">Level 2</option>
      <option value="3">Level 3</option>
    </select>
  </div>
  <div id="game">
    <NonoLevel :level="state.level.no" />
    <NonoHints :grid="cols()" type="cols" v-if="!state.won" />
    <NonoHints :grid="rows()" type="rows" v-if="!state.won" />
    <NonoBoard :level="state.level" @win="win" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import NonoHints from "./NonoHints.vue";
import NonoLevel from "./NonoLevel.vue";
import NonoBoard from "./NonoBoard.vue";
import type { Level, Grid } from "../../types/level";

const state = reactive({ level: await getLevel(1), won: false });

async function getLevel(id: number): Promise<Level> {
  return await fetch(`/levels/${id}.json`).then((res) => res.json());
}

async function onSelectLevel(e: Event): Promise<void> {
  const id = parseInt((e.target as HTMLSelectElement).value);
  state.level = await getLevel(id);
}

const win = () => (state.won = true);

const rows = (): Grid => state.level.solution;

const cols = (): Grid => {
  let cols = [];

  for (let i = 0; i < state.level.cols; i++) {
    let col = [];

    for (let row of state.level.solution) {
      col.push(row[i]);
    }

    cols.push(col);
  }

  return cols;
};
</script>

<style scoped>
#game {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #ddd;
}
</style>
