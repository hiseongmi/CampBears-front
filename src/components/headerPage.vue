<script>
import router from "../router/index.js";

export default {
  name: 'headerPage',
  setup() {
    const headerBarList = [
      {
        name: '베어장터',
        key: 'SHOP',
      },
      {
        name: '커뮤니티',
        key: 'COMMUNITY',
      },
      {
        name: '캠핑사전',
        key: 'DATA',
      },
      {
        name: '게시판',
        key: 'BOARD',
      },
      {
        name: '고객센터',
        key: 'CUSTOMER',
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
        <div class="mainContainer">
          <input type="checkbox" class="mainContainer-trigger">
          <label class="mainContainer-trigger-label">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div class="header-bar-logo" @click="goHome">
          <h1>logo</h1>
        </div>
        <div class="header-bar-menu">
          <div class="header-bar-menu-login">
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
          <div class="header-bar-menu-info">
            <div class="container">
              <input type="checkbox" class="container-trigger">
              <label class="container-trigger-label">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            <nav class="header-bar-menu-info-list">
              <span v-for="item in headerBarList">{{ item.name }}</span>
            </nav>
            <div class="header-bar-menu-info-search">
              <input type="text"/>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="header-bar-menu-info-moSearch"><i class="fa-solid fa-magnifying-glass"></i></div>
          </div>
        </div>

      </div>
    </header>
  </div>
</template>
