<script>
import router from "../router/index.js";
import HeaderPage from "../components/headerPage.vue";
import FooterPage from "../components/footerPage.vue";
import {ref} from "vue";
import store, {POPUP_TYPE, STORE_TYPE} from "../store/index.js";


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

    const isPopup = ref(store.state.popupType)

    const goToPop = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.WRITE_BOARD)
    }
    return {
      goToSample, goToSungmi, goToPop, isPopup
    };
  }
};
</script>
<template>
  <header-page></header-page>
  <button @click="goToSample">샘플 페이지 가기</button>
  <button @click="goToSungmi">성미 페이지 가기</button>
  <button @click="goToPop">팝업창 열기</button>
  <footer-page></footer-page>
</template>
