<template>
  <transition v-show="false" name="modal">
    <div class="modal">
      <div class="modal--mask" @click="closeModal"></div>
      <div class="modal--content">
        <div class="modal--close-icon-container">
          <i class="modal--close-icon" @click="closeModal"></i>
        </div>
        <div class="modal--body">
          <h2>{{ modalText }}</h2>
          <button>Continue</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Status } from "../types";
import type { Ref } from "vue";

export default defineComponent({
  name: "Modal",
  components: {},
  props: {
    status: {
      type: String,
      default: Status.FILLING_FORM,
      required: true,
    },
  },
  setup() {
    const modalText: Ref<string> = ref("Loading");
    const closeModal = (e: Event) => {
      e.preventDefault();
    };
    return { closeModal, modalText };
  },
});
</script>

<style scoped lang="scss"></style>
