<script>
import router from "../router/index.js";
import HeaderPage from "../components/headerPage.vue";
import FooterPage from "../components/footerPage.vue";

export default {
  name: "mainPage",
  components: {FooterPage, HeaderPage},
  setup() {
    const goToSample = () => {
      router.push("/samplePage");
    };
    const goToSungmi = () => {
      router.push("/newsPage");
    }
    return {
      goToSample, goToSungmi
    };
  }
};
</script>
<template>
  <header-page></header-page>
  <button @click="goToSample">샘플 페이지 가기</button>
  <button @click="goToSungmi">성미 페이지 가기</button>
  <footer-page></footer-page>
</template>
