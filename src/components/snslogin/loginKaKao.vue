<script>
import axios from "axios";
import {onMounted} from "vue";
import data from "../../data/index.js";

export default {
  name: "loginKakao",
  // setup() {
  //   onMounted(() => {
  //     getKakaoToken();
  //   })
  //
  //   const kakaoHeader = {
  //     Authorization: "718880fa9ea840e5cfcb48334f3aa23a", //admin key
  //     "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //   };
  //   const getKakaoToken = async (code) => {
  //     console.log("loginWithKakao");
  //     try {
  //       const data = {
  //         grant_type: "authorization_code",
  //         client_id: "7baeb4fcdff6c3a66a5ec4762c5d7f02", //rest api key
  //         redirect_uri: "http://localhost:3001/#/auth",
  //         code: code,
  //       };
  //       const queryString = Object.keys(data)
  //           .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
  //           .join("&");
  //       console.log(queryString);
  //       const result = await axios.post("https://kauth.kakao.com/oauth/token", queryString, {headers: kakaoHeader});
  //       console.log("카카오 토큰", queryString);
  //       console.log(result)
  //       return result;
  //     } catch (e) {
  //       return e;
  //     }
  //   };
  //
  //   // const getKakaoUserInfo = async () => {
  //   //   let data = "";
  //   //   await window.Kakao.API.request({
  //   //     url: "/v2/user/me",
  //   //     success: function (response) {
  //   //       data = response;
  //   //     },
  //   //     fail: function (error) {
  //   //       console.log(error);
  //   //     },
  //   //   });
  //   //   console.log("카카오 계정 정보", data);
  //   //   return data;
  //   // };
  //   return {
  //     getKakaoToken,
  //     // getKakaoUserInfo,
  //   }
  // },


  methods: {
    kakaoLogin() {
      const params = {
        redirectUri: 'http://localhost:3001/#/auth', //callback
      }
      Kakao.Auth.authorize(params)
    },

    // kakaoLoginBtn: function () {
    //   window.Kakao.init('37b652b280e20ff8c7240ecd75bfdbb5') // Kakao Developers에서 요약 정보 -> JavaScript 키
    //
    //   if (window.Kakao.Auth.getAccessToken()) {
    //     Kakao.API.request({
    //       url: '/v1/user/unlink',
    //     })
    //         .then(function (response) {
    //           console.log(response);
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     Kakao.Auth.setAccessToken('${ACCESS_TOKEN}');
    //   }
    //   window.Kakao.Auth.login({
    //     success: function () {
    //       Kakao.API.request({
    //         url: '/v2/user/me',
    //         data: {
    //           property_keys: ['kakao_account.email', 'kakao_account.gender'],
    //         },
    //       })
    //           .then(function (response) {
    //             console.log(response);
    //           })
    //           .catch(function (error) {
    //             console.log(error);
    //           });
    //     },
    //     fail: function (error) {
    //       console.log(error)
    //     },
    //   })
    // }
  },

}
</script>
<template>
  <div @click="kakaoLogin" type="button" style="cursor: pointer"><img src="/assets/image/kakao_login_medium_narrow.png"
                                                                      alt="카카오 로그인 버튼"/></div>
</template>