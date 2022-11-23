<script>
import router from "../router/index.js";
import { computed, ref, watch } from "vue";
import { CONSTANTS } from "../constants.js";
import commonUtil from "../utils/common-util.js";
import store, { STORE_TYPE } from "../store/index.js";
import sideBar from "../components/sideBar.vue";

export default {
  name: "headerPage",
  components: {
    sideBar
  },
  setup() {
    const loginUser = ref(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
    //상단 헤더 리스트
    const headerBarList = [
      {
        name: "커뮤니티",
        key: "SNS",
        target: "/snsPage"
      },
      {
        name: "중고거래",
        key: "MARKET",
        target: "/usedMarket"
      },
      {
        name: "쇼핑",
        key: "SHOP",
        target: "/"
      },
      {
        name: "캠핑장",
        key: "BOARD",
        target: "/infoPage"
      },
      {
        name: "채팅",
        key: "CATTING",
        target: "/"
      }
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
      store.commit(STORE_TYPE.sideBar, true);
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
      }
    );

    return {
      headerBarList,
      loginUser,
      goToX,
      logOut,
      mainContainer,
      containerAction,
      store

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
        <div class="header-bar-logo" @click="goToX('/')">
          <div>
            <svg width="41" height="42" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M37.2414 22.0327L26.069 37.1803L22.3448 29.836L16.8145 40.7606C15.4924 39.5855 14.3379 38.2452 13.4441 36.7212C12.0103 34.2976 11.1724 31.4701 11.1724 28.4589C11.1724 25.4478 12.0103 22.6203 13.4255 20.1967C16.3303 15.2576 21.7303 11.9344 27.931 11.9344C34.1317 11.9344 39.5317 15.2576 42.4366 20.1967H54.5959C51.0207 9.01502 40.4441 0.917969 27.931 0.917969C15.4179 0.917969 4.84138 9.01502 1.28483 20.1967C0.446897 22.8039 0 25.5763 0 28.4589C0 31.3416 0.446897 34.114 1.28483 36.7212C4.84138 47.9029 15.4179 55.9999 27.931 55.9999C40.4441 55.9999 51.0207 47.9029 54.5772 36.7212H48.8234L37.2414 22.0327Z"
                fill="white" />
            </svg>
            <svg width="37" height="40" viewBox="0 0 51 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M51 17.3875V13.7705C51 6.16918 44.7434 0 37.0345 0H0.724121V25.7049V27.541V53.2459H8.91723L23.3855 15.3679C23.3296 15.3128 23.2738 15.2761 23.2365 15.221C23.2365 15.221 23.2365 15.221 23.2179 15.2026L19.4938 9.69443C19.2145 9.27213 19.3262 8.70295 19.7545 8.42754C20.1827 8.15213 20.76 8.2623 21.0393 8.68459L24 13.0361L26.9421 8.66623C27.2214 8.24393 27.8172 8.13377 28.2269 8.40918C28.6552 8.68459 28.7669 9.25377 28.4876 9.67607L24.7634 15.1843C24.7634 15.1843 24.7634 15.1843 24.7448 15.2026C24.7076 15.2577 24.6517 15.3128 24.5958 15.3495L39.0083 53.0807C45.7862 52.1443 51 46.4157 51 39.4754V35.8584C51 31.7456 48.5234 28.2203 44.9669 26.623C48.5234 25.0256 51 21.5003 51 17.3875Z"
                fill="white" />
            </svg>
          </div>
          <span class="mb-hide">CAMP BEARS</span>
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
              <input type="checkbox" class="container-trigger" />
              <label class="container-trigger-label">
                <i class="fa-solid fa-bars"></i>
              </label>
            </div>
            <nav class="header-bar-menu-info-list">
              <span v-for="item in headerBarList" @click="goToX(item.target)">{{ item.name }}</span>
            </nav>
            <div class="header-bar-menu-info-search">
              <input type="text" />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
    <sideBar v-if="store.state.sideBar" />
  </div>
</template>
