<script>
import { computed, ref } from "vue";

export default {
  name: "customInput",
  props: {
    placeholder: {
      type: String,
      required: false
    },
    model: {
      type: String,
      required: false
    },
    customClass: {
      type: String,
      required: false
    }
  },
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
  <input :class="customClass" class="custom-input" type="text" :placeholder="placeholder" @input="handleInput">
  <slot name="element"></slot>
</template>
