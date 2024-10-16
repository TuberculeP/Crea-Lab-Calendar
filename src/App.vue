<script setup lang="ts">
import Calendar from "./Calendar.vue";
import Modal from "./Modal.vue";
import Add from "./forms/Add.vue";
</script>

<template>
  <Modal :isVisible="true" :body-component="Add" />
  <Calendar />
</template>
