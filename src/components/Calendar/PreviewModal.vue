<script setup>
import { defineProps, ref } from "vue";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "radix-vue";
import {updateItem} from "@directus/sdk";
import {apiClient} from "../../utils/api/api_client.ts";

const props = defineProps({
  selectedEvent: Object,
  modelValue: Boolean,
  machines: Array,
  editable: Boolean,
});

const title = ref(props.selectedEvent?.title);
const description = ref(props.selectedEvent?.description);
const startDate = ref(props.selectedEvent?.start ? new Date(props.selectedEvent.start).toISOString().slice(0, 16) : '');
const endDate = ref(props.selectedEvent?.end ? new Date(props.selectedEvent.end).toISOString().slice(0, 16) : '');

const emit = defineEmits(["update:modelValue"]);

const updateModelValue = (newValue) => {
  emit("update:modelValue", newValue);
};

const validateForm = async () => {
  const payload = {
    event_id: props.selectedEvent?.id,
    title: title.value,
    description: description.value,
    start_date: startDate.value,
    end_date: endDate.value,
  }

  try {
    const res = await apiClient.request(updateItem("CalendarEvent", props.selectedEvent?.id, payload ));
    console.log("Mise à jour réussie :", res);
    updateModelValue(false);
    location.reload();
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
}

</script>

<template>
  <DialogRoot
    v-if="props.selectedEvent"
    :open="modelValue"
    @update:open="updateModelValue"
  >
    <DialogOverlay class="DialogOverlay" />
    <DialogPortal>
      <DialogTitle class="DialogTitle"> Update event </DialogTitle>
      <DialogDescription class="DialogDescription">
        Modify your slot.
      </DialogDescription>
      <DialogContent v-if="editable" class="DialogContent">
        <fieldset class="Fieldset">
          <label class="Label" for="start-date"> Title </label>
          <input
              id="title"
              type="text"
              class="Input"
              v-model="title"
              :placeholder="props.selectedEvent?.title"
          />
        </fieldset>
        <fieldset class="Fieldset">
          <label class="Label" for="description"> Description </label>
          <textarea
              id="description"
              type="text"
              class="Input Textarea"
              v-model="description"
              :placeholder="props.selectedEvent?.description"
          />
        </fieldset>
        <fieldset class="Fieldset">
          <label class="Label" for="start-date"> Start Date </label>
          <input
              id="start-date"
              type="datetime-local"
              class="Input"
              v-model="startDate"
              :placeholder="props.selectedEvent?.startDate"
          />
        </fieldset>
        <fieldset class="Fieldset">
          <label class="Label" for="end-date"> End Date </label>
          <input
              id="end-date"
              type="datetime-local"
              class="Input"
              v-model="endDate"
              :placeholder="props.selectedEvent?.endDate"
          />
        </fieldset>
        <div
            :style="{
            display: 'flex',
            marginTop: 25,
            justifyContent: 'flex-end',
          }"
        >
          <DialogClose as-child>
            <button class="Button orange" @click="validateForm">
              Update event
            </button>
          </DialogClose>
        </div>
      </DialogContent>

      <DialogContent v-else>
        <DialogTitle class="DialogTitle">
          <h1>
            {{ props.selectedEvent?.title }}
          </h1>
        </DialogTitle>
        <DialogDescription class="DialogDescription">
          <div v-if="props.selectedEvent?.isMachineSlot">
            <h3>Machine:</h3>
            <p>
              {{
                props.machines.find(
                    (machine) => machine.id === selectedEvent.split
                ).label
              }}
            </p>
          </div>

          <div v-if="props.selectedEvent?.description">
            <h3>Description:</h3>
            <p>{{ props.selectedEvent?.description }}</p>
          </div>

          <div v-if="props.selectedEvent?.assignee?.length > 0">
            <h3>Participants :</h3>
            <div
                class="assignees-on-card"
                v-for="assignee in props.selectedEvent.assignee"
            >
              <div class="user-tag">
                {{ assignee.directus_users_id.first_name[0]
                }}{{ assignee.directus_users_id.last_name[0] }}
              </div>
              <p>{{ assignee.directus_users_id.email }}</p>
            </div>
          </div>
          <div>
            <h3>Date de début :</h3>
            <p>
              {{ new Date(props.selectedEvent.start).toLocaleDateString() }}
            </p>

            <h3>Date de fin :</h3>
            <p>{{ new Date(props.selectedEvent.end).toLocaleDateString() }}</p>
          </div>
        </DialogDescription>
        <DialogClose as-child>
          <button class="Button" @click="updateModelValue(false)">Close</button>
        </DialogClose>
      </DialogContent>

    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
/* reset */
button,
fieldset {
  all: unset;
}

.assignees-on-card {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: start;
}

.DialogOverlay {
  background-color: rgba(0, 0, 0, 0.9); /* var(--black-a9) replaced */
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
}

.DialogContent {
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 38px -10px,
    rgba(0, 0, 0, 0.2) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;
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

.Fieldset {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
  border: none;
}

.Label {
  font-size: 15px;
  color: #ff6934; /* var(--grass-11) replaced */
  width: 90px;
  text-align: right;
}

.Input {
  font-family: monospace;
  letter-spacing: normal;
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
  box-shadow: 0 0 0 1px #ff6934; /* var(--grass-7) replaced */
  height: 35px;
  background-color: #ff6934;
  resize: none;
}
.Input:focus {
  box-shadow: 0 0 0 2px #48bb78; /* var(--grass-8) replaced */
}

.Textarea {
  height: 150px;
  padding: 10px;
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
  background-color: #ff6934;
}
.Button.orange {
  background-color: #ff7848; /* var(--green-4) replaced */
  color: white; /* var(--green-11) replaced */
}
.Button.orange:hover {
  background-color: #ff6934; /* var(--green-5) replaced */
}
.Button.orange:focus {
  box-shadow: 0 0 0 2px #ff6934; /* var(--green-7) replaced */
}

.title {
  font-size: large;
  padding: 2px;
}

.description {
  font-size: small;
  padding: 2px;
}

.event {
  display: flex;
  flex-direction: column;
  gap: 1px;
  justify-content: start;
  align-items: start;
}

.event-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: start;
  align-items: start;
}

.assignees {
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 4px;
  align-items: start;
  justify-content: center;
}

.user-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #333;
  font-size: small;
  height: 10px;
  width: 10px;
  border-radius: 100%;
  padding: 6px;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  pointer-events: none;
}

.vuecal__cell-split.room {
  background-color: rgba(0, 128, 255, 0.1);
}
.vuecal__cell-split.printer-3d {
  background-color: rgba(255, 0, 212, 0.1);
}
.vuecal__cell-split.sewing-machine {
  background-color: rgba(0, 255, 136, 0.1);
}
</style>
