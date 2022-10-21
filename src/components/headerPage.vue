<script>
import router from "../router/index.js";

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
      router.push("/loginPage");
    };
    const goHome = () => {
      router.push("/");
    }
    // const  = () => {
    //   router.push("");
    // }; 마이페이지

    return {
      headerBarList,
      signupPage,
      loginPage,
      goHome,
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
          <div class="header-bar-wrap-logoLine" @click="goHome">
            <h1>○Camp Bears</h1>
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
              <span v-for="item in headerBarList">{{ item.name }}</span>
            </nav>
          </div>
        </div>

      </div>
    </header>
  </div>
</template>



