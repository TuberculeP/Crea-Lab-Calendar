<template>
  <vue-cal selected-date="2024-10-16" :time-from="9 * 60" :time-to="18 * 60" :disable-views="['years', 'year', 'month']"
    hide-view-selector hide-weekends style="height: 80vh; width: 80vw"
    :editable-events=" { title: true, drag: false, resize: true, delete: true, create: false }" :events="events" @event-mouse-enter="testEvents($event)"/>
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

// Définir les événements de manière non dynamique
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
    start: '2024-10-16 10:00',
    end: '2024-10-16 11:00',
    title: 'Déjeuner avec le client',
    deletable: true,
    resizable: true,
    draggable: true,
    contentFull: 'Déjeuner pour discuter des exigences du client.',
    icon: 'mdi-account-group'
  },
]);

const showDialog = ref(false);  // Contrôle la visibilité du dialogue
const selectedEvent = ref({});  // Stocke l'événement sélectionné

// Fonction pour afficher les événements dans la console
const testEvents = () => {
  console.log("Liste des événements : ", events.value);
};

// Fonction pour gérer le clic sur un événement
const onEventClick = (event: any, e: MouseEvent) => {
  selectedEvent.value = event;
  showDialog.value = true;
  console.log("all event", events.value);

  // Prevent navigating to narrower view (default vue-cal behavior).
  e.stopPropagation();
};

// Fonction pour comparer les propriétés communes de deux objets
const compareCommonProperties = (obj1: any, obj2: any) => {
  const commonKeys = ['start', 'end', 'title', 'deletable', 'resizable', 'draggable', 'contentFull', 'icon'];
  for (const key of commonKeys) {
    if (key === 'start' || key === 'end') {
      // Convertir les dates en objets Date pour comparaison
      const date1 = new Date(obj1[key]);
      const date2 = new Date(obj2[key]);
      if (date1.getTime() !== date2.getTime()) {
        console.log(`Mismatch on ${key}: ${date1} !== ${date2}`);
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      console.log(`Mismatch on ${key}: ${obj1[key]} !== ${obj2[key]}`);
      return false;
    }
  }
  return true;
};

// Fonction pour supprimer l'événement sélectionné
const deleteEvent = () => {
  const index = events.value.findIndex(ev => {
    console.log('Comparing:', ev, 'with', selectedEvent.value);
    return compareCommonProperties(ev, selectedEvent.value);
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
