<template>
  <div class="form-container">
    <form>
      <BasicInput
        v-for="formField in formFields"
        :key="formField.settings.label"
        v-model="formField.value"
        :form-settings="formField.settings"
        :isSubmitted="isSubmitted"
        :errors="formField.errors"
      >
      </BasicInput>
      <button type="submit" @click="submitForm">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BasicInput from "./BasicInput.vue";
import { Label, Placeholder, FormField } from "../types";
import type { Ref } from "vue";

export default defineComponent({
  name: "Form",
  components: { BasicInput },

  setup() {
    let formFields: Ref<FormField[]> = ref([
      {
        value: "",
        errors: [],
        settings: {
          type: "text",
          label: Label.NAME,
          placeholder: Placeholder.NAME,
          minLength: 5,
          maxLength: 50,
          isRequired: true,
        },
      },
      {
        value: "",
        errors: [],
        settings: {
          type: "email",
          label: Label.EMAIL,
          placeholder: Placeholder.EMAIL,
          isRequired: true,
        },
      },
      {
        value: "",
        errors: [],
        settings: {
          type: "text",
          label: Label.SUBJECT,
          placeholder: Placeholder.SUBJECT,
          maxLength: 100,
          isRequired: false,
        },
      },
      {
        value: "",
        errors: [],
        settings: {
          type: "text",
          label: Label.MESSAGE,
          placeholder: Placeholder.MESSAGE,
          maxLength: 500,
          isRequired: true,
        },
      },
    ]);
    let isSubmitted: Ref<boolean> = ref(false);

    const submitForm = (e: Event) => {
      e.preventDefault();
      isSubmitted.value = true;
    };
    return { formFields, isSubmitted, submitForm };
  },
});
</script>

<style scoped lang="scss"></style>
