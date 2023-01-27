<template>
  <transition v-show="shouldShowModal" name="modal">
    <div class="modal">
      <div class="modal--content">
        <div class="modal--close-icon-container">
          <BaseSvg
            v-if="isSuccess || isFailed"
            :name="'close'"
            :width="24"
            :height="24"
            :viewBox="'0 0 320 512'"
            @click="closeModal"
          >
            <CloseIcon />
          </BaseSvg>
        </div>
        <div class="modal--body">
          <BaseSvg
            :class="additionalSvgClass"
            :name="'modal'"
            :width="100"
            :height="100"
          >
            <LoadingIcon v-if="isLoading" />
            <SuccessIcon v-else-if="isSuccess" />
            <FailureIcon v-else-if="isFailed" />
          </BaseSvg>
          <h2 class="modal--text">{{ modalText }}</h2>
          <button
            v-if="isSuccess || isFailed"
            class="modal--button"
            @click="closeModal"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Status, StatusMessage } from "../types";
import BaseSvg from "./BaseSvg.vue";
import { FailureIcon, SuccessIcon, LoadingIcon, CloseIcon } from "./svgs";

export default defineComponent({
  name: "Modal",
  components: {
    BaseSvg,
    FailureIcon,
    SuccessIcon,
    LoadingIcon,
    CloseIcon,
  },
  props: {
    status: {
      type: String,
      default: Status.FILLING_FORM,
      required: true,
    },
  },

  setup(props, context) {
    const isLoading = computed(() => props.status === Status.LOADING);
    const isFailed = computed(() => props.status === Status.FAILED);
    const isSuccess = computed(() => props.status === Status.SUCCESS);

    const modalText = computed(() => {
      switch (props.status) {
        case Status.LOADING:
          return StatusMessage.LOADING;
        case Status.FAILED:
          return StatusMessage.FAILED;
        case Status.SUCCESS:
          return StatusMessage.SUCCESS;
        default:
          return "";
      }
    });

    const additionalSvgClass = computed(() => {
      return [
        { "is-success": isSuccess.value },
        { "is-failed": isFailed.value },
      ];
    });

    const shouldShowModal = computed(
      () => isLoading.value || isFailed.value || isSuccess.value
    );
    const closeModal = (e: Event) => {
      e.preventDefault();
      context.emit("status", Status.FILLING_FORM);
    };
    return {
      closeModal,
      modalText,
      isLoading,
      isFailed,
      isSuccess,
      shouldShowModal,
      additionalSvgClass,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.modal {
  @include fixed-whole-screen;
  @include center-content;
  z-index: 100;
}

.modal--content {
  width: 60vw;
  height: 60vh;
  background-color: $white;
  box-shadow: 0 2px 8px $blackLighter;
  transition: all 0.3s ease;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}
.modal--close-icon-container {
  position: relative;
  .close-svg {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
.modal--body {
  @include center-content;
  flex-direction: column;
  height: 100%;
  .modal--text {
    font-size: $xxl;
    margin: $spacing-10;
  }

  .modal--button {
    background: $blue;
    border: none;
    padding: $spacing-3 $spacing-10;
    font-size: $lg;
    font-weight: 700;
    cursor: pointer;
  }
  .modal-svg {
    fill: $blue;
    &.is-failed {
      fill: $red;
    }
    &.is-success {
      fill: $green;
    }
  }
}
</style>
