<script>
import customSelect from "../layout/customSelect.vue";
import modalHome from '../sungmi/modalHome.vue';
import {ref} from 'vue';
import router from "../../router/index.js";

export default {
  name: 'newsPage',
  components: {
    modalHome,
    customSelect
  },
  setup() {
    const news = [
      {
        img: '/assets/image/camping.png',
      },
      {
        img: '/assets/image/camping.png',
      },
      {
        img: '/assets/image/camping.png',
      },
      {
        img: '/assets/image/camping.png',
      },
      {
        img: '/assets/image/camping.png',
      },
      {
        img: '/assets/image/camping.png',
      },
      {
        img: '/assets/image/camping.png',
      },
      {
        img: '/assets/image/camping.png',
      },
    ];

    const postLink = () => {
      router.push('/PostPage');
    };
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    const selectedValue = ref();

    const selectedUpdateValue = (value) => {
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

    return {
      news,
      postLink,
      modalActive,
      toggleModal,
      selectedUpdateValue,
      selectSortData,
      selectedValue,
      selectSeasonData,
      selectComfortsData,


    };
  },
};
</script>
<template>
  <div class="news">
    <div class="news-wrap">
      <div class="news-wrap-contents">
        <h1 class="news-wrap-contents-title">소식</h1>
        <h5 class="news-wrap-contents-ment">다른 캠퍼의 소식을 들어보아요!</h5>
      </div>
      <div class="news-wrap-search">
        <input type="text" placeholder="태그, 장소 찾아보기"/>
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

      <modal-home></modal-home>
    </div>
    <!--		<modal-home></modal-home>-->
    <div class="news-content">
      <div class="news-content-list">
        <div class="news-content-list-ul">
          <div class="news-content-list-ul-li" v-for="item in news">
            <div class="news-content-list-ul-li-write" @click="postLink">
              <div class="profile">
                <div class="profile-wrap">
                  <img src="/assets/image/bgs.png" alt="베어그릴스"/>
                  <div class="profile-wrap-data">
                    <span>베어그릴스</span>
                    <button>팔로우</button>
                    <p>캠핑을 좋아하는 30대 아저씨에요~</p>
                  </div>
                  <div class="profile-wrap-comment">
                    <span><i class="fa-regular fa-comment"></i></span>
                    <span>4.219</span>
                  </div>
                  <div class="profile-wrap-heart">
                    <span><i class="fa-regular fa-heart"></i></span>
                    <span>23,812</span>
                  </div>
                </div>
              </div>
              <img :src="item.img" alt="Posts"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
