<script>
export default {
  name: "customInputFileButton",
  emits: ["update:value"],
  props: {
    customId: {},
  },
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
    <label>
      <a>업로드</a>
      <input type="file" accept="image/*" multiple="multiple" />
    </label>
  </div>
</template>
