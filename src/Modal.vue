<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    bodyComponent: {
      type: Object as PropType<ReturnType<typeof defineComponent>>,
      required: false,
    },
  },
  data () {
    return {
      spanVisible: this.isVisible
    }
  },
  methods: {
    toggleModal() {
      this.spanVisible = !this.spanVisible
    },
  },
});
</script>

<template>
  <button @click="toggleModal" >Open</button>
  <div v-if="spanVisible" class="modal-overlay">
    <div class="modal-content">
      <button @click="toggleModal">Close</button>
      <component :is="bodyComponent" />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
  max-width: 90%;
  position: relative;
}
</style>
