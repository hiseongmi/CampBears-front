<script>
import router from "../router/index.js";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import snsPage from "./snsPage.vue";
import myPage from "./myPage.vue";
import infoPage from "./infoPage.vue";
import {apiClient} from "../utils/axios.js";
import {onMounted} from "vue";
import CustomLoading from "../components/layout/customLoading.vue";
import UsedContentsComponent from "../components/usedMarket/usedContentsComponent.vue";
// import {e} from "../../dist/assets/index.a54a7291.js";

export default {
  name: "mainPage",
  components: {
    UsedContentsComponent,
    CustomLoading,
    customInput,
    customButton,
    snsPage,
    myPage,
    infoPage,
  },

  setup() {
    const move = () => {
      window.location.href = "";
    };
    const moving = () => {
      window.location.href = "/myPage";
    };
    // const mousewheel = () => {
    //   scrollX -= (date * 40)
    //
    //   e()
    // }

    return {
      move,
      moving,
    };
  },
};
</script>
<template>
  <div class="main-box">
    <div class="main-fir">
      <span>감성있는 캠핑장을 찾고있나요?</span>
      <custom-button :placeholder="`캠핑장 양도 받기/찾기`" :onClick="move"></custom-button>
    </div>
    <div class="main-sec">
      <span>저렴한 캠핑용품이 필요하신가요?</span>
      <custom-button :placeholder="`캠핑용품 중고거래`" :onClick="moving"></custom-button>
    </div>
  </div>
  <div class="main-icon">
    <a href="#">
      <img src="/assets/image/icon/categoryTent.png" alt=""/>
      <span>텐트</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryCaravane.png" alt=""/>
      <span>카라반</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryGlamping.png" alt=""/>
      <span>글램핑</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryAutoCamping.png" alt=""/>
      <span>오토캠핑</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryPet.png" alt=""/>
      <span>반려동물</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryKids.png" alt=""/>
      <span>키즈</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryCampnic.png" alt=""/>
      <span>캠프닉</span>
    </a>
  </div>

  <div class="main-story">
    <img src="/assets/image/icon/mainCampingStory.png" alt=""/>
    <span>자신의 캠핑스타일 자랑해보세요</span>
  </div>
  <div class="main-sns">
    <sns-page></sns-page>
  </div>
  <div class="view-all">
    <custom-button :placeholder="`더보기`" :onClick="moving"></custom-button>
  </div>

  <div class="add-banner">
    <div class="add-img">
      <span>#입술 끝에 맺혀있는 말</span>
      <span>#너만 보면 하고 싶은 말</span>
      <span>#너무 소중해 아껴두려고 참고 또 참는 말</span>
      <custom-button :placeholder="`상품 보러가기 ▼`" :onClick="moving"></custom-button>
    </div>
  </div>
  <div class="main-campsite">
    <h2>HAND OVER A CAMPSITE</h2>
    <custom-button :placeholder="`더보기`" :onClick="moving"></custom-button>
  </div>

  <div class="autocamp-box">
    <div class="main-autocamp">
      <div class="autocamp">
        <!--      <img src="/assets/image/mainutoCamp.png" alt="">-->
      </div>
      <div class="autocam-cont">
        <h1>피아골 오토 캠핑장</h1>
        <span>테크 13번 9/27~9/29 양도합니다. 테크 4*4...</span>
        <a href="">
          <img src="/assets/image/icon/locationBlue.png" alt=""/>
          전라남도 구례군
        </a>
        <div>
          <h2>845.000원</h2>
          <span>
            <img src="/assets/image/icon/time.png" alt=""/>
            1시간 전
          </span>
        </div>
      </div>
    </div>
    <div class="main-autocamp">
      <div class="autocamp">
        <!--      <img src="/assets/image/mainutoCamp.png" alt="">-->
      </div>
      <div class="autocam-cont">
        <h1>피아골 성미 캠핑장</h1>
        <span>테크 13번 9/27~9/29 양도합니다. 테크 4*4...</span>
        <a href="">
          <img src="/assets/image/icon/locationBlue.png" alt=""/>
          경기도 어디였더라
        </a>
        <div>
          <h2>450.000원</h2>
          <span>
            <img src="/assets/image/icon/time.png" alt=""/>
            1시간 전
          </span>
        </div>
      </div>
    </div>
    <div class="main-autocamp">
      <div class="autocamp">
        <!--      <img src="/assets/image/mainutoCamp.png" alt="">-->
      </div>
      <div class="autocam-cont">
        <h1>피아골 정운 캠핑장</h1>
        <span>테크 13번 9/27~9/29 양도합니다. 테크 4*4...</span>
        <a href="">
          <img src="/assets/image/icon/locationBlue.png" alt=""/>
          경기도 고양시
        </a>
        <div>
          <h2>995.000원</h2>
          <span>
            <img src="/assets/image/icon/time.png" alt=""/>
            1시간 전
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="used-market-box">
    <custom-button :customClass="'usedMarketButton'" :placeholder="`USED MARKET >`" :onClick="moving"/>
    <used-contents-component/>
  </div>
  <div class="main-bottom">
    <span>
      <h1>파도소리 들리는 감성 캠핑78</h1>
      <h2>한번쯤은 꼭 가볼만한 캠핑장! 추천해요~</h2>
    </span>
    <div class="bot-camp">
      <img src="/assets/image/mainpageslider1.png" alt="">
      <div class="bot-camp-info">
        <span></span>
      </div>
    </div>
    840

  </div>
</template>
