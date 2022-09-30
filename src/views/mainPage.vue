<script>
import router from "../router/index.js";

export default {
  name: "mainPage",
  setup() {
    const goToSample = () => {
      router.push("/samplePage");
    };
    return {
      goToSample
    };
  }
};
</script>
<template>
  mainPage
  <button @click="goToSample">샘플 페이지 가기</button>
</template>
