<script>
import Profile from "./profile.vue";
import postImage from "../../data/postImage.js";
import store, {POPUP_TYPE, STORE_TYPE} from "../../store/index.js";
import {onMounted, ref} from "vue";
import {apiClient} from "../../utils/axios.js";

export default {
  name: "snsContentPage",
  components: {
    Profile,
  },
  setup() {

    const openDetail = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
    }; //게시물상세페이지 팝업열기

    onMounted(() => {
      getSearch();
    })
    //키워드 검색
    const keyword = ref("")
    const contentData = []
    const getSearch = async () => {
      const data = await apiClient("/sns/getSnsList", keyword.value)
      console.log(data.data)
      contentData.value = data.data;
      console.log(contentData.value)
    }


    return {
      openDetail,
      postImage,
      getSearch,
      keyword,
      contentData,
    };
  },
};
</script>
<template>
  <div class="news-ul">
    <div class="news-ul-li" v-for="(item,index) in contentData.value">
      <div>
        <profile></profile>
      </div>
      <div class="news-ul-li-wrap">
        <div class="news-ul-li-wrap-write" @click="openDetail(item.id)">
          <img src="/assets/image/iugold3.png" alt="Posts"/>
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
            <span class="contents-writing">{{ index }} : {{ item.boardBody }}</span>
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
