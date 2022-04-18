<template>
  <div id="game">
    <NonoLevel :level="game.level" />
    <NonoHints :data="cols()" type="cols" />
    <NonoHints :data="rows()" type="rows" />
    <NonoBoard :game="game" @complete="win" />
  </div>
</template>

<script setup lang="ts">
import game from "../../assets/2.json";
import NonoHints from "./NonoHints.vue";
import NonoLevel from "./NonoLevel.vue";
import NonoBoard from "./NonoBoard.vue";

const win = () => alert("GG YOU'VE WON!");

const rows = (): Array<number[]> => game.solution;

const cols = (): Array<number[]> => {
  let cols = [];

  for (let i = 0; i < game.cols; i++) {
    let col = [];

    for (let row of game.solution) {
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
.nono-play {
  display: grid;
  place-items: center;
  place-content: center;
}
</style>
