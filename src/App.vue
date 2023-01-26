<template>
  <div id="app">
    <EntryIcon class="entry-icon" />
    <div class="form-container">
      <Header />
      <Form @status="changeStatus" />
    </div>
    <Modal :status="status" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Form from "./components/Form.vue";
import Modal from "./components/Modal.vue";
import Header from "./components/Header.vue";
import { EntryIcon } from "./components/svgs";
import { Status } from "./types";
import type { Ref } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Form,
    Modal,
    Header,
    EntryIcon,
  },
  setup() {
    let status: Ref<string> = ref(Status.FILLING_FORM);
    const changeStatus = (newStatus: string) => {
      status.value = newStatus;
    };
    return { status, changeStatus };
  },
});
</script>

<style lang="scss">
@import "./styles/colors.scss";
@import "./styles/variables.scss";
@import "./styles/fontSize.scss";
@import "./styles/spacing.scss";

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: lightblue;
  @include center-content;

  .entry-icon {
    max-width: 500px;
    margin-right: $spacing-6;
  }
  .form-container {
    max-width: $maxWidth;
    min-width: $minWidth;
    border-radius: 20px;
    padding: spacing(5);
    background-color: $white;
    margin-left: $spacing-6;
  }
}
</style>
