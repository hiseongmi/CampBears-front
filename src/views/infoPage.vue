<script>
import router from "../router/index.js";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import snsPage from "./snsPage.vue";
import myPage from "./myPage.vue";
import { apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import CustomLoading from "../components/layout/customLoading.vue";
// import {e} from "../../dist/assets/index.a54a7291.js";
import HeaderPage from "../components/headerPage.vue";
import customSelect from "../components/layout/customSelect.vue";
import CustomDatePicker from "../components/layout/customDatePicker.vue";
import pagination from "../components/layout/pagination.vue";

export default {
  name: "mainPage",
  components: {
    CustomDatePicker,
    customSelect,
    CustomLoading,
    customInput,
    customButton,
    snsPage,
    myPage,
    HeaderPage,
    pagination,
  },

  setup() {
    const tagList = [
      {
        name: "#목포",
        link: "http://localhost:3001/#/snsPage",
      },
      {
        name: "#애견",
        link: "http://localhost:3001/#/login",
      },
      {
        name: "#파주",
        link: "/snsPage",
      },
      {
        name: "#차박",
      },
      {
        name: "#노지",
      },
    ];
    const move = () => {
      window.location.href = "";
    };
    const moving = () => {
      window.location.href = "#";
    };
    const initMap = () => {
      // if (window.kakao && window.kakao.maps) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.71173, 126.88878),
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, options);
      console.log(map);
      // } else {
      //   addScript();
      // }
    };
    onMounted(initMap);

    return {
      tagList,
      initMap,
      move,
      moving,
    };
  },
};
</script>

<template>
  <!--  <script type="text/javascript"-->
  <!--          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8cd7ea967a72d603b3fd12c735e76a49"></script>-->
  <!--  <div id="map" style="width:500px;height:400px;"></div>-->
  <div class="info-main">
    <header-page></header-page>
    <div class="info-side">
      <div class="info-name">
        <a href="">캠핑장 정보</a>
      </div>
      <div class="info-navi"></div>
      <a class="info-dic">캠핑사전</a>
      <a class="info-food">캠핑음식</a>
    </div>
    <h1>멋진 여행을 기대하고 계신가요?</h1>
    <div class="info-serch">
      <custom-input placeholder="캠핑장 검색"></custom-input>
      <span>
        <img src="/assets/image/icon/search.png" alt="" />
      </span>
    </div>

    <div class="info-box">
      <div class="info-shapbox" v-for="item in tagList">
        <a class="info-shap" :href="item.link">
          {{ item.name }}
        </a>
      </div>
    </div>

    <div class="info-mapbtn">
      <custom-button placeholder="지역별"></custom-button>
    </div>

    <div class="date-box">
      <div class="date-pic">
        <custom-date-picker ref="입실일 선택"></custom-date-picker>
      </div>
      <div class="date-pick">
        <custom-date-picker />
      </div>
    </div>
    <!--    지도-->
    <div id="map" style="width: 55%; height: 350px; margin: 0 auto; z-index: 0">지도</div>
  </div>

  <div class="info-select">
    <select name="count" data-title="인기순">
      <option value="0">인기순 ▼</option>
      <option value="1">시간순</option>
      <option value="2">가나다순</option>
      <option value="3">리뷰순</option>
    </select>
    <select name="count" data-title="필터">
      <option value="0">인원 ▼</option>
      <option value="1">`</option>
      <option value="2">`</option>
      <option value="3">`</option>
    </select>
    <select name="count" data-title="필터">
      <option value="0">가격 ▼</option>
      <option value="1">`</option>
      <option value="2">`</option>
      <option value="3">`</option>
    </select>
    <select name="count" data-title="필터">
      <option value="0">구비시설 ▼</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">2</option>
    </select>
  </div>
  <div class="info-camp">
    <div class="info-content"></div>
  </div>
  <div class="info-pagination">
    <pagination></pagination>
  </div>
</template>
