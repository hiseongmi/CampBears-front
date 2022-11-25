<script>
import router from "../router/index.js";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import snsPage from "./snsPage.vue";
import myPage from "./myPage.vue";
import infoPage from "./infoPage.vue";
import { apiClient } from "../utils/axios.js";
import { nextTick, onMounted, ref } from "vue";
import CustomLoading from "../components/layout/customLoading.vue";
import UsedContentsComponent from "../components/usedMarket/sellComponent.vue";
import Buss from "../components/busBooreng.vue";
import TWEEN, { Tween } from "@tweenjs/tween.js";


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
    Buss
  },
  setup() {
    let coor = { y: 0 };
    const intro = ref(undefined);
    let introAni = undefined;

    const startAnimation = (v) => {
      console.log("startAni");
      introAni = new Tween(coor).to({ y: 100 }, 1000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
          intro.value.style.setProperty("transform", `translateY(-${coor.y}%)`);
          intro.value.style.setProperty("opacity", `${100 / coor.y - 1}`);
        }).onComplete(() => {
          console.log("complete");
          if (v) router.push(v);
        }).start();

      const animation = (time) => {
        requestAnimationFrame(animation);
        TWEEN.update(time);
      };

      requestAnimationFrame(animation);
    };

    const goToX = v => {
      v ? router.push(v) : window.alert("준비중입니다.");
    };

    const introPush = v => {
      startAnimation(v);
    };

    onMounted(() => {
      intro.value = document.getElementById("intro");
      nextTick(() => {

      });
    });


    return {
      goToX,
      introPush
    };
  }
};
</script>
<template>
  <!--  <Buss />-->

  <div class="main-box">

    <div class="main-fir">
      <div class="black"></div>
      <div class="main-add-r">
        <span>감성있는 캠핑장을 찾고있나요?</span>
        <custom-button :placeholder="`캠핑장 양도 받기/찾기`"></custom-button>
      </div>
    </div>
    <div class="main-sec">
      <div class="black"></div>
      <div class="main-add-p">
        <span>저렴한 캠핑용품이 필요하신가요?</span>
        <custom-button :placeholder="`캠핑용품 중고거래`"></custom-button>
      </div>
    </div>
  </div>

  <div class="main-icon">
    <a href="#">
      <img src="/assets/image/icon/categoryTent.webp" alt="" />
      <span>텐트</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryCaravane.webp" alt="" />
      <span>카라반</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryGlamping.webp" alt="" />
      <span>글램핑</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryAutoCamping.webp" alt="" />
      <span>오토캠핑</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryPet.webp" alt="" />
      <span>반려동물</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryKids.webp" alt="" />
      <span>키즈</span>
    </a>

    <a href="">
      <img src="/assets/image/icon/categoryCampnic.webp" alt="" />
      <span>캠프닉</span>
    </a>
  </div>

  <div class="main-story">
    <img src="/assets/image/icon/mainCampingStory.webp" alt="" />
    <span>자신의 캠핑스타일 자랑해보세요</span>
  </div>
  <div class="main-sns">
    <sns-page></sns-page>
  </div>
  <div class="view-all">
    <custom-button :placeholder="`더보기`" @click="goToX('/snsPage')"></custom-button>
  </div>

  <div class="add-banner">
    <div class="add-img">
      <div class="add-ment">
        <span>#입술 끝에 맺혀있는 말 <br /></span>
        <span>#너만 보면 하고 싶은 말 <br /></span>
        <span>#너무 소중해 아껴두려고 참고 또 참는 말</span>
        <custom-button :placeholder="`상품 보러가기 ▼`"></custom-button>
      </div>
    </div>
  </div>
  <!--  <div class="main-campsite">-->
  <!--    <custom-button :customClass="'main-info-btn'" :placeholder="`HAND OVER A CAMPSITE >`"-->
  <!--                   @click="goToX('/infoPage')" />-->

  <!--  </div>-->

  <!--  <div class="autocamp-box">-->
  <!--    <div class="main-autocamp">-->
  <!--      <div class="autocamp">-->
  <!--        &lt;!&ndash;      <img src="/assets/image/mainutoCamp.webp" alt="">&ndash;&gt;-->
  <!--      </div>-->
  <!--      <div class="autocam-cont">-->
  <!--        <h1>피아골 오토 캠핑장</h1>-->
  <!--        <span>테크 13번 9/27~9/29 양도합니다. 테크 4*4...</span>-->
  <!--        <a href="">-->
  <!--          <img src="/assets/image/icon/locationBlue.webp" alt="" />-->
  <!--          전라남도 구례군-->
  <!--        </a>-->
  <!--        <div>-->
  <!--          <h2>845.000원</h2>-->
  <!--          <span>-->
  <!--            <img src="/assets/image/icon/time.webp" alt="" />-->
  <!--            1시간 전-->
  <!--          </span>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="main-autocamp">-->
  <!--      <div class="autocamp">-->
  <!--        &lt;!&ndash;      <img src="/assets/image/mainutoCamp.webp" alt="">&ndash;&gt;-->
  <!--      </div>-->
  <!--      <div class="autocam-cont">-->
  <!--        <h1>피아골 성미 캠핑장</h1>-->
  <!--        <span>테크 13번 9/27~9/29 양도합니다. 테크 4*4...</span>-->
  <!--        <a href="">-->
  <!--          <img src="/assets/image/icon/locationBlue.webp" alt="" />-->
  <!--          경기도 어디였더라-->
  <!--        </a>-->
  <!--        <div>-->
  <!--          <h2>450.000원</h2>-->
  <!--          <span>-->
  <!--            <img src="/assets/image/icon/time.webp" alt="" />-->
  <!--            1시간 전-->
  <!--          </span>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="main-autocamp">-->
  <!--      <div class="autocamp">-->
  <!--        &lt;!&ndash;      <img src="/assets/image/mainutoCamp.webp" alt="">&ndash;&gt;-->
  <!--      </div>-->
  <!--      <div class="autocam-cont">-->
  <!--        <h1>피아골 정운 캠핑장</h1>-->
  <!--        <span>테크 13번 9/27~9/29 양도합니다. 테크 4*4...</span>-->
  <!--        <a href="">-->
  <!--          <img src="/assets/image/icon/locationBlue.webp" alt="" />-->
  <!--          경기도 고양시-->
  <!--        </a>-->
  <!--        <div>-->
  <!--          <h2>995.000원</h2>-->
  <!--          <span>-->
  <!--            <img src="/assets/image/icon/time.webp" alt="" />-->
  <!--            1시간 전-->
  <!--          </span>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="used-market-box">
    <custom-button :customClass="'usedMarketButton'" :placeholder="`USED MARKET >`" @click="goToX('/usedMarket')" />
    <used-contents-component />
  </div>
  <div class="main-bottom">
    <h1>파도소리 들리는 감성 캠핑</h1>
    <h2>한번쯤은 꼭 가볼만한 캠핑장! 추천해요~</h2>
    <div class="bot-camp">
      <img src="/assets/image/mainpageslider1.webp" alt="" />

    </div>

    <div class="bot-camps">
      <!--      <div class="bot-camp-info">-->
      <!--        <img src="/assets/image/mainpageslider1.webp" alt=""/>-->
      <!--        <custom-button :placeholder="추천해요"></custom-button>-->
      <!--        <span>바다와 파도소리, 밤이면 별이 쏟아지는 해변에서 즐기는 감성캠핑. 그곳으로   떠나요~~</span>-->
      <!--      </div>-->

      <div class="bot-camp-info-f">

        <span></span>
      </div>

      <div class="bot-camp-infos-s">
        <span></span>
      </div>
    </div>

    <div class="bot-camp-info=t">
      <span></span>
    </div>

  </div>
  <div id="intro">
    <img src="/assets/image/bus.jpg" alt="intro">
    <div class="shadow"></div>
    <div class="content">
      <img src="/assets/image/logo.png" alt="logo">
      <div>CAMP BEARS</div>
      <div class="title">캠핑의 모든것, Camp Bears에서</div>
      <button @click="introPush()">START HERE</button>
      <div class="footer-area">
        <div @click="introPush('/login')">로그인</div>
        <div @click="introPush('/signup')">회원가입</div>
      </div>
    </div>
  </div>

</template>
