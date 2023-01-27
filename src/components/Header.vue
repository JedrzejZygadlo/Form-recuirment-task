<template>
  <div class="form-header">
    <BaseSvg
      :name="'logo'"
      :width="200"
      :height="100"
      :viewBox="'0 0 264.26 57.45'"
    >
      <Logo />
    </BaseSvg>
    <div class="form-header-inner-wrapper">
      <h1 class="form-header--text">Send us a message</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseSvg from "./BaseSvg.vue";
import { Logo } from "./svgs";

export default defineComponent({
  name: "Header",
  components: { BaseSvg, Logo },
});
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

.form-header {
  .form-header-inner-wrapper {
    background-color: $lightBlue;
    padding: spacing(2) spacing(4);
  }
  .form-header--text {
    margin: 0;
    font-size: $sm;
  }
}
</style>
