<script>
import axios from "axios";
import { onMounted } from "vue";


export default {
  name: "loginKakao",
  setup() {
    onMounted(() => {

    })

    return {}
  },


  methods: {
    kakaoLogin() {
      const params = {
        redirectUri: 'http://localhost:3001/#/auth', //callback
      }
      Kakao.Auth.authorize(params)
    },
  },

}
</script>
<template>
  <div @click="kakaoLogin" type="button" style="cursor: pointer"><img src="/assets/image/kakao_login_medium_narrow.png"
                                                                      alt="카카오 로그인 버튼" /></div>
</template>