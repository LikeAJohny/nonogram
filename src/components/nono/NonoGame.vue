<template>
  <div id="game" v-if="game.level">
    <NonoLevel :level="game.level" />
    <NonoHints :data="cols()" type="cols" v-if="!won" />
    <NonoHints :data="rows()" type="rows" v-if="!won" />
    <NonoBoard :game="game" @win="win" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import game from "../../assets/levels/2.json";
import NonoHints from "./NonoHints.vue";
import NonoLevel from "./NonoLevel.vue";
import NonoBoard from "./NonoBoard.vue";

const won = ref(false);
const win = () => (won.value = true);

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
