<script setup lang="ts">
import { onMounted } from "vue";
import Home from "./components/Home.vue";
import { useConnexion } from "./composables/useConnexion";

const { isConnected, localTestConnect } = useConnexion();

onMounted(() => {
  localTestConnect();
});
</script>

<template>
  <Home v-if="isConnected" />
  <div v-else>Chargement...</div>
</template>
