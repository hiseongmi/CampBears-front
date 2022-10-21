<script>
import customSelect from "../components/layout/customSelect.vue";
import modalHome from "../components/sungmi/modalHome.vue";
import {ref} from "vue";
import router from "../router/index.js";
import PopupManager from "../App.vue";
import store, {POPUP_TYPE, STORE_TYPE} from "../store/index.js";
import NewsContentPage from "../components/snsBoard/newscontentPage.vue";
import profile from "../components/snsBoard/profile.vue";

export default {
  name: "newsPage",
  components: {
    NewsContentPage,
    PopupManager,
    modalHome,
    customSelect,
    profile,
  },
  setup() {
    const postLink = () => {
      router.push("/PostPage");
    };
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    const selectedValue = ref();

    const selectedUpdateValue = value => {
      selectedValue.value = value;
      console.log(selectedValue.value);
    };
    const selectSortData = [
      {key: "one", value: "정렬"},
      {key: "two", value: "좋아요순"},
      {key: "three", value: "조회수순"},
      {key: "four", value: "댓글순"},
      {key: "six", value: "최근순"},
      {key: "seven", value: "오래된순"},
      {key: "eight", value: "가나다순"},
    ];

    const selectSeasonData = [
      {key: "season", value: "계절"},
      {key: "spring", value: "봄"},
      {key: "summer", value: "여름"},
      {key: "fall", value: "가을"},
      {key: "winter", value: "겨울"},
    ];
    const selectComfortsData = [
      {key: "COMFORTS", value: "편의시설"},
      {key: "MART", value: "편의점"},
      {key: "PHARMACY", value: "약국"},
      {key: "RESTAURANT", value: "음식점"},
      {key: "CAFE", value: "카페"},
      {key: "WASHROOM", value: "화장실"},
      {key: "DRINKING", value: "식수대"},
      {key: "SHOWER", value: "샤워장"},
      {key: "PARKING", value: "주차가능"},
    ];
    const goPop = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.WRITE_BOARD);
    };

    return {
      postLink,
      modalActive,
      toggleModal,
      selectedUpdateValue,
      selectSortData,
      selectedValue,
      selectSeasonData,
      selectComfortsData,
      goPop,
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
      <!--      <div class="line"></div>-->
      <div class="news-wrap-search">
        <input type="text" placeholder="태그, 장소 찾아 보기"/>
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
    <div class="news-menu">
      <div class="news-menu-select">
        <ul>
          <li>
            <customSelect @update:value="selectedUpdateValue" :data="selectSortData"></customSelect>
          </li>
          <li>
            <select name="count" data-title="인원">
              <option value="0">인원</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="3">5</option>
              <option value="3">6</option>
              <option value="3">7</option>
            </select>
          </li>
          <li>
            <customSelect @update:value="selectedUpdateValue" :data="selectSeasonData"></customSelect>
          </li>
          <li>
            <customSelect @update:value="selectedUpdateValue" :data="selectComfortsData"></customSelect>
          </li>
        </ul>
      </div>
      <div class="news-menu-button">
        <button class="write_btn" @click="goPop">
          <i class="fa-solid fa-pen"></i>
          <span>글쓰기</span>
        </button>
      </div>
    </div>
    <news-content-page/>
  </div>
</template>
