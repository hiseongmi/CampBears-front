<script>
import {onMounted} from "vue";

export default {
  name: "auth",
  setup() {
    const naverService = () => {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: "OkM9Pejxzz2VszesqaQP",
        callbackUrl: "http://localhost:3001/#/auth", //callback
        isPopup: true /* 팝업을 통한 연동처리 여부 */,
        callbackHandler: true //페이지 분리시 콜백처리할수있게
      });
      const setNaver = () => {
        naverLogin.init()
      };

      const getUserInfo = () => {
        setNaver();

        naverLogin.getLoginStatus((statue) => {
          if (statue) {
            const email = naverLogin.user.email;
            const name = naverLogin.user.name;
            console.log(email, name);
          } else {
            console.log("AccessToken 이 올바르지 않습니다.");
          }
        });
      };
      return {
        naverService,
        setNaver,
        getUserInfo,
      };
    };
  },

}

</script>
<template>
  <div>Login Access Pages</div>
  <div id="naverIdLogin" style="display: none"></div>

</template>