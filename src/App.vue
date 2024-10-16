<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import Calendar from "./Calendar.vue";
import useConnexion from "./composables/useConnexion";
import { apiClient } from "./utils/api/api_client";
import { readItems } from "@directus/sdk";

const { isConnected, connect } = useConnexion();

onBeforeMount(async () => {
  if (!isConnected.value) {
    const { access_token } =
      (await apiClient.login(
        import.meta.env.VITE_DIRECTUS_TEST_EMAIL,
        import.meta.env.VITE_DIRECTUS_TEST_PASSWORD
      )) || {};
    if (!access_token) {
      console.error("Failed to login");
      return;
    }
    await connect(access_token);
  }
});

onMounted(async () => {
  const results = await apiClient.request(readItems("CalendarEvent"));
  console.log(results);
});
</script>

<template>
  <Calendar />
</template>
