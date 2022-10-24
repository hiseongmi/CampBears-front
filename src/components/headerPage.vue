<script>
import router from "../router/index.js";
import {computed, ref, watch} from "vue";
import {CONSTANTS} from "../constants.js";
import commonUtil from "../utils/common-util.js";
import store from "../store/index.js";

export default {
  name: "headerPage",
  setup() {
    const loginUser = ref(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
    //상단 헤더 리스트
    const headerBarList = [
      {
        name: "SNS",
        key: "SNS",
        target: "/snsPage"
      },
      {
        name: "Bears 플리마켓",
        key: "MARKET",
        target: "/"
      },
      {
        name: "Bears 쇼핑",
        key: "SHOP",
        target: "/"
      },
      {
        name: "캠핑사전",
        key: "BOARD",
        target: "/"
      },
      {
        name: "채팅",
        key: "CATTING",
        target: "/"
      }
    ];
    //router 이동
    const goToX = (v) => {
      v ? router.push(v) : window.alert("준비중입니다.");
    };
    //로그아웃
    const logOut = () => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        commonUtil.logOutUser();
        window.location.replace("/#/login");
      }
    };
    const containerAction = ref(false);
    const mainContainer = () => {
      containerAction.value = !containerAction.value;
    }; //전체 메뉴

// gotoX로 통합
    // const menuAction = (value) => {
    //
    //   if (value === "SNS") {
    //     router.push("/newsPage");
    //   } else if (value === "MARKET") {
    //     router.push("/");
    //   } else if (value === "SHOP") {
    //     router.push("/");
    //   } else if (value === "BOARD") {
    //     router.push("/");
    //   } else if (value === "CATTING") {
    //     router.push("/");
    //   }
    // };

    watch(() => store.state.loginUserIdx, () => {
      loginUser.value = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);

    });

    return {
      headerBarList,
      loginUser,
      goToX,
      logOut,
      mainContainer,
      containerAction,
    };
  }
};
</script>
<template>
  <div>
    <header class="header">
      <div class="header-bar">
        <div class="mainContainer" @click="mainContainer">
          <label class="mainContainer-label">
            <i class="fa-solid fa-bars"></i>
          </label>
        </div>
        <div class="containerPop" v-if="containerAction">
          <ul>
            <li v-if="!loginUser">
              <a @click="goToX('/login')">로그인</a>
              <a @click="goToX('/')">회원가입</a>
            </li>
            <li v-else>
              <a @click="goToX()">마이페이지</a>
              <a @click="logOut()">로그아웃</a>
              <a @click="goToX('/snsPage')">SNS</a>
            </li>
          </ul>
        </div>
        <div class="header-bar-logo" @click="goToX('/')">
          <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M23.5 0C10.5399 0 0 10.5399 0 23.5C0 36.4601 10.5399 47 23.5 47C36.4601 47 47 36.4601 47 23.5C47 10.5399 36.4601 0 23.5 0ZM23.5 3.58013C28.684 3.58013 33.4098 5.57069 36.9613 8.82861C31.3477 10.1246 36.3885 17.736 36.3885 17.736C36.8253 18.4807 37.1761 19.1394 37.3193 20.0273C37.4983 21.1586 37.5484 22.3329 37.3838 23.4714C37.2048 24.6886 36.9756 25.7054 36.5961 26.808C35.9732 28.5981 35.3502 30.3882 34.7273 32.1854L33.7607 34.9636C33.7105 35.1068 33.5101 35.1068 33.4599 34.9636L26.0562 14.163C26.0204 14.0628 26.0992 13.9482 26.2066 13.9482H29.2712C29.4717 13.9482 29.6364 13.7835 29.6364 13.583V12.9959C29.6364 12.7954 29.4717 12.6307 29.2712 12.6307H17.0629C16.8553 12.6307 16.6906 12.8026 16.6906 13.003V13.6188C16.6906 13.8265 16.8624 13.9912 17.0629 13.9912H19.2754C19.3399 13.9912 19.3972 14.027 19.4186 14.0914L23.1491 22.8627C23.1635 22.8985 23.1635 22.9415 23.1491 22.9773L18.7527 35.2357C18.7026 35.3789 18.5021 35.3789 18.452 35.2357L11.0053 14.2489C10.9695 14.1487 11.0483 14.0341 11.1557 14.0341H13.4828C13.6904 14.0341 13.8551 13.8623 13.8551 13.6618V12.9959C13.8551 12.7882 13.6833 12.6236 13.4828 12.6236H6.82374C10.3824 7.18175 16.5259 3.58013 23.5 3.58013ZM3.58013 23.5C3.58013 21.0297 4.03839 18.6597 4.86182 16.4686L14.5353 41.2789C8.04098 37.9924 3.58013 31.2617 3.58013 23.5ZM17.6859 42.5535L23.9869 26.1493C24.037 26.0133 24.2303 26.0133 24.2805 26.1493L30.3524 42.1955C28.2115 42.9831 25.8987 43.4127 23.4928 43.4127C21.4736 43.4127 19.5189 43.1048 17.6787 42.5463L17.6859 42.5535ZM34.0256 40.3982C34.4839 39.0664 34.9421 37.7418 35.4004 36.41L37.4625 30.4311L39.3743 24.8819C39.5963 24.2375 39.8183 23.6002 40.0402 22.9558C40.5343 21.5309 41.1787 20.1347 41.4436 18.6382C41.637 17.5355 41.6584 16.397 41.4794 15.2872C41.4508 15.0867 41.4078 14.8934 41.3649 14.6929C42.6824 17.3493 43.4199 20.3352 43.4199 23.4928C43.4199 30.6101 39.6607 36.8682 34.0256 40.3911V40.3982Z"
                fill="white"/>
          </svg>
          <span>Bears</span>
        </div>
        <div class="header-bar-moSearch">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="header-bar-menu">
          <div class="header-bar-menu-login">
            <ul>
              <li>
                <a @click="goToX('/login')">로그인</a>
              </li>
              <li>
                <a @click="goToX('/')"> 회원가입 </a>
              </li>
            </ul>
          </div>
          <div class="header-bar-menu-info">
            <div class="container">
              <input type="checkbox" class="container-trigger">
              <label class="container-trigger-label">
                <i class="fa-solid fa-bars"></i>
              </label>
            </div>
            <nav class="header-bar-menu-info-list">
              <span v-for="item in headerBarList" @click="goToX(item.target)">{{ item.name }}</span>
            </nav>
            <div class="header-bar-menu-info-search">
              <input type="text"/>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>



