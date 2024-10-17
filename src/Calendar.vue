<template>
  <v-app>
    <v-container>
      <vue-cal :time-from="9 * 60" :time-to="18 * 60" :disable-views="['years', 'year', 'month']" hide-view-selector
        hide-weekends style="height: 80vh; width: 80vw" :events="events" @event-mouse-leave="onEventClick($event)"
        @event-click="onEventClick($event)" />
    </v-container>

    <v-dialog v-model="showDialog" v-if="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="ml-3">{{ selectedEvent.title || 'No event selected' }}</span>
          <v-spacer />
          <strong>{{ selectedEvent.start && new Date(selectedEvent.start).toLocaleDateString() }}</strong>
        </v-card-title>

        <v-card-text>
          <p v-html="selectedEvent.contentFull || 'No details available for this event.'" />
          <strong>Event details:</strong>
          <ul>
            <li>Start time : {{ selectedEvent.start && new Date(selectedEvent.start).toLocaleTimeString() }}</li>
            <li>End time : {{ selectedEvent.end && new Date(selectedEvent.end).toLocaleTimeString() }}</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-btn icon @click="showDialog = false">
            Close
          </v-btn>
          <v-btn rounded="lg" color="red" variant="tonal" size="x-large" @click="deleteEvent">
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

// Définir les événements de manière non dynamique
// const events = ref([
//   {
//     start: '2024-10-16 14:00',
//     end: '2024-10-16 15:30',
//     title: 'Réunion',
//     deletable: true,
//     resizable: true,
//     draggable: true,
//     contentFull: 'Détails sur la réunion à 14:00.',
//     icon: 'mdi-account-group'
//   },
//   {
//     start: '2024-10-16 10:00',
//     end: '2024-10-16 11:00',
//     title: 'Déjeuner avec le client',
//     deletable: true,
//     resizable: true,
//     draggable: true,
//     contentFull: 'Déjeuner pour discuter des exigences du client.',
//     icon: 'mdi-account-group'
//   },
// ]);

const showDialog = ref(false);  // Contrôle la visibilité du dialogue
const selectedEvent = ref({});  // Stocke l'événement sélectionné

// Fonction pour gérer le clic sur un événement
const onEventClick = (event: any) => {
  console.log('Event clicked:', event);
  selectedEvent.value = event;
  showDialog.value = true;
  console.log("Event clicked:", event);
};
</script>