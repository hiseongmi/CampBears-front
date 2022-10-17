<script>
import {onMounted} from "vue";
import LoginKakao from "./loginKaKao.vue";

export default {
  name: "loginNaver",
  components: {LoginKakao},
  setup() {
    onMounted(() => {
      naverService().setNaver();
    })
    const naverService = () => {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: "OkM9Pejxzz2VszesqaQP",
        callbackUrl: "http://localhost:3001/#/auth", //callback
        isPopup: false /* 팝업을 통한 연동처리 여부 */,
        loginButton: {
          color: "green",
          type: 3,
          height: 40,
        },
      });
      const setNaver = () => {
        naverLogin.init() //로그인 정보 초기화

      };

      // const getUserInfo = () => {
      //   setNaver();
      //   naverLogin.getLoginStatus((statue) => {
      //     if (statue) {
      //       const email = naverLogin.user.email;
      //       const name = naverLogin.user.name;
      //       console.log(email, name);
      //     } else {
      //       console.log("AccessToken 이 올바르지 않습니다.");
      //     }
      //   });
      // };
      return {
        naverService,
        setNaver,
        // getUserInfo,
      };
    };
  }
}
</script>
<template>
  <div id="naverIdLogin"></div>
  <login-kakao/>
</template>
