<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Add',
  props: {},
  setup() {
    // Références pour stocker les valeurs des champs
    const title = ref('');
    const description = ref('');
    const startDate = ref('');
    const endDate = ref('');
    const userId = 'your-user-id'; // Remplace par l'id de l'utilisateur
    const assignees = ref<string[]>([]); // Assigne les IDs des utilisateurs ici
    const machineId = ref<string | null>(null); // Facultatif, si applicable

    const handleSubmit = async () => {
        const payload = {
          user_id: userId,
          start_date: new Date(startDate.value).getTime(),
          end_date: new Date(endDate.value).getTime(),
          title: title.value,
          description: description.value,
          assignees: assignees.value,
          machine_id: machineId.value,
        };

        console.log(payload)

      /*
          try {

        // Envoie de la requête à votre backend
        const response = await fetch('https://your-backend-api/endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log('Données envoyées avec succès');
          // Ajoute ici la logique supplémentaire si nécessaire
        } else {
          console.error('Erreur lors de l\'envoi des données');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
      */
    };

    return {
      title,
      description,
      startDate,
      endDate,
      machineId,
      assignees,
      handleSubmit,
    };
  },
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="title">Title :</label>
      <input v-model="title" type="text" name="title" id="title" class="form-input" />
    </div>
    <div class="form-group">
      <label for="assignees">Assignees :</label>
      <input v-model="assignees" type="text" name="title" id="title" class="form-input" />
    </div>
    <div class="form-group">
      <label for="description">Description :</label>
      <textarea v-model="description" name="description" id="description" cols="30" rows="10" class="form-input" />
    </div>
    <div class="form-group">
      <label for="start-date">Start date :</label>
      <input v-model="startDate" type="datetime-local" name="start-date" id="start-date" class="form-input" />
    </div>
    <div class="form-group">
      <label for="end-date">End date :</label>
      <input v-model="endDate" type="datetime-local" name="end-date" id="end-date" class="form-input" />
    </div>
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
form {
  width: 100%;
  height: 100%;
  margin-top: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
}
</style>
