<script setup lang="ts">
import { ref, watch } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

const activeView = ref("week");``

watch(activeView, (newVal) => {
  console.log(newVal);
});
</script>

<template>
  <vue-cal
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    show-week-numbers
    :disable-views="['years', 'year', 'month']"
    style="height: 80vh; width: 80vw"
    :splitDays="activeView === 'day' ? [
      { id: 1, class: 'room', label: 'Salle' },
      { id: 2, class: 'printer-3d', label: 'Imprimante 3D' },
      { id: 3, class: 'sewing-machine', label: 'Machine à coudre' }
    ] : undefined"
    v-model:active-view="activeView"
  />
</template>

<style>
.vuecal__cell-split.room {
  background-color: rgba(0, 128, 255, 0.1);
}
.vuecal__cell-split.printer-3d {
  background-color: rgba(255, 0, 212, 0.1);
}
.vuecal__cell-split.sewing-machine {
  background-color: rgba(0, 255, 136, 0.1);
}
</style>