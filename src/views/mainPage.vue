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
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";

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
    Buss,
  },
  setup() {
    let coor = { y: 0 };
    const intro = ref(undefined);
    let introAni = undefined;
    const showIntro = ref(true);

    const notToday = () => {
      const t = new Date().getTime();
      commonUtil.setLocalStorage(CONSTANTS.KEY_LIST.SHOW_INTRO, t.toString());
      introPush();
    };

    const startAnimation = v => {
      console.log("startAni");
      introAni = new Tween(coor)
        .to({ y: 100 }, 1000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
          intro.value.style.setProperty("transform", `translateY(-${coor.y}%)`);
          intro.value.style.setProperty("opacity", `${100 / coor.y - 1}`);
        })
        .onComplete(() => {
          console.log("complete");
          if (v) router.push(v);
        })
        .start();

      const animation = time => {
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

    const checkTime = () => {
      const k = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.SHOW_INTRO);
      if (k) {
        showIntro.value = false;
        const now = new Date().getTime();
        const time = now - k;
        if (Number(time) >= 86400000) {
          showIntro.value = true;
        } else {
          showIntro.value = false;
        }
      } else {
        showIntro.value = true;
      }
    };

    onMounted(() => {
      intro.value = document.getElementById("intro");
      checkTime();
    });
    $(document).on("scroll", function () {
      var pixels = $(document).scrollTop();
      var pageHeight = $(document).height() - $(window).height();
      var progress = (100 * pixels) / pageHeight;
      var toFixed = progress.toFixed(0);

      $("div.progress").css("width", progress + "%");
      $("div.progressText").html(toFixed + "%");
    });
    return {
      goToX,
      introPush,
      notToday,
      showIntro,
    };
  },
};
</script>
<template>
  <div class="progress"></div>
  <section class="main">
    <!--  <Buss />-->
    <div class="main-box">
      <div class="main-fir mb-hide">
        <img src="/assets/image/mainpage2.webp" alt="" />
        <div class="black"></div>
        <div class="main-add">
          <div>감성있는 캠핑장을 찾고있나요?</div>
          <button @click="goToX('/infoPage')">캠핑장 양도 받기/찾기</button>
        </div>
      </div>
      <div class="main-fir full">
        <img src="/assets/image/mainpage3.webp" alt="" />
        <div class="black"></div>
        <div class="main-add">
          <div>저렴한 캠핑용품이 필요하신가요?</div>
          <button @click="goToX('/usedMarket')">캠핑용품 중고거래</button>
        </div>
      </div>
    </div>

    <div class="main-icon">
      <a href="">
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
    <button class="view-all" @click="goToX('/snsPage')">더보기</button>

    <div class="add-banner">
      <img src="/assets/image/mainpage4.webp" alt="" />
      <div class="add-ment">
        <div>#입술 끝에 맺혀있는 말</div>
        <div>#너만 보면 하고 싶은 말</div>
        <div>#너무 소중해 아껴두려고 참고 또 참는 말</div>
        <button>상품 보러가기</button>
      </div>
    </div>
    <div class="used-market-box">
      <custom-button :customClass="'usedMarketButton'" :placeholder="`USED MARKET >`" @click="goToX('/usedMarket')" />
      <used-contents-component />
    </div>
    <div class="main-bottom">
      <h1>파도소리 들리는 감성 캠핑</h1>
      <h2>한번쯤은 꼭 가볼만한 캠핑장! 추천해요~</h2>
      <div class="bot">
        <info-page></info-page>
      </div>
    </div>
    <div id="intro" v-if="showIntro">
      <img src="/assets/image/bus.jpg" alt="intro" />
      <div class="shadow"></div>
      <div class="content">
        <img src="/assets/image/logo.png" alt="logo" />
        <div>CAMP BEARS</div>
        <div class="title">캠핑의 모든것, Camp Bears에서</div>
        <button @click="introPush()">START HERE</button>
        <div class="footer-area">
          <div @click="introPush('/login')">로그인</div>
          <div @click="introPush('/signup')">회원가입</div>
        </div>
        <div class="off" @click="notToday">오늘 하루 안보기</div>
      </div>
    </div>
  </section>
</template>
