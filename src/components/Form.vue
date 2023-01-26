<template>
  <div class="form-content-container">
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
      <button type="submit" @click="submitForm" class="submit-button">
        Send
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BasicInput from "./BasicInput.vue";
import { Label, Placeholder, FormField, FormFieldSettings } from "../types";
import type { Ref } from "vue";
import { Status } from "../types";

export default defineComponent({
  name: "Form",
  components: { BasicInput },

  setup(props, context) {
    let isSomeError = false;
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
          type: "textarea",
          label: Label.SUBJECT,
          placeholder: Placeholder.SUBJECT,
          maxLength: 100,
          rows: 2,
          isRequired: false,
        },
      },
      {
        value: "",
        errors: [],
        settings: {
          type: "textarea",
          label: Label.MESSAGE,
          placeholder: Placeholder.MESSAGE,
          maxLength: 500,
          rows: 4,
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
      setSomeError(false);
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
        if (errors.length) {
          setSomeError(true);
        }
        formFields.value[index].errors = [...errors];
      });
    };

    const setSomeError = (isError: boolean) => (isSomeError = isError);

    const setIsOpened = (newStatus: string) => {
      console.log("inside2");
      console.log("newStatus", newStatus);
      context.emit("status", newStatus);
    };

    const submitForm = (e: Event) => {
      e.preventDefault();
      isSubmitted.value = true;
      validateForm();
      if (!isSomeError) {
        setIsOpened(Status.LOADING);
      }
      // TODO: SEND REQUEST
      // IF SUCCESS - change status + reset values
      // IF FAILED - change status
    };
    return { formFields, isSubmitted, submitForm, setSomeError, isSomeError };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.form-content-container {
  margin: $spacing-4 0 $spacing-8 0;
}
.submit-button {
  background-color: $midBlue;
  font-size: $sm;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  padding: $spacing-3 $spacing-2;
  width: 100%;
  margin-top: $spacing-3;
  color: $darkGray;
}
</style>
