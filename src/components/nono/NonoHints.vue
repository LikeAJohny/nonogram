<template>
  <div
    :class="{
      hints,
      'hints--flex': type === 'cols',
      'hints--grid': type === 'rows',
    }"
  >
    <div
      :class="{
        'hints__line--flex': type === 'rows',
        'hints__line--grid': type === 'cols',
      }"
      v-for="(hint, hi) in hints"
      :key="hi"
    >
      <span class="hints__cell" v-for="(num, ni) in hint" :key="ni">
        {{ num }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  data: Array<number[]>;
  type: "rows" | "cols";
}>();

const hints = computed(() => {
  let hints = [];

  for (let line of props.data) {
    const hint = line.reduce((ac: number[], x: number, i: number) => {
      if (i !== 0 && x === 1) ac[ac.length - 1] += x;
      else ac.push(x);

      return ac;
    }, []);

    hints.push(hint.filter((v: number) => v !== 0));
  }

  return hints;
});
</script>

<style scoped>
.hints--flex {
  display: flex;
}
.hints--grid {
  display: grid;
}
.hints__line {
  display: grid;
  place-items: center;
  place-content: end;
  width: 2rem;
}
.hints__line--flex {
  display: flex;
  place-content: end;
  padding: 0 0.5rem;
}
.hints__line--grid {
  display: grid;
  place-items: center;
  place-content: end;
  width: 2rem;
}
.hints__cell {
  display: grid;
  place-content: center;
  width: 2rem;
  aspect-ratio: 1;
}
</style>
