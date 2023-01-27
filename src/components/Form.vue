<template>
  <div class="form-content-container">
    <form>
      <Field
        v-for="formField in formFields"
        :key="formField.settings.label"
        v-model="formField.value"
        :form-settings="formField.settings"
        :isSubmitted="isSubmitted"
        :errors="formField.errors"
      >
      </Field>
      <button type="submit" @click="submitForm" class="submit-button">
        Send
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Field from "./Field.vue";
import { Label, Placeholder, FormField, FormFieldSettings } from "../types";
import type { Ref } from "vue";
import { Status, PayloadType } from "../types";
import apiClient from "../service";

export default defineComponent({
  name: "Form",
  components: { Field },

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

    const isEmailError = (
      settings: FormFieldSettings,
      value: string
    ): boolean => {
      //regex in form any@any.any (@ and . are required in correct places, regex is avoid whitespaces and multiple @ signs.)
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const notMatched = !value.match(regex);
      return settings.type === "email" && notMatched;
    };

    const validateForm = (): void => {
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

    const changeStatus = (newStatus: string): void => {
      context.emit("status", newStatus);
    };

    const submitForm = (e: Event): void => {
      e.preventDefault();
      isSubmitted.value = true;
      validateForm();
      if (isSomeError) return;

      const data = getFormDataToSend();
      changeStatus(Status.LOADING);
      sendMessage(data)
        .then(() => {
          changeStatus(Status.SUCCESS);
        })
        .catch(() => {
          changeStatus(Status.FAILED);
        });
    };

    const getFormDataToSend = (): PayloadType => {
      return formFields.value.reduce((acc, curr) => {
        return {
          ...acc,
          ...{
            [curr.settings.label.toLowerCase()]: curr.value.replace(
              "/\n/g",
              " "
            ),
          },
        };
      }, {});
    };

    const sendMessage = (data: PayloadType): Promise<PayloadType> => {
      return apiClient.post("/message", data);
    };

    return {
      formFields,
      isSubmitted,
      submitForm,
      setSomeError,
      isSomeError,
      getFormDataToSend,
    };
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
