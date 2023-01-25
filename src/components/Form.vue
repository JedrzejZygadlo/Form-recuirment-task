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
import { Label, Placeholder, FormField, FormFieldSettings } from "../types";
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

    const isRequiredError = (settings: FormFieldSettings, value: string) => {
      return settings.isRequired && !value.length;
    };

    const isMinLengthError = (settings: FormFieldSettings, value: string) => {
      return settings.minLength && value.length < settings.minLength;
    };

    const isMaxLengthError = (settings: FormFieldSettings, value: string) => {
      return settings.maxLength && value.length > settings.maxLength;
    };

    const isEmailError = (settings: FormFieldSettings, value: string) => {
      //regex in form any@any.any (@ and . are required in correct places, regex is avoid whitespaces and multiple @ signs.)
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const notMatched = !value.match(regex);
      return settings.type === "email" && notMatched;
    };

    const validateForm = () => {
      //For each Field create error stack -> statements order has matter bacuse of priority. I've decided to display only one (always first) error per field.
      formFields.value.forEach(({ settings, value }, index) => {
        let errors: string[] = [];
        if (isRequiredError(settings, value)) {
          errors.push(`Field ${settings.label} is required`);
        }
        if (isMinLengthError(settings, value)) {
          errors.push(
            `Field ${settings.label} is to short. Minimum length is ${settings.minLength} characters.`
          );
        }
        if (isMaxLengthError(settings, value)) {
          errors.push(
            `Field ${settings.label} is to long. Maximum length is ${settings.maxLength} characters.`
          );
        }
        if (isEmailError(settings, value)) {
          errors.push(
            `Field ${settings.label} is in wrong format. Please provide correct format f.e: name@domain.com`
          );
        }
        formFields.value[index].errors = [...errors];
      });
    };

    const submitForm = (e: Event) => {
      e.preventDefault();
      isSubmitted.value = true;
      validateForm();
    };
    return { formFields, isSubmitted, submitForm };
  },
});
</script>

<style scoped lang="scss"></style>
