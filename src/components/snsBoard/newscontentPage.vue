<script>
import Profile from "./profile.vue";
import postImage from "../../data/postImage.js";
import store, {POPUP_TYPE, STORE_TYPE} from "../../store/index.js";
import axios from "axios";

export default {
  name: "newsContentPage",
  components: {
    Profile,
  },
  setup() {
    const openDetail = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
    };
    const getList = () => {

    }
    return {
      openDetail,
      postImage,
      getList,
    };
  },
};
</script>
<template>
  <div @click="getList">게시판</div>
  <div class="news-ul">
    <div class="news-ul-li" :key="id" v-for="(item, id) in postImage">
      <div class="news-ul-li-write" @click="openDetail(item.id)">
        <!--				<profile></profile>-->
        <img :src="item.img" alt="Posts"/>
      </div>
    </div>
  </div>
</template>
