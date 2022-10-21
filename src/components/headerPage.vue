<script>
import router from "../router/index.js";
import {ref} from "vue";

export default {
  name: 'headerPage',
  setup() {
    const headerBarList = [
      {
        name: 'SNS',
        key: 'SNS',
      },
      {
        name: 'Bears 플리마켓',
        key: 'MARKET',
      },
      {
        name: 'Bears 쇼핑',
        key: 'SHOP',
      },
      {
        name: '캠핑사전',
        key: 'BOARD',
      },
      {
        name: '채팅',
        key: 'CATTING',
      },
    ];
    const signupPage = () => {
      router.push("/signupPage");
    };
    const loginPage = () => {
      router.push("/login");
    };
    const goHome = () => {
      router.push("/");
    }
    // const  = () => {
    //   router.push("");
    // }; 마이페이지
    const isMenu = ref('');
    const menuAction = (value) => {
      isMenu.value = value;

      if (value === 'SNS') {
        router.push("/newsPage");
      } else if (value === 'MARKET') {
        router.push('/')
      } else if (value === 'SHOP') {
        router.push('/')
      } else if (value === 'BOARD') {
        router.push('/')
      } else if (value === 'CATTING') {
        router.push('/')
      }
    }

    return {
      headerBarList,
      signupPage,
      loginPage,
      goHome,
      isMenu,
      menuAction,

    };
  },
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
            <h1 @click="goHome">○Camp Bears</h1>
            <div class="header-bar-wrap-logoLine-search">
              <input type="text"/>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="header-bar-wrap-logoLine-login">
              <ul>
                <li>
                  <a @click="loginPage">로그인</a>
                </li>
                <li>
                  <a @click="signupPage"> 회원가입 </a>
                </li>
                <li>
                  <a> 마이페이지 </a>
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
              <span :class="isMenu === `${item.key}` ? 'Action' : '' " @click="menuAction(item.key)"
                    v-for="item in headerBarList">{{ item.name }}</span>
            </nav>
          </div>
        </div>

      </div>
    </header>
  </div>
</template>



