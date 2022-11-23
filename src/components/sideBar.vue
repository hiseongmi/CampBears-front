<script>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";
import router from "../router/index.js";
import store, { STORE_TYPE } from "../store/index.js";

export default {
  name: "sideBar",
  setup() {
    const flag = ref(false);
    const userData = ref();
    const profileImg = ref();
    const isActive = ref(false);

    const menuList = [
      { name: "SNS", url: "/snsPage" },
      { name: "중고마켓", url: "/usedMarket" },
      { name: "캠핑장", url: "/campingInfo" },
      { name: "로그아웃", url: "" }
    ];

    const goToX = target => {
      closePopup();
      router.push(target);
    };

    const closePopup = () => {
      store.commit(STORE_TYPE.sideBar, false);
    };

    onMounted(() => {
      flag.value = store.state.sideBar;
      const ud = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
      if (ud) {
        userData.value = commonUtil.parseJson(ud);
        profileImg.value = commonUtil.getImgUrl(
          userData.value.file.filter(v => v.fileType === "USER_PROFILE")[0].fileName
        );
      }
      setTimeout(() => {
        isActive.value = true;
      }, 10);
    });

    onUnmounted(() => {

    });

    watch(
      () => store.state.sideBar,
      () => {
        console.log(flag.value);
        flag.value = store.state.sideBar;
      }
    );

    return {
      userData,
      profileImg,
      flag,
      menuList,
      isActive,
      goToX,
      closePopup
    };
  }
};
</script>
<template>
  <!--  <Transition>-->
  <div class="side-bar" @click="closePopup">
    <div class="body" :class="{active:isActive}" @click.prevent.stop="">
      <i @click="closePopup" class="fa-solid fa-xmark"></i>
      <div class="profile-area">
        <img :src="profileImg" alt="profileImg" />
        <div>{{ userData ? userData.userNickName : "손님" }}</div>
        <i @click="goToX('/myPage')" class="fa-solid fa-pen"></i>
      </div>
      <hr />
      <div class="menu-area">
        <div @click="goToX(item.url)" class="menu" v-for="item in menuList">
          {{ item.name }}
        </div>
      </div>
      <div class="footer">
        <span> 약관 </span>
        <span> 개인정보처리방침 </span>
      </div>
    </div>
  </div>
  <!--  </Transition>-->
</template>
