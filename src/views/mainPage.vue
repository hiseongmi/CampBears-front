<script>
import customInput from "../components/customInput.vue";
import customButton from "../components/customButton.vue";
import { ref, watch } from "vue";

export default {
  name: "mainPage",
  components: {
    customInput,
    customButton
  },
  setup() {
    const inputValue = ref();

    const updateValue = (event) => {
      inputValue.value = event;
      console.log(inputValue.value);
    };

    const btnClickEvent = () => {
      console.log(`this is btnClick Event`);
    };


    return {
      updateValue,
      btnClickEvent,
      inputValue
    };
  }
};
</script>
<template>
  <!--  custom input 사용 예시-->
  <custom-input :placeholder="`hi`" @modalValue="updateValue" :custom-class="`test-input`">
    <template v-slot:element>result :</template>
  </custom-input>
  {{ inputValue }}

  <!--  custom-button 사용 예시-->
  <custom-button :placeholder="`버튼예시`" :custom-class="`test-input`" :onClick="btnClickEvent">
    <template v-slot:element>slot</template>
  </custom-button>
</template>

<style lang="scss">
.test-input {
  width: 100px;
  height: 100px;
}
</style>
