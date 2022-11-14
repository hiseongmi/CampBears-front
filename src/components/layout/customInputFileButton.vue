<script>
export default {
  name: "customInputFileButton",
  emits: ["update:value"],
  props: {},
  setup() {
    return {};
  },
  methods: {
    handleInput(e) {
      this.$emit("update:value", e.target.value);
    },
  },
};
</script>

<template>
  <div class="custom-input-file-button">
    <label for="input-file">
      <a>업로드</a>
    </label>
    <input type="file" id="input-file" accept="image/*" @input="handleInput" />
  </div>
</template>
