<script>
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import loginNaver from "../components/snslogin/loginNaver.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {apiClient, setHeader} from "../utils/axios.js";
import common from "../utils/common-util.js";
import {CONSTANTS} from "../constants.js";
import router from "../router/index.js";
import store, {STORE_TYPE} from "../store/index.js";

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
    const ENTER_EVENT = "ENTER_EVENT";

    //로그인
    const doLogin = async () => {
      const data = await apiClient("/user/login", userData.value);
      if (data.resultCode === 0) {
        //console.log(data.data);
        await router.push("/");
        if (data.data.token) {
          setHeader(data.data.token);
          common.setLocalStorage(CONSTANTS.KEY_LIST.USER_INFO, data.data);
          common.setLocalStorage(CONSTANTS.KEY_LIST.USER_INFO_TOKEN, data.data.token);
          store.commit(STORE_TYPE.loginUserIdx, data.data.userIdx);
          localStorage.setItem("userData", JSON.stringify(data.data));
        }
        window.location.replace("/mainPage");
      } else {
        window.alert(data.resultMsg);
      }
    };
    //회원가입
    const doJoin = () => {
      // if (checkForm("join")) window.alert("join");
    };

    const clickJoin = () => {
      window.alert("회원가입");
    };

    const findIdPwd = () => {
      window.alert("준비중입니다.");
    };

    //엔터 이벤트 받기
    const handleEnter = e => {
      if (e.key === "Enter") {
        doLogin();
      }
    };
    const goToX = v => {
      v ? router.push(v) : window.alert("준비중입니다.");
      window.location.replace("/#/signup");
    };
    onMounted(() => {
      window.addEventListener("keydown", handleEnter);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleEnter);
    });

    return {
      userData,
      loginState,
      findIdPwd,
      doLogin,
      doJoin,
      clickJoin,
      goToX,
    };
  },
};
</script>
<template>
  <section class="login">
    <div class="login-area">
      <div class="logo-area">
        <img src="/assets/images/login/logo.webp" alt="logo"/>
        <h1>로그인 해볼까요?</h1>
      </div>
      <div v-if="loginState" class="form">
        <custom-input :placeholder="`이메일`" @update:value="userData.userEmail = $event"/>
        <custom-input :placeholder="`비밀번호`" @update:value="userData.userPassword = $event"/>
        <div class="btn-area">
          <custom-button :placeholder="`로그인`" :onClick="doLogin"></custom-button>
          <custom-button :custom-class="`join`" :placeholder="`회원가입`" @Click="goToX('/signup')"></custom-button>
        </div>
      </div>
      <!--    <div v-else class="form">-->
      <!--      <custom-input :custom-class="`input`" :placeholder="`NAME`" @update:value="updateNameValue" />-->
      <!--      <custom-input :custom-class="`input`" :placeholder="`ID`" @update:value="updateIdValue" />-->
      <!--      <custom-input :custom-class="`input`" :placeholder="`PASSWORD`" @update:value="updatePasswordValue" />-->
      <!--      <custom-input :custom-class="`input`" :placeholder="`CHECK PASSWORD`" @update:value="updateCheckPasswordValue" />-->
      <!--      <custom-button :placeholder="`회원가입`" :onClick="doJoin"></custom-button>-->
      <!--    </div>-->
      <p @click="findIdPwd">아이디/비밀번호 찾기</p>
    </div>
    <div class="join-btn" @click="clickJoin">
      SNS 계정으로 간편 로그인/회원가입
      <!--      나중에 넣자-->
      <!--      <loginNaver></loginNaver>-->
    </div>
  </section>
</template>
