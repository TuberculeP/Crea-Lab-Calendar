<script setup lang="ts">
import Modal from "./Calendar/CloseDateModal.vue";
import Calendar from "./Calendar/Calendar.vue";
</script>

<template>
  <Modal :isVisible="true" :bodyComponent="Calendar" />
  <Calendar />
</template>
