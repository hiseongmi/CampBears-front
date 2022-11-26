<script>
import Profile from "./profile.vue";
import postImage from "../../data/postImage.js";
import store, { POPUP_TYPE, STORE_TYPE } from "../../store/index.js";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customSelect from "../layout/customSelect.vue";
import Pagination from "../layout/customPagination.vue";
import LoginNaver from "../snslogin/loginNaver.vue";
import customButton from "../layout/customButton.vue";
import commonUtil from "../../utils/common-util.js";
import { CONSTANTS } from "../../constants.js";
import router from "../../router/index.js";

export default {
  name: "snsContentPage",
  components: {
    LoginNaver,
    Pagination,
    Profile,
    customSelect,
    customButton,
  },
  setup() {
    const userData = ref();
    const getData = async () => {
      try {
        return userData.value = commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      } catch (e) {
        return e;
      }
    };

    const sortValue = ref();
    const SORT_TYPE = {
      RECENT: "RECENT",
      LONG: "LONG",
    };
    const showValue = ref();
    const SHOW_TYPE = {
      ALL: "ALL",
      FOLLOW: "FOLLOW",
      HASH: "HASH",
    };
    const sortUpdateValue = value => {
      sortValue.value = value;
    };
    const showUpdateValue = value => {
      showValue.value = value;
    };

    const selectSortData = [
      { key: "정렬", value: "정렬" },
      { key: "좋아요순", value: "좋아요순" },
      { key: "조회수순", value: "조회수순" },
      { key: "댓글순", value: "댓글순" },
      { key: SORT_TYPE.RECENT, value: "최근순" },
      { key: SORT_TYPE.LONG, value: "오래된순" },
      { key: "가나다순", value: "가나다순" },
    ];
    const selectSeasonData = [
      { key: "season", value: "계절" },
      { key: "spring", value: "봄" },
      { key: "summer", value: "여름" },
      { key: "fall", value: "가을" },
      { key: "winter", value: "겨울" },
    ];
    const selectNumberData = [
      { key: "NUM", value: "인원" },
      { key: "1", value: "1" },
      { key: "2", value: "2" },
      { key: "3", value: "4" },
      { key: "4", value: "5" },
      { key: "5", value: "5" },
      { key: "6", value: "6" },
      { key: "7", value: "7" },
      { key: "8", value: "8" },
      { key: "9", value: "9" },
      { key: "10", value: "10" },
    ];
    const selectComfortsData = [
      { key: "COMFORTS", value: "편의시설" },
      { key: "MART", value: "편의점" },
      { key: "PHARMACY", value: "약국" },
      { key: "RESTAURANT", value: "음식점" },
      { key: "CAFE", value: "카페" },
      { key: "WASHROOM", value: "화장실" },
      { key: "DRINKING", value: "식수대" },
      { key: "SHOWER", value: "샤워장" },
      { key: "PARKING", value: "주차가능" },
    ];
    const selectPublicData = [
      { key: SHOW_TYPE.ALL, value: "전체 게시물" },
      { key: SHOW_TYPE.FOLLOW, value: "팔로워 게시물" },
      { key: SHOW_TYPE.HASH, value: "해시태그 게시물" },
    ];

    const openWrite = () => {
      if (userData.value) {
        store.state.detailData = "";
        store.commit(STORE_TYPE.popupType, POPUP_TYPE.WRITE_BOARD);
      } else {
        window.alert("로그인 하세요.");
        router.push("/login");
      }
    }; //글쓰기 팝업열기

    const openDetail = boardIdx => {
      if (userData.value) {
        store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
        store.commit(STORE_TYPE.boardIdx, boardIdx); //<-item.boardIdx 값을 넣었다
      } else {
        window.alert("로그인 하세요.");
        router.push("/login");
      }
    }; //게시물 상세 페이지 팝업 열기

    const handleSearch = e => {
      //이벤트를 받음
      if (e.detail !== "" && e.detail[0] === "#") {
        hashKeyWord = e.detail.replace("#", "");
        keyword = "";
      } else {
        keyword = e.detail;
        hashKeyWord = "";
      }
      getContent();
    };

    const contentData = ref();
    let keyword = "";
    let hashKeyWord = "";
    const getContent = async () => {
      let param = { keyword: keyword, hashKeyWord: hashKeyWord, sorted: "RECENT", showType: "ALL" };
      if (sortValue.value !== null && sortValue.value !== undefined) {
        param = Object.assign({}, param, { sorted: sortValue.value }); //ob 내장함수 합침
        param.sorted = sortValue.value;
      }
      if (showValue.value !== null && showValue.value !== undefined) {
        param = Object.assign({}, param, { showType: showValue.value }); //ob 내장함수 합침
        param.showType = showValue.value;
      }
      const data = await apiClient("/sns/getSnsList", param);
      if (data.data) {
        contentData.value = data.data;
      }
    };

    const getImgUrl = (file) => {
      try {
        if (file) {
          return commonUtil.getImgUrl(file.fileName);
        }
      } catch (e) {
        return "./assets/image/camping.png";
      }
    };

    const goTargetFeed = (item) => {
      if (userData.value.userIdx === item.userIdx) {
        router.push("/myPage");
      } else {
        router.push(`/userFeed/${item.userIdx}`);
      }
    };

    onMounted(() => {
      window.addEventListener("SEARCH", handleSearch); //search 이벤트를 찾아서 handel이벤트로 보냄
      getContent();
      getData();
    });

    onUnmounted(() => {
      window.removeEventListener("SEARCH", handleSearch);
    });

    return {
      userData,
      contentData,
      selectSortData,
      sortValue,
      showValue,
      selectSeasonData,
      selectComfortsData,
      postImage,
      selectNumberData,
      selectPublicData,
      goTargetFeed,
      sortUpdateValue,
      showUpdateValue,
      openWrite,
      openDetail,
      getContent,
      getImgUrl,
    };
  },
};
</script>
<template>
  <div class="news-menu">
    <div class="news-menu-select">
      <ul>
        <li>
          <customSelect @click="getContent" @update:value="showUpdateValue"
                        :data="selectPublicData"></customSelect>
        </li>
        <li>
          <customSelect @click="getContent" @update:value="sortUpdateValue"
                        :data="selectSortData"></customSelect>
        </li>
        <li>
          <custom-select @update:value="sortUpdateValue" :data="selectNumberData"></custom-select>
        </li>
        <li>
          <customSelect @update:value="sortUpdateValue" :data="selectSeasonData"></customSelect>
        </li>
        <li>
          <customSelect @update:value="sortUpdateValue" :data="selectComfortsData"></customSelect>
        </li>
      </ul>
    </div>
    <div :class="userData ? 'news-menu-button': 'none'">
      <button class="news-menu-button-write_btn" @click="openWrite()">
        <i class="fa-solid fa-pen"></i>
        <span>글쓰기</span>
      </button>
    </div>
  </div>
  <div class="news-ul">
    <div class="news-ul-li" v-for="item in contentData">
      <div>
        <div class="profile">
          <div class="profile-wrap">
            <img :src="getImgUrl(item.userProfile.filter(v=>v.fileType === 'USER_PROFILE')[0])"
                 alt="프사" @click="goTargetFeed(item)" />
            <div class="profile-wrap-data">
              <span>{{ item.userNickName }}</span>
              <span v-if="userData?.userIdx !== item?.userIdx">
          <span class="middle-dot">&#183;</span>
          <button class="follow">팔로우</button>
        </span><br />
              <a class="profile-wrap-data-place"><i class="fa-solid fa-location-dot"></i></a>
            </div>
          </div>
        </div>
        <!--        <profile :img="item.userProfile" :userInfo="item"></profile>-->
      </div>
      <div class="news-ul-li-wrap">
        <div class="news-ul-li-wrap-write" @click="openDetail(item.boardIdx)">
          <img :src="getImgUrl(item.file[0])" alt="Posts" />
        </div>
        <div class="detail">
          <div class="detail-wrap">
            <div class="detail-wrap-icon">
              <span><i class="fa-regular fa-heart"></i></span>
              <span><i class="fa-regular fa-comment"></i></span>
            </div>
            <!--            <div class="detail-wrap-briefcase">-->
            <!--              <span><i class="fa-solid fa-briefcase"></i></span>-->
            <!--            </div>-->
            <!--            <div class="detail-wrap-icon">-->
            <!--              <span><i class="fa-regular fa-bookmark"></i></span>-->
            <!--            </div>-->
          </div>
          <div class="contents" @click="openDetail(item.boardIdx)">
            <span class="contents-writing">{{ item.boardBody }}</span>
          </div>
          <div class="comments">
            <span>댓글 {{ item.commentCount }}</span>
            <span><i class="fa-solid fa-chevron-down"></i></span>
          </div>
        </div>
        <div class="heart">
          <span><i class="fa-regular fa-heart"></i></span>
          <!--          <i class="fa-solid fa-circle-heart"></i> 이 아이콘은 안보임-->
          <span>0</span>
        </div>
      </div>
    </div>
  </div>
  <div class="pagination">
    <!--    <login-naver></login-naver>-->
  </div>
</template>
