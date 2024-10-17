<template>
  <div>
    <vue-cal v-model:active-view="state.activeView" @event-click="OpenDelModal">
      <template #event="{ event }">
        <div class="event-cell" :style="generateEventColor(event.title)">
          <div class="event">
            <div class="title">{{ event.title }}</div>
            <p class="description">{{ event.description }}</p>
          </div>
          <div class="assignees">
            <div v-for="assignee in event.assignee" :key="assignee.directus_users_id.id" class="user-tag">
              <!-- Assignee content here -->
            </div>
          </div>
        </div>
      </template>
    </vue-cal>

    <!-- Modal component -->
    <v-dialog v-model="openModal" max-width="500">
      <template v-slot:default="{ isActive }">
        <v-card title="Dialog">
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore
            magna aliqua.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const state = ref({
  activeView: 'month'
});

const openModal = ref(false);  // Définir openModal comme une propriété réactive

const OpenDelModal = (event) => {
  console.log('Event clicked:', event);
  openModal.value = true;  // Ouvrir le modal
};

const generateEventColor = (title) => {
  // Votre logique pour générer la couleur de l'événement
  return { backgroundColor: 'lightblue' };
};

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
</script>

<style scoped>

</style>