<script>
import Profile from "./profile.vue";
import postImage from "../../data/postImage.js";
import store, {POPUP_TYPE, STORE_TYPE} from "../../store/index.js";

export default {
  name: "snsContentPage",
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
      <div>
        <profile></profile>
      </div>
      <div class="news-ul-li-wrap">
        <div class="news-ul-li-wrap-write" @click="openDetail(item.id)">
          <img :src="item.img" alt="Posts"/>
        </div>
        <div class="detail">
          <div class="detail-wrap">
            <div class="detail-wrap-icon">
              <span><i class="fa-regular fa-heart"></i></span>
            </div>
            <div class="detail-wrap-icon">
              <span><i class="fa-regular fa-comment"></i></span>
            </div>
            <div class="detail-wrap-briefcase">
              <span><i class="fa-solid fa-briefcase"></i></span>
            </div>
            <div class="detail-wrap-icon">
              <span><i class="fa-solid fa-bookmark"></i></span>
            </div>
          </div>
          <div class="contents">
            <span class="contents-writing">친구들이랑 캠핑중인데 연예인봐따 바로바로 박재범 @박재범</span>
            <span><i class="fa-solid fa-chevron-down"></i></span>
          </div>
          <div class="comments">
            <span>댓글 256개</span>
            <span><i class="fa-solid fa-chevron-down"></i></span>
          </div>
        </div>
        <div class="heart">
          <span><i class="fa-regular fa-heart"></i></span>
          <!--          <i class="fa-solid fa-circle-heart"></i> 이 아이콘은 안보임-->
          <span>127</span>
        </div>
      </div>
    </div>
  </div>
</template>
