<script>
export default {
  name: "sideBar",
  setup() {

    return {}
  }
};
</script>
<template>
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
</template>
