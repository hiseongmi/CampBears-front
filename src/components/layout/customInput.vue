<script>
import { computed, ref } from "vue";

export default {
  name: "customInput",
  props: {
    placeholder: {
      type: String,
      required: false
    },
    customClass: {
      type: String,
      required: false
    }
  },
  emits: ["modalValue"],
  setup() {
    return {};
  },
  methods: {
    handleInput(e) {
      this.$emit("modalValue", e.target.value);
    }
  }
};
</script>
<template>
  <input class="custom-input" :class="customClass" type="text" :placeholder="placeholder" @input="handleInput">
  <slot name="element"></slot>
</template>
