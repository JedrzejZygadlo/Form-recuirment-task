<template>
  <div class="form-basic-input--container">
    <label class="form-basic-input--label">{{ formSettings.label }} </label>
    <input
      :type="formSettings.type"
      :value="modelValue"
      @input="handleInput"
      class="form-control"
      :class="[{ 'is-valid': isValid }, { 'is-error': errors.length }]"
      :placeholder="formSettings.placeholder"
    />
    <p>{{ errors[0] }}</p>
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
    return { isValid };
  },
  methods: {
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit("update:modelValue", target.value);
    },
  },
});
</script>

<style scoped lang="scss"></style>
