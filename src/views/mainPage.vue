<script>
import router from "../router/index.js";
import signupPage from "../components/yd/signupPage.vue";
import loginPage from "../components/yd/loginPage.vue";
import HeaderPage from "../components/headerPage.vue";
import FooterPage from "../components/footerPage.vue";
import {ref} from "vue";
import store, {POPUP_TYPE, STORE_TYPE} from "../store/index.js";


export default {
  name: "mainPage",
  components: {FooterPage, HeaderPage, loginPage, signupPage},

  setup() {
    const goToSample = () => {
      router.push("/samplePage");
    };
    const goToSungmi = () => {
      router.push("/newsPage");
    }
    const signupPage = () => {
      router.push("/signupPage");
    }
    //id=searchbar
    // function filter() {
    //   var content = document.getElementById("searchbar").value;
    //   if (content.trim() === "") {
    //     alert("검색어를 입력해주세요")
    //     return false;
    //   } else {
    //     /* 검색작업수행 */
    //   }
    // }

    const isPopup = ref(store.state.popupType)

    const goToPop = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.WRITE_BOARD)
    }
    const goToLogin = () => {
      router.push("/loginNaver")

    }
    return {
      goToSample, goToSungmi, goToPop, isPopup, signupPage, goToLogin,
    };
  }
};
</script>
<template>
  <header-page></header-page>
  <button @click="goToSample">샘플 페이지 가기</button>
  <button @click="goToSungmi">성미 페이지 가기</button>
  <button @click="goToPop">팝업창 열기</button>
  <button @click="goToLogin">sns 로그인</button>
  <footer-page></footer-page>

</template>
