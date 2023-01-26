<template>
  <div class="form-basic-input--container">
    <label class="form-basic-input--label">{{ formSettings.label }} </label>
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
    <p v-show="errors.length" class="error-message">{{ errors[0] }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { FormFieldSettings, IputProps } from "../types";
export default defineComponent({
  name: "BasicInput",
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
.form-basic-input--container {
  @include column-left;
  margin: $spacing-3 0;
  .form-basic-input--label {
    font-size: $xs;
    font-weight: 700;
    margin: spacing(1) 0;
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
