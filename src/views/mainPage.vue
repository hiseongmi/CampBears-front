<script>
import customInput from "../components/customInput.vue";
import { ref, watch } from "vue";

export default {
  name: "mainPage",
  components: {
    customInput
  },
  setup() {
    const inputValue = ref();

    const updateValue = (event) => {
      inputValue.value = event;
      console.log(inputValue.value);
    };


    return {
      updateValue,
      inputValue
    };
  }
};
</script>
<template>
  <!--  custom input 사용법-->
  <custom-input placeholder="hi" @modalValue="updateValue" :custom-class="`test-input`">
    <template v-slot:element>icon</template>
  </custom-input>
  {{ inputValue }}
</template>

<style lang="scss">
.test-input {
  width: 100px;
  height: 100px;
}
</style>
