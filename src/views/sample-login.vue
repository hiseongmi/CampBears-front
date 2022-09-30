<script>
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import { ref } from "vue";

export default {
  name: "sample-login",
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

    return {
      form,
      loginState,
      updateIdValue,
      updatePasswordValue,
      doLogin,
      doJoin,
      updateNameValue,
      updateCheckPasswordValue,
      changeLoginState
    };

  },
  methods: {
    // updateIdValue(e) {
    //   this.form.userId = e;
    //   console.log(this.form.userId);
    // }
  }
};
</script>
<template>
  <div class="login-area">
    <div v-if="loginState" class="form">
      <custom-input :custom-class="`input`" :placeholder="`ID`" @update:value="updateIdValue" />
      <custom-input :custom-class="`input`" :placeholder="`PASSWORD`" @update:value="updatePasswordValue" />
      <custom-button :placeholder="`로그인`" :onClick="doLogin"></custom-button>
    </div>
    <div v-else class="form">
      <custom-input :custom-class="`input`" :placeholder="`NAME`" @update:value="updateNameValue" />
      <custom-input :custom-class="`input`" :placeholder="`ID`" @update:value="updateIdValue" />
      <custom-input :custom-class="`input`" :placeholder="`PASSWORD`" @update:value="updatePasswordValue" />
      <custom-input :custom-class="`input`" :placeholder="`CHECK PASSWORD`" @update:value="updateCheckPasswordValue" />
      <custom-button :placeholder="`회원가입`" :onClick="doJoin"></custom-button>
    </div>
    <p @click="changeLoginState">
      {{ loginState ? "회원가입" : "로그인" }}하러가기
    </p>
  </div>

</template>

<style lang="scss">
.login-area {
  width: 400px;
  margin: 100px;
  text-align: center;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .input {
      width: 300px;
      height: 30px;
      margin-bottom: 10px;
    }
  }

  > p {
    margin-top: 50px;

    &:hover {
      cursor: pointer;
      color: #373737;

    }
  }
}
</style>
