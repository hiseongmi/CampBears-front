<script>
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import loginNaver from "../components/snslogin/loginNaver.vue";
// import { getApiClient } from "../utils/axios.js";
import {ref} from "vue";
import {apiClient} from "../utils/axios.js";
import axios from "axios";
import router from "../router/index.js";

export default {
  name: "login",
  components: {
    customInput,
    customButton,
    loginNaver,
  },
  setup() {
    const userData = ref({userEmail: "", userPassword: ""});
    const loginState = ref(true);


    const doLogin = async () => {
      // if (checkForm("login")) window.alert("login");
      // console.log(12);
      // axios.post("http://camp-api.calf.kr/api/user/login", userData.value)
      //   .then(res => {
      //     console.log(res);
      //   });
      const data = await apiClient("/user/login", userData.value);
      if (data.resultCode === 0) {
        console.log(data.data);
        window.alert("로그인 성공");
      } else {
        // window.alert(data.)
      }
    };
    const doJoin = () => {
      // if (checkForm("join")) window.alert("join");
    };

    const changeLoginState = () => {
      loginState.value = !loginState.value;
    };

    const clickJoin = () => {
      window.alert("회원가입");
    };

    // const checkForm = (type) => {
    //   if (!checkValue(userData.value.userId)) {
    //     window.alert("아이디를 입력하세요");
    //     return false;
    //   } else if (!checkValue(userData.value.userPassword)) {
    //     console.log(userData.value.userPassword);
    //     window.alert("비밀번호를 입력하세요");
    //     return false;
    //   } else if (type === "join" && !checkValue(userData.value.userName)) {
    //     window.alert("이름을 입력하세요");
    //     return false;
    //   } else if (type === "join" && !checkValue(userData.value.userCheckPassword)) {
    //     window.alert("비밀번호를 확인하세요");
    //     return false;
    //   } else if (type === "join" && form.value.userPassword !== userData.value.userCheckPassword) {
    //     window.alert("비밀번호가 서로 다릅니다");
    //     return false;
    //   }
    //   return true;
    // };

    // const checkValue = (value) => {
    //   return !(!value || value === "" || value === undefined);
    // };

    const findIdPwd = () => {
      window.alert("준비중입니다.");
    };

    return {
      userData,
      loginState,
      findIdPwd,
      doLogin,
      doJoin,
      changeLoginState,
      clickJoin,

    };
  }
};
</script>
<template>
  <section class="login">
    <div class="login-area">
      <div class="logo-area">
        <img src="/assets/images/login/logo.webp" alt="logo">
        <h1>로그인 해볼까요?</h1>
      </div>
      <div v-if="loginState" class="form">
        <custom-input :placeholder="`이메일`" @update:value="userData.userEmail = $event"/>
        <custom-input :placeholder="`비밀번호`" @update:value="userData.userPassword = $event"/>
        <div class="btn-area">
          <custom-button :placeholder="`로그인`" :onClick="doLogin"></custom-button>
          <custom-button :custom-class="`join`" :placeholder="`회원가입`" :onClick="doLogin"></custom-button>
        </div>
      </div>
      <!--    <div v-else class="form">-->
      <!--      <custom-input :custom-class="`input`" :placeholder="`NAME`" @update:value="updateNameValue" />-->
      <!--      <custom-input :custom-class="`input`" :placeholder="`ID`" @update:value="updateIdValue" />-->
      <!--      <custom-input :custom-class="`input`" :placeholder="`PASSWORD`" @update:value="updatePasswordValue" />-->
      <!--      <custom-input :custom-class="`input`" :placeholder="`CHECK PASSWORD`" @update:value="updateCheckPasswordValue" />-->
      <!--      <custom-button :placeholder="`회원가입`" :onClick="doJoin"></custom-button>-->
      <!--    </div>-->
      <p @click="findIdPwd">
        아이디/비밀번호 찾기
      </p>
    </div>
    <div class="join-btn" @click="clickJoin">
      SNS 계정으로 간편 로그인/회원가입
      <loginNaver></loginNaver>
    </div>
  </section>
</template>
