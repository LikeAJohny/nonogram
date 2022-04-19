<template>
  <div class="board">
    <div class="row" v-for="(_, ri) in grid" :key="ri">
      <div class="cell" v-for="(_, ci) in grid" :key="ci">
        <NonoCell
          :state="grid[ri][ci]"
          @change="updateCell($event, ri, ci)"
          :disabled="won"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NonoCell from "./NonoCell.vue";

const props = defineProps<{
  game: { rows: number; cols: number; solution: Array<number[]> };
}>();

const emit = defineEmits<{
  (e: "win", value: boolean): void;
}>();

let won = ref(false);
let grid = ref(
  new Array(props.game.rows)
    .fill(0)
    .map(() => new Array(props.game.cols).fill(0))
);

const updateCell = (state: number, ri: number, ci: number): void => {
  grid.value[ri][ci] = state;

  if (isWin()) {
    won.value = true;
    emit("win", true);
  }
};

const isWin = (): boolean => {
  return JSON.stringify(props.game.solution) === JSON.stringify(grid.value);
};
</script>

<style scoped>
.row {
  display: flex;
  place-items: center;
}
</style>
