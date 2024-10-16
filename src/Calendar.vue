<template>
  <vue-cal selected-date="2024-10-16" :time-from="9 * 60" :time-to="18 * 60" :disable-views="['years', 'year', 'month']"
    hide-view-selector hide-weekends style="height: 80vh; width: 80vw"
    :editable-events=" { title: true, drag: false, resize: true, delete: true, create: false }" :events="events"
    @event-click="onEventClick" />

  <v-dialog v-model="showDialog" v-if="showDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>

        <span class="ml-3">{{ selectedEvent.title + " " || 'No event selected' }}</span>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

// Déclaration des événements
const events = ref([
  {
    start: '2024-10-16 14:00',
    end: '2024-10-16 15:30',
    title: 'Réunion',
    deletable: true,
    resizable: true,
    draggable: true,
    contentFull: 'Détails sur la réunion à 14:00.',
    icon: 'mdi-account-group'
  },
  {
    start: '2024-10-16 16:00',
    end: '2024-10-16 17:00',
    title: 'Cours de sport',
    deletable: true,
    resizable: true,
    draggable: true,
    contentFull: 'Prépare-toi pour le cours de sport !',
    icon: 'mdi-basketball'
  },
]);

const showDialog = ref(false);  // Contrôle la visibilité du dialogue
const selectedEvent = ref({});  // Stocke l'événement sélectionné

// Fonction pour gérer le clic sur un événement
const onEventClick = (event: any, e: MouseEvent) => {
  selectedEvent.value = event;
  showDialog.value = true;  // Afficher le dialogue après clic sur l'événement
  e.stopPropagation();  // Empêche le comportement par défaut de Vue Cal
};

// Fonction pour supprimer l'événement sélectionné
const deleteEvent = () => {
  const index = events.value.findIndex(ev => {
    console.log('Comparing:', formatDate(new Date(ev.start)), 'with', formatDate(new Date(selectedEvent.value.start)) );
    return ev.contentFull === selectedEvent.value.contentFull &&
      ev.deletable === selectedEvent.value.deletable &&
      ev.draggable === selectedEvent.value.draggable &&
      formatDate(new Date(ev.end)) === formatDate(new Date(selectedEvent.value.end)) &&
      ev.icon === selectedEvent.value.icon &&
      ev.resizable === selectedEvent.value.resizable &&
      formatDate(new Date(ev.start)) === formatDate(new Date(selectedEvent.value.start)) &&
      ev.title === selectedEvent.value.title;
  });

  console.log('Deleting event:', index);
  console.log('Selected event:', selectedEvent.value);
  console.log('Events:', events.value);

  if (index !== -1) {
    events.value.splice(index, 1);  // Supprime l'événement de la liste
    showDialog.value = false;       // Fermer le dialogue après suppression
  }
};
</script>

<style scoped>
.detele-button{
  background-color: red;
}
</style>