<template>
  <div id="app">
    <Form />
    <Modal :status="status" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Form from "./components/Form.vue";
import Modal from "./components/Modal.vue";
import { Status } from "./types";
import type { Ref } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Form,
    Modal,
  },
  setup() {
    const status: Ref<string> = ref(Status.FILLING_FORM);
    return { status };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
