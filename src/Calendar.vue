<script setup lang="ts">
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
</script>

<template>
  <vue-cal :time-from="8 * 60" :time-to="19 * 60" :time-step="30" show-week-numbers
    :disable-views="['years', 'year', 'month']" style="height: 80vh; width: 80vw" />
</template>


