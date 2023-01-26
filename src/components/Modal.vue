<template>
  <transition v-show="shouldShowModal" name="modal">
    <div class="modal">
      <div class="modal--mask" @click="closeModal"></div>
      <div class="modal--content">
        <div class="modal--close-icon-container">
          <i class="modal--close-icon" @click="closeModal"></i>
        </div>
        <div class="modal--body">
          <h2>{{ modalText }}</h2>
          <SvgBase :name="'valid'" :width="24" :height="24">
            <LoadingIcon v-if="isLoading" />
            <SuccessIcon v-else-if="isSuccess" />
            <FailureIcon v-else-if="isFailed" />
          </SvgBase>
          <button>Continue</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Status } from "../types";
import type { Ref } from "vue";
import SvgBase from "./SvgBase.vue";
import { FailureIcon, SuccessIcon, LoadingIcon } from "./svgs";

export default defineComponent({
  name: "Modal",
  components: {
    SvgBase,
    FailureIcon,
    SuccessIcon,
    LoadingIcon,
  },
  props: {
    status: {
      type: String,
      default: Status.FILLING_FORM,
      required: true,
    },
  },

  setup(props) {
    const isLoading = computed(() => props.status === Status.LOADING);
    const isFailed = computed(() => props.status === Status.FAILED);
    const isSuccess = computed(() => props.status === Status.SUCCESS);

    const shouldShowModal = computed(
      () => isLoading.value || isFailed.value || isSuccess.value
    );
    const modalText: Ref<string> = ref("Loading");
    const closeModal = (e: Event) => {
      e.preventDefault();
    };
    return {
      closeModal,
      modalText,
      isLoading,
      isFailed,
      isSuccess,
      shouldShowModal,
    };
  },
});
</script>

<style scoped lang="scss"></style>
