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
  <div v-else class="loader"></div> 
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

.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,#ffa516 94%,#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%,#ffa516);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13{ 
  100%{transform: rotate(1turn)}
}
</style>
