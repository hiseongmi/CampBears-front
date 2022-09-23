<script>
export default {
  name: "customButton",
  props: {
    placeholder: {
      type: String,
      required: false
    },
    customClass: {
      type: String,
      required: false
    },
    onClick: {
      type: Function,
      required: true
    }
  }
};
</script>
<template>
  <div class="custom-button" :class="customClass" @click="onClick">
    <a href="#" @click.prevent.stop="onClick">{{ placeholder }}</a>
  </div>
</template>

