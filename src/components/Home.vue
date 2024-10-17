<script setup lang="ts">
import { onMounted, ref } from "vue";
import Calendar from "./Calendar/Calendar.vue";
import Modal from "./Calendar/CloseDateModal.vue";
import CloseDateTable from "./Calendar/CloseDateTable.vue";
import { apiClient } from "../utils/api/api_client";
import { readItems } from "@directus/sdk";

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  const results = await apiClient.request(readItems("CalendarEvent"));
  isLoading.value = false;
});
</script>

<template>
  <div class="page" v-if="!isLoading">
    <div class="navbar">
      <h1 class="title">CreaLab Planning</h1>

      <div class="admin-panel">
        <p>Admin actions</p>
        <Modal :isVisible="true" :bodyComponent="Calendar" />
      </div>
    </div>
    <Calendar />
    <CloseDateTable />
  </div>
  <!-- LOADER -->
  <template v-else>
    <div class="spin">Loading ...</div>
  </template>
</template>

<style scoped>
.admin-panel {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
.title {
  color: white;
  font-size: large;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0 !important;
  background-color: #262d34;
}

.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 !important;
  padding: 1rem;
  height: 100vh;
  width: 100%;
}
</style>
