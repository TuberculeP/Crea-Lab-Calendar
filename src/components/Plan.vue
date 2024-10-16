<script setup lang="ts">
import { deleteItem } from "@directus/sdk";
import { PlanType } from "../types";
import { apiClient } from "../utils/api/api_client";

const { isActive, plan } = defineProps<{
  isActive: boolean;
  plan: PlanType;
}>();

const deletePlan = async (id: number) => {
  const results = await apiClient.request(deleteItem("CalendarEvent", id));
  console.log(results);
};
</script>

<template>
  <v-dialog max-width="500">
    <template v-if="isActive">
      <v-card title="Dialog">
        <v-card-title>
          {{ plan.title }}
        </v-card-title>
        <v-card-text>
          {{ plan.description }}
        </v-card-text>
        <v-card-text> {{ plan.start }} => {{ plan.end }} </v-card-text>
        <v-btn text="Delete" @click="() => deletePlan(plan.id)"></v-btn>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="isActive = !isActive"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
