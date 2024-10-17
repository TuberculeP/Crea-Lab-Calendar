<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { deleteClosedPeriod, getClosedPeriods } from '../../utils/api/closed-periods';

const closeDates = ref<Date[]>([]);

const loadData = async () => {
    const dates = await getClosedPeriods();
    closeDates.value = dates;
    console.log('Close dates:', closeDates.value);
}

onMounted(() => {
  loadData();
});
</script>

<template>
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Start date
        </th>
        <th class="text-left">
          End date
        </th>
        <th class="text-left">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="closeDate in closeDates"
        :key="closeDate.start_date"
      >
        <td>{{ new Date(closeDate.start_date).format() }}</td>
        <td>{{ new Date(closeDate.end_date).format() }}</td>
        <td>
            <button @click="() => deleteClosedPeriod(closeDate.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>