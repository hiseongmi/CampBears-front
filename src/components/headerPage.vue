<script>
import router from "../router/index.js";
import { computed, ref, watch } from "vue";
import { CONSTANTS } from "../constants.js";
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
        target: "/newsPage"
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
      logOut
    };
  }
};
</script>
<template>
  <div>
    <header class="header">
      <div class="header-bar">
        <div class="header-bar-wrap">
          <div class="mainContainer">
            <label class="mainContainer-label">
              <i class="fa-solid fa-bars"></i>
            </label>
          </div>
          <div class="header-bar-wrap-logoLine">
            <h1 @click="goToX('/')">○Camp Bears</h1>
            <div class="header-bar-wrap-logoLine-search">
              <input type="text" />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="header-bar-wrap-logoLine-login">
              <ul>
                <li v-if="!loginUser">
                  <a @click="goToX('/login')">로그인</a>
                  <a @click="goToX('/')"> 회원가입 </a>
                </li>
                <li v-else>
                  <a @click="goToX()"> 마이페이지 </a>
                  <a @click="logOut()"> 로그아웃 </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="header-bar-wrap-moSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div class="header-bar-menu">
          <div class="header-bar-menu-info">
            <div class="container">
              <input type="checkbox" class="container-trigger">
              <label class="container-trigger-label">
                <i class="fa-solid fa-bars"></i>
              </label>
            </div>
            <nav class="header-bar-menu-info-list">
              <span v-for="item in headerBarList" @click="goToX(item.target)">
                {{ item.name }}
              </span>
            </nav>
          </div>
        </div>

      </div>
    </header>
  </div>
</template>



