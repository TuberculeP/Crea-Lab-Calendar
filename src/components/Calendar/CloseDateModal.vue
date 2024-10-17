<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import { ref } from 'vue';
import { createClosedPeriod } from '../../utils/api/closed-periods';

const startDate = ref('');
const endDate = ref('');
const monthlyRecurrent = ref(false);

const validateForm = async () => {
  await createClosedPeriod({
    start_date: startDate.value,
    end_date: endDate.value,
  });
  console.log('Monthly Recurrent:', monthlyRecurrent.value);
  
  // api post request
};
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class="Button"
    >
      Add close date
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="DialogOverlay" />
      <DialogContent
        class="DialogContent"
      >
        <DialogTitle class="DialogTitle">
          Add close date
        </DialogTitle>
        <DialogDescription class="DialogDescription">
          Set a date when the CreaLab will be closed.
        </DialogDescription>
        <fieldset class="Fieldset">
          <label
            class="Label"
            for="start-date"
          > Start Date </label>
          <input
            id="start-date"
            type="date"
            class="Input"
            v-model="startDate"
          >
        </fieldset>
        <fieldset class="Fieldset">
          <label
            class="Label"
            for="end-date"
          > End Date </label>
          <input
            id="end-date"
            type="date"
            class="Input"
            v-model="endDate"
          >
        </fieldset>
        <!-- monthly reccurent checkbox -->
        <fieldset class="Fieldset">
          <label
            class="Label"
            for="monthly-reccurent"
          > Monthly reccurent </label>
          <label class="CustomCheckbox">
            <input
              id="monthly-reccurent"
              type="checkbox"
              class="Checkbox"
              v-model="monthlyRecurrent"
            >
            <svg class="CheckboxIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </label>
        </fieldset>
        <div :style="{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }">
          <DialogClose as-child>
            <button
              class="Button green"
              @click="validateForm"
            >
              Add close date
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="IconButton"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
/* reset */
button,
fieldset
{
  all: unset;
}

* {
  color: black;
}

.DialogOverlay {
  background-color: rgba(0, 0, 0, 0.9); /* var(--black-a9) replaced */
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.DialogContent {
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 38px -10px, rgba(0, 0, 0, 0.2) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.DialogContent:focus {
  outline: none;
}

.DialogTitle {
  margin: 0;
  font-weight: 500;
  color: #1f2937; /* var(--mauve-12) replaced */
  font-size: 17px;
}

.DialogDescription {
  margin: 10px 0 20px;
  color: #4b5563; /* var(--mauve-11) replaced */
  font-size: 15px;
  line-height: 1.5;
}

.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
}
.Button.grass {
  background-color: #ffffff;
  color: #276749; /* var(--grass-11) replaced */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07); /* var(--black-a7) replaced */
}
.Button.grass:hover {
  background-color: #f5f7fa; /* var(--mauve-3) replaced */
}
.Button.grass:focus {
  box-shadow: 0 0 0 2px black;
}
.Button.green {
  background-color: #c6f6d5; /* var(--green-4) replaced */
  color: #22543d; /* var(--green-11) replaced */
}
.Button.green:hover {
  background-color: #9ae6b4; /* var(--green-5) replaced */
}
.Button.green:focus {
  box-shadow: 0 0 0 2px #38a169; /* var(--green-7) replaced */
}

.IconButton {
  all: unset;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #276749; /* var(--grass-11) replaced */
  position: absolute;
  top: 10px;
  right: 10px;
}
.IconButton:hover {
  background-color: #9ae6b4; /* var(--grass-4) replaced */
}
.IconButton:focus {
  box-shadow: 0 0 0 2px #38a169; /* var(--grass-7) replaced */
}

.Fieldset {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
  border: none
}

.Label {
  font-size: 15px;
  color: #276749; /* var(--grass-11) replaced */
  width: 90px;
  text-align: right;
}

.Input {
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid black;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: #ffffff; /* var(--grass-11) replaced */
  box-shadow: 0 0 0 1px #38a169; /* var(--grass-7) replaced */
  height: 35px;
  background-color: #38a169;
}
.Input:focus {
  box-shadow: 0 0 0 2px #48bb78; /* var(--grass-8) replaced */
}

.CustomCheckbox {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid #2c7a7b; /* Default border color */
  background-color: #ffffff; /* Default background color */
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Hide the native checkbox input */
.Checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* The SVG checkmark icon */
.CheckboxIcon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: transparent;
  stroke-width: 2;
  transition: stroke 0.2s ease;
}

/* When the checkbox is checked, change the background and show the SVG */
.Checkbox:checked + .CheckboxIcon {
  background-color: #38a169; /* Green background when checked */
  border-color: #2f855a; /* Darker green border when checked */
  stroke: white; /* Show the white checkmark */
}

/* Hover and focus effects */
.CustomCheckbox:hover {
  border-color: #68d391; /* Lighter green on hover */
}

.CustomCheckbox:focus-within {
  box-shadow: 0 0 0 2px #276749; /* Focus shadow */
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>