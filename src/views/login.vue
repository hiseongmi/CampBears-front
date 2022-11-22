<script>
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import loginNaver from "../components/snslogin/loginNaver.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { apiClient, setHeader } from "../utils/axios.js";
import common from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";
import router from "../router/index.js";
import store, { STORE_TYPE } from "../store/index.js";
import axios from "axios";

export default {
  name: "login",
  components: {
    customInput,
    customButton,
    loginNaver,
  },
  setup() {


    // const test = async () => {
    //   const axiosInstance = axios.create({
    //     timeout: 1000 * 60 * 3,
    //     headers: {"contents-type": "Json"},
    //   });
    //   const d = await axiosInstance.get('https://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=bears&serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D')
    // }

    const typeSearch = async () => {
      const data = await apiClient("/common/getTypeList", typeSearchData.value);
      typeData.value = data.data;
      if (typeData.value) {
        joinUserData.value.userType = typeData.value[0].column;
        //console.log(joinUserData.value)
      }
      // contentData.value = data.data
      //search 이벤트를 날림
    };
    const userData = ref({ userEmail: "", userPassword: "" });
    const loginState = ref(true);
    const ENTER_EVENT = "ENTER_EVENT";

    //로그인
    const doLogin = async () => {
      const data = await apiClient("/user/login", userData.value);
      if (data.resultCode === 0) {
        //console.log(data.data);

        if (data.data.token) {
          setHeader(data.data.token);
          common.setLocalStorage(CONSTANTS.KEY_LIST.USER_INFO, data.data);
          common.setLocalStorage(CONSTANTS.KEY_LIST.USER_INFO_TOKEN, data.data.token);
          store.commit(STORE_TYPE.loginUserIdx, data.data.userIdx);
          // localStorage.setItem("userData", JSON.stringify(data.data));
        }
        await router.push("/");
        location.reload();
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
      typeSearch,
    };
  },
};
</script>
<template>
  <section class="login">
    <div class="login-area">
      <div class="logo-area">
        <img src="/assets/images/login/logo.webp" alt="logo" />
        <h1>로그인 해볼까요?</h1>
      </div>
      <div v-if="loginState" class="form">
        <custom-input :placeholder="`이메일`" @update:value="userData.userEmail = $event" />
        <custom-input :placeholder="`비밀번호`" type="password" @update:value="userData.userPassword = $event" />
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
