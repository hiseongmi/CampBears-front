<script>
import router from "../router/index.js";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import snsPage from "./snsPage.vue";
import myPage from "./myPage.vue";
import {apiClient} from "../utils/axios.js";
import {onMounted, ref} from "vue";
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
        link: "http://localhost:3001/#/snsPage"
      },
      {
        name: "#애견",
        link: "http://localhost:3001/#/login"
      },
      {
        name: "#파주",
        link: "/snsPage"

      },
      {
        name: "#차박"
      },
      {
        name: "#노지"
      },
    ]
    const move = () => {
      window.location.href = ''
    }
    const moving = () => {
      window.location.href = '#'
    }
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
    onMounted(initMap)

    return {
      tagList,
      initMap,
      move,
      moving,
    };
  }
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
      <div class="info-navi">

      </div>
      <a class="info-dic">캠핑사전</a>
      <a class="info-food">캠핑음식</a>
    </div>
    <h1>멋진 여행을 기대하고 계신가요?</h1>
    <div class="info-serch">

      <custom-input placeholder="캠핑장 검색"></custom-input>
      <span>
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16.94 8.86366C16.9145 10.5082 16.5054 12.0337 15.6076 13.4083C15.4113 13.7088 15.4132 13.7113 15.6687 13.9718C17.1802 15.5147 18.6924 17.0571 20.2027 18.6012C20.5479 18.9542 20.7114 19.3741 20.6236 19.8811C20.4704 20.7681 19.5781 21.0972 18.9256 20.827C18.7175 20.7406 18.5365 20.6124 18.3774 20.447C16.8569 18.8658 15.3321 17.2887 13.8156 15.7039C13.6812 15.5635 13.5938 15.5595 13.4409 15.6688C12.3002 16.4844 11.029 16.9539 9.65037 17.0668C7.46098 17.2463 5.48281 16.655 3.78091 15.2045C2.58217 14.1828 1.72162 12.9066 1.25451 11.371C1.0476 10.6909 0.924158 9.99106 0.886146 9.27469C0.819528 8.02548 1.02369 6.82467 1.47513 5.66985C1.9442 4.46985 2.6817 3.46306 3.61789 2.60511C4.43964 1.85203 5.37543 1.29782 6.42369 0.964236C7.42806 0.64437 8.45712 0.493916 9.51478 0.592336C10.5999 0.693177 11.6332 0.965446 12.6035 1.48538C13.417 1.92101 14.1259 2.49136 14.7569 3.17506C15.3846 3.85513 15.8815 4.62111 16.2534 5.47462C16.6151 6.30393 16.8103 7.17802 16.8996 8.07913C16.9255 8.3401 16.9451 8.60108 16.94 8.86447V8.86366ZM8.8823 14.5228C12.009 14.445 14.4085 12.1587 14.4159 8.8443C14.4234 5.62427 12.1552 3.17345 8.90542 3.15812C5.80218 3.14319 3.42038 5.49519 3.39452 8.79953C3.36944 12.0184 5.68776 14.4196 8.8823 14.5228Z"
            fill="black"/>
      </svg>
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
        <custom-date-picker/>
      </div>
    </div>
    <!--    지도-->
    <div id="map" style="width:55%; height: 350px;margin: 0 auto; z-index: 0">지도</div>

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
    <div class="info-content">

    </div>
  </div>
  <div class="info-pagination">
    <pagination></pagination>
  </div>
</template>
