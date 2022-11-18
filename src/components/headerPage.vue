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
        name: "커뮤니티",
        key: "SNS",
        target: "/snsPage",
      },
      {
        name: "중고거래",
        key: "MARKET",
        target: "/usedMarket",
      },
      {
        name: "쇼핑",
        key: "SHOP",
        target: "/",
      },
      {
        name: "캠핑장",
        key: "BOARD",
        target: "/infoPage",
      },
      {
        name: "채팅",
        key: "CATTING",
        target: "/",
      },
    ];
    //router 이동
    const goToX = v => {
      v ? router.push(v) : window.alert("준비중입니다.");
    };

    //로그아웃
    const logOut = () => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        commonUtil.logOutUser();
        window.location.replace("/");
        location.reload();
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

    watch(
        () => store.state.loginUserIdx,
        () => {
          loginUser.value = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
        },
    );

    return {
      headerBarList,
      loginUser,
      goToX,
      logOut,
      mainContainer,
      containerAction,
    };
  },
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
              <a @click="goToX('/signup')">회원가입</a>
            </li>
            <li v-else>
              <a @click="goToX('/myPage')">마이페이지</a>
              <a @click="logOut()">로그아웃</a>
              <a @click="goToX('/snsPage')">SNS</a>
              <a @click="goToX('/usedMarket')">플리마켓</a>
            </li>
          </ul>
        </div>
        <div class="header-bar-logo" @click="goToX('/')">
          <img src="/assets/image/icon/bearsLogo.png" alt=""/>
          <span>Bears</span>
        </div>
        <div class="header-bar-moSearch">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="header-bar-menu">
          <div class="header-bar-menu-login">
            <ul>
              <li v-if="!loginUser">
                <a @click="goToX('/login')">로그인</a>
                <a @click="goToX('/signup')"> 회원가입 </a>
              </li>
              <li v-else>
                <a @click="logOut()">로그아웃</a>
                <a @click="goToX(`/myPage`)"> 마이페이지</a>
              </li>
            </ul>
          </div>
          <div class="header-bar-menu-info">
            <div class="container">
              <input type="checkbox" class="container-trigger"/>
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
