<script>
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import { ref } from "vue";

export default {
  name: "login",
  components: {
    customInput,
    customButton
  },
  setup() {
    const form = ref({ userName: "", userId: "", userPassword: "", userCheckPassword: "" });
    const loginState = ref(true);

    const updateIdValue = (e) => {
      form.value.userId = e;
    };
    const updatePasswordValue = (e) => {
      form.value.userPassword = e;
    };
    const updateNameValue = (e) => {
      form.value.userName = e;
    };
    const updateCheckPasswordValue = (e) => {
      form.value.userCheckPassword = e;
    };
    const doLogin = () => {
      if (checkForm("login")) window.alert("login");
    };
    const doJoin = () => {
      if (checkForm("join")) window.alert("join");
    };

    const changeLoginState = () => {
      loginState.value = !loginState.value;
    };

    const clickJoin = () => {
      window.alert('회원가입')
    }

    const checkForm = (type) => {
      if (!checkValue(form.value.userId)) {
        window.alert("아이디를 입력하세요");
        return false;
      } else if (!checkValue(form.value.userPassword)) {
        console.log(form.value.userPassword);
        window.alert("비밀번호를 입력하세요");
        return false;
      } else if (type === "join" && !checkValue(form.value.userName)) {
        window.alert("이름을 입력하세요");
        return false;
      } else if (type === "join" && !checkValue(form.value.userCheckPassword)) {
        window.alert("비밀번호를 확인하세요");
        return false;
      } else if (type === "join" && form.value.userPassword !== form.value.userCheckPassword) {
        window.alert("비밀번호가 서로 다릅니다");
        return false;
      }
      return true;
    };

    const checkValue = (value) => {
      return !(!value || value === "" || value === undefined);
    };

    const findIdPwd = () => {
      window.alert("준비중입니다.");
    };

    return {
      form,
      loginState,
      findIdPwd,
      updateIdValue,
      updatePasswordValue,
      doLogin,
      doJoin,
      updateNameValue,
      updateCheckPasswordValue,
      changeLoginState,
      clickJoin
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
        <custom-input :placeholder="`이메일`" @update:value="updateIdValue" />
        <custom-input :placeholder="`비밀번호`" @update:value="updatePasswordValue" />
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
    </div>
  </section>
</template>
