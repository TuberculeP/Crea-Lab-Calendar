<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { getMachines } from "../../utils/api/machines";
import { getEvents } from "../../utils/api/events";
import { generateEventColor } from "../../utils/events";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'

const state = reactive({
  isLoading: false,
  activeView: "week",
});

const machines = ref([]);
const events = ref([]);
const closeDates = ref([]);


const showDialog = ref(false);
const selectedEvent = ref(null);

const tooltip = ref(null);
const tooltipVisible = ref(false);
const tooltipContent = ref("");
const tooltipStyle = ref({
  top: "0px",
  left: "0px",
});

async function loadData(date: Date) {
  state.isLoading = true;

  await getMachines().then((data) => {
    machines.value = data;
  });

  console.log(machines);

  await getEvents().then((data) => {
    events.value = data;
  });

  const dates = getCloseDates();
  // Transform closeDates to match VueCal's event structure
  closeDates.value = dates.map((date) => ({
    ...date,
    title: "Closed",
  }));

  state.isLoading = false;
}

function showTooltip(event: MouseEvent, content: string) {
  tooltipContent.value = content;
  tooltipVisible.value = true;

  if (tooltip.value) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    tooltipStyle.value = {
      top: `${rect.bottom + window.scrollY + 5}px`,
      left: `${rect.left + window.scrollX}px`,
    };
  }
}

function hideTooltip() {
  tooltipVisible.value = false;
}

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
      monthlyRecurrent: false,
    },
  ];

};

function onEventClick(event) {  
  selectedEvent.value = event;
  showDialog.value = true;
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <template v-if="!state.isLoading">
    <vue-cal
      :time-from="8 * 60"
      :time-to="19 * 60"
      :time-step="30"
      :events-on-month-view="'short'"
      show-week-numbers
      hide-weekends
      today-button
      :on-event-click="onEventClick"
      :disable-views="['years', 'year']"
      style="height: 80vh; width: 80vw"
      :splitDays="state.activeView === 'day' ? machines : undefined"
      :events="
        state.activeView === 'day'
          ? [...events, ...closeDates]
          : [...events, ...closeDates].filter((event) => !event.isMachineSlot)
      "
      editable-events
      v-model:active-view="state.activeView"
    >
      <template #event="{ event }">
        <div
          class="event-cell"
          :style="
            generateEventColor(
              event.title
            )
          "
        >
          <div class="event">
            <div class="title">{{ event.title }}</div>
            <p class="description">{{ event.description }}</p>
          </div>
          <div class="assignees">
            <div
              v-for="assignee in event.assignee"
              :key="assignee.directus_users_id.id"
              class="user-tag"
              @mouseenter="showTooltip($event, assignee.directus_users_id.email)"
              @mouseleave="hideTooltip"
            >
              {{ assignee.directus_users_id.first_name[0] }}{{ assignee.directus_users_id.last_name[0] }}
            </div>
          </div>
        </div>
      </template>
    </vue-cal>
  </template>
  <div v-else class="loader"></div> 
  <div
    v-show="tooltipVisible"
    ref="tooltip"
    class="tooltip"
    :style="tooltipStyle"
  >
    {{ tooltipContent }}
  </div>


  <DialogRoot v-model:open="showDialog">
    <DialogOverlay class="DialogOverlay" />
    <DialogPortal>
      <DialogContent class="DialogContent">
        <DialogTitle class="DialogTitle">
          <h1>
          {{ selectedEvent.title }}
          </h1>
        </DialogTitle>
        <DialogDescription class="DialogDescription">

        <div v-if="selectedEvent.isMachineSlot">
          <h3>Machine:</h3>
          <p>{{ machines.find((machine) => machine.id === selectedEvent.split).label }}</p>
       
        </div>

        <h3>Description:</h3>
        <p>{{ selectedEvent.description }}</p>

        <div v-if="selectedEvent.assignee.length > 0">
          <h3>Participants :</h3> 
          <div
          class="assignees-on-card" 
          v-for="
            assignee in selectedEvent.assignee
          ">
            <div class="user-tag">
              {{ assignee.directus_users_id.first_name[0] }}{{ assignee.directus_users_id.last_name[0] }}
            </div>
            <p>{{ assignee.directus_users_id.email }}</p>
          </div>
        </div>
        <div>
          <h3>Date de début :</h3>
          <p>{{ new Date(selectedEvent.start).toLocaleDateString() }}</p>

          <h3>Date de fin :</h3>
          <p>{{ new Date(selectedEvent.end).toLocaleDateString()  }}</p>
        </div>
        </DialogDescription>
        <DialogClose as-child>
          <button
            class="Button green"
            @click="showDialog = false"
          >
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
/* reset */
button,
fieldset
{
  all: unset;
}

.assignees-on-card{
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: start;
}

.DialogOverlay {
  background-color: rgba(0, 0, 0, 0.9); /* var(--black-a9) replaced */
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
}

.DialogContent {
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 38px -10px, rgba(0, 0, 0, 0.2) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;
}
.DialogContent:focus {
  outline: none;
}

.DialogTitle {
  margin: 0;
  font-weight: 500;
  color: #1f2937; /* var(--mauve-12) replaced */
  font-size: 17px;
}

.DialogDescription {
  margin: 10px 0 20px;
  color: #4b5563; /* var(--mauve-11) replaced */
  font-size: 15px;
  line-height: 1.5;
}


.title{
  font-size: large;
  padding: 2px;
}

.description{
  font-size: small;
  padding: 2px;
}

.event {
  display: flex;
  flex-direction: column;
  gap: 1px;
  justify-content: start;
  align-items: start;
}

.event-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: start;
  align-items: start;
}

.assignees {
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 4px;
  align-items: start;
  justify-content: center;
}

.user-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #333;
  font-size: small;
  height: 10px;
  width: 10px;
  border-radius: 100%;
  padding: 6px;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  pointer-events: none;
}

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
