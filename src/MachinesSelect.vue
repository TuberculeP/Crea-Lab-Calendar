<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { machines } from "./configs/machines";

const props = defineProps({
  selectedMachine: Number
});

const internalSelectedMachine = ref(props.selectedMachine);

const emit = defineEmits(["update:selected-machine"]);

watchEffect(() => {
  if (internalSelectedMachine.value !== undefined) {
    emit("update:selected-machine", internalSelectedMachine.value);
  }
});
</script>

<template>
  <select v-model="internalSelectedMachine">
    <option v-for="machine in machines" :key="machine.id" :value="machine?.id">
      {{ machine.label }}
    </option>
  </select>
</template>