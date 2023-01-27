<template>
  <div class="form-field--container">
    <label class="form-field--label">{{ formSettings.label }} </label>
    <div class="form-field--input-wrapper">
      <input
        v-if="isInput"
        :type="formSettings.type"
        :value="modelValue"
        @input="handleInput"
        class="form-control"
        :class="[{ 'is-valid': isValid }, { 'is-error': errors.length }]"
        :placeholder="formSettings.placeholder"
        :maxLength="formSettings.maxLength ? formSettings.maxLength : null"
      />
      <textarea
        v-else-if="isTextArea"
        :value="modelValue"
        @input="handleInput"
        class="form-control"
        :class="[{ 'is-valid': isValid }, { 'is-error': errors.length }]"
        :placeholder="formSettings.placeholder"
        :maxLength="formSettings.maxLength ? formSettings.maxLength : null"
        :rows="formSettings.rows"
      />
      <BaseSvg v-if="isValid" :name="'valid'" :width="16" :height="16">
        <ValidIcon />
      </BaseSvg>
      <BaseSvg
        v-else-if="errors.length"
        :name="'error'"
        :width="16"
        :height="16"
      >
        <ErrorIcon />
      </BaseSvg>
    </div>
    <p v-show="errors.length" class="error-message">{{ errors[0] }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { FormFieldSettings, IputProps } from "../types";
import BaseSvg from "./BaseSvg.vue";
import { ErrorIcon, ValidIcon } from "./svgs";

export default defineComponent({
  name: "Field",
  components: { BaseSvg, ErrorIcon, ValidIcon },
  props: {
    formSettings: {
      type: Object as PropType<FormFieldSettings>,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
      required: true,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
      required: true,
    },
    errors: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props: IputProps) {
    const isValid = computed(() => props.isSubmitted && !props.errors.length);
    const isInput = computed(
      () =>
        props.formSettings.type === "text" ||
        props.formSettings.type === "email"
    );
    const isTextArea = computed(() => props.formSettings.type === "textarea");
    return { isValid, isInput, isTextArea };
  },
  methods: {
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit("update:modelValue", target.value);
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.form-field--container {
  @include column-left;
  margin: $spacing-3 0;
  .form-field--label {
    font-size: $xs;
    font-weight: 700;
    margin: spacing(1) 0;
  }
  .form-field--input-wrapper {
    width: 100%;
    position: relative;
    textarea {
      resize: none;
    }
  }
  .valid-svg {
    @include input-icon-position;
    fill: $green;
  }
  .error-svg {
    @include input-icon-position;
    fill: $red;
  }
  .form-control {
    width: 100%;
    box-sizing: border-box;
    padding: spacing(2);
    border: 2px solid $lightGray;
    color: $darkGray;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    &::placeholder {
      color: $lightGray;
      font-family: Avenir, Helvetica, Arial, sans-serif;
    }
    &.is-valid {
      border-color: $green;
    }
    &.is-error {
      border-color: $red;
    }
  }
  .error-message {
    font-size: $xxxs;
    color: $red;
    margin: spacing(1) 0 0 0;
    font-weight: 700;
  }
}
</style>
