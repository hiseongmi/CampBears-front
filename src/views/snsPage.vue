<script>

import modalHome from "../components/sungmi/modalHome.vue";
import {onMounted, ref} from "vue";
import PopupManager from "../App.vue";
import store, {POPUP_TYPE, STORE_TYPE} from "../store/index.js";
import profile from "../components/snsBoard/profile.vue";
import snsContentPage from "../components/snsBoard/snsContentPage.vue";
import {apiClient} from "../utils/axios.js";
import customInput from "../components/layout/customInput.vue";

export default {
  name: "snsPage",
  components: {
    snsContentPage,
    PopupManager,
    modalHome,
    profile,
    customInput
  },
  setup() {
    const inquiryData = ref({keyword: ""})
    const getContent = async () => {
      const data = await apiClient("/sns/getSnsList", inquiryData.value)
      // console.log(data.data) //태그 장소 검색 글 데이터
      // contentData.value = data.data
      dispatchEvent(new CustomEvent('SEARCH', {detail: inquiryData.value.keyword})); //search 이벤트를 날림
    }


    return {
      inquiryData,
      getContent,
    };
  },
};
</script>
<template>
  <div class="news">
    <div class="news-wrap">
      <div class="news-wrap-contents">
        <h1 class="news-wrap-contents-title">소식</h1>
        <h5 class="news-wrap-contents-ment">다른 캠퍼의 소식을 들어 보아요!</h5>
      </div>
      <!--      <hr class="line"/>-->
      <div class="news-wrap-search">
        <custom-input :placeholder="'태그, 장소 찾아 보기'" @update:value="inquiryData.keyword = $event"/>
        <button @click="getContent"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>
    <sns-content-page></sns-content-page>
  </div>
</template>
