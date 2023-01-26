<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width + 'px'"
    :height="height + 'px'"
    :viewBox="viewBox"
    :aria-label="name"
    role="presentation"
    :class="`${name}-svg`"
  >
    <slot />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SvgBase",
  props: {
    width: {
      type: Number,
      default: 16,
      required: true,
    },
    height: {
      type: Number,
      default: 16,
      required: true,
    },
    name: {
      type: String,
      default: "icon",
      required: true,
    },
    viewBox: {
      type: String,
      default: "0 0 512 512",
      required: false,
    },
  },
});
</script>

<style scoped lang="scss"></style>
