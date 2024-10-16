<script setup lang="ts">
import { onMounted, ref } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

const closeDates = ref([]);
const calEvents = ref([]);

const getCloseDates = () => {
  const now = new Date();

  const start = new Date(now);
  start.setHours(9, 0, 0, 0);

  const end = new Date(now);
  end.setHours(17, 0, 0, 0);

  return [
    {
      id: 1,
      start,
      end,
      monthlyRecurrent: false
    },
  ]

  // api get request
};

const getEvents = () => {
  const now = new Date();
  const tommorow = new Date(now);
  tommorow.setDate(tommorow.getDate() + 1);

  const start = new Date(tommorow);
  start.setHours(9, 0, 0, 0);

  const end = new Date(tommorow);
  end.setHours(12, 0, 0, 0);

  return [
    {
      id: 2,
      start,
      end,
      title: 'Devlab',
    },
  ]
  
  // api get request
};

onMounted(() => {
  const dates = getCloseDates();
  const events = getEvents();
  // Transform closeDates to match VueCal's event structure
  closeDates.value = dates.map((date) => ({
    ...date,
    title: 'Closed',
  }));

  calEvents.value = events;
});
</script>

<template>
  <vue-cal
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    show-week-numbers
    :disable-views="['years', 'year', 'month']"
    :events="[...calEvents, ...closeDates]"
    style="height: 80vh; width: 80vw"
  />
</template>
