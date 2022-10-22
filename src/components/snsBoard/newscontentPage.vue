<script>
import Profile from "./profile.vue";
import postImage from "../../data/postImage.js";
import store, {POPUP_TYPE, STORE_TYPE} from "../../store/index.js";

export default {
  name: "newsContentPage",
  components: {
    Profile,
  },
  setup() {

    const openDetail = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
    }; //게시물상세페이지 팝업열기


    return {
      openDetail,
      postImage,
    };
  },
};
</script>
<template>
  <div class="news-ul">
    <div class="news-ul-li" :key="id" v-for="(item, id) in postImage">
      <div class="news-ul-li-write" @click="openDetail(item.id)">
        <profile></profile>
        <img :src="item.img" alt="Posts"/>
      </div>
    </div>
  </div>
</template>
