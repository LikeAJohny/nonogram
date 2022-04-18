<template>
  <div id="game" v-if="game.level">
    <NonoLevel :level="game.level" />
    <NonoHints :data="cols()" type="cols" />
    <NonoHints :data="rows()" type="rows" />
    <NonoBoard :game="game" @complete="win" />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import NonoHints from "./NonoHints.vue";
import NonoLevel from "./NonoLevel.vue";
import NonoBoard from "./NonoBoard.vue";
import { onMounted, ref } from "vue";

interface Game {
  level: number;
  rows: number;
  cols: number;
  solution: Array<number[]>;
}

let game = ref({} as Game);

const win = () => alert("GG YOU'VE WON!");

const rows = (): Array<number[]> => game.value.solution;

const cols = (): Array<number[]> => {
  let cols = [];

  for (let i = 0; i < game.value.cols; i++) {
    let col = [];

    for (let row of game.value.solution) {
      col.push(row[i]);
    }

    cols.push(col);
  }

  return cols;
};

onMounted(async () => {
  const res = await axios.get("http://localhost:8080/1.json");
  game.value = res.data;
});
</script>

<style scoped>
#game {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #ddd;
}
.nono-play {
  display: grid;
  place-items: center;
  place-content: center;
}
</style>
