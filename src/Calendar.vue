<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { getMachines, getEvents } from "./utils/events";

const state = reactive({
  isLoading: false,
  activeView: "week",
});

const machines = ref([]);
const events = ref([]);

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
  console.log(machines.value);

  await getEvents().then((data) => {
    events.value = data;
  });

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
      :disable-views="['years', 'year']"
      style="height: 80vh; width: 80vw"
      :splitDays="state.activeView === 'day' ? machines : undefined"
      :events="
        state.activeView === 'day'
          ? events
          : events.filter((event) => !event.isMachineSlot)
      "
      editable-events
      v-model:active-view="state.activeView"
    >
      <template #event="{ event }">
        <div
          v-if="event.isMachineSlot && state.activeView === 'day'"
          class="event-cell"
        >
          <div class="event">
            <div class="title">{{ event.title }}</div>
          </div>
          <div class="assignees">
            <div
              v-for="assignee in event.assignees"
              :key="assignee.id"
              class="user-tag"
              @mouseenter="showTooltip($event, assignee.email)"
              @mouseleave="hideTooltip"
            >
              {{ assignee.first_name[0] }}{{ assignee.last_name[0] }}
            </div>
          </div>
        </div>
      </template>
    </vue-cal>
  </template>
  <template v-else>
    <div class="spin">Loading ...</div>
  </template>
  <div
    v-show="tooltipVisible"
    ref="tooltip"
    class="tooltip"
    :style="tooltipStyle"
  >
    {{ tooltipContent }}
  </div>
</template>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  gap: 2px;
  align-items: start;
  justify-content: center;
}

.user-tag {
  background-color: #f0f0f0;
  font-size: small;
  border-radius: 100%;
  padding: 5px;
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
