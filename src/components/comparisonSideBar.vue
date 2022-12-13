<script>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";
import router from "../router/index.js";
import store, { STORE_TYPE } from "../store/index.js";

export default {
  name: "comparisonSideBar",
  setup() {
    const userData = ref({
      file: {},
    });
    const profileImg = ref("assets/image/profileImg.webp");
    const isActive = ref(false);

    const goToX = target => {
      closePopup();
      router.push(target);
    };
    const closePopup = () => {
      store.commit(STORE_TYPE.comparisonSideBar, false);
      store.commit(STORE_TYPE.targetOne, "");
      store.commit(STORE_TYPE.targetTwo, "");
    };
    const targetOneClose = () => {
      store.commit(STORE_TYPE.targetOne, "");
      targetOneData.value = [];
    };

    const getProfileImg = file => {
      try {
        return commonUtil.getImgUrl(file.fileName);
      } catch (e) {
        return "/assets/image/profileImg.webp";
      }
    };
    const targetOneData = ref([]);
    const targetTwoData = ref([]);

    onMounted(() => {
      setTimeout(() => {
        isActive.value = true;
      }, 10);
      targetOneData.value = Object.assign({}, targetOneData.value, store.state.targetOne);
    });

    onUnmounted(() => {
    });

    watch(
      () => store.state.targetTwo,
      () => {
        if (store.state.targetOne === store.state.targetTwo) {
          console.log("같은곳임.");
        } else {
          targetTwoData.value = Object.assign({}, targetTwoData.value, store.state.targetTwo);
        }
      },
    );

    return {
      userData,
      profileImg,
      isActive,
      targetOneData,
      targetTwoData,
      store,
      targetOneClose,
      goToX,
      closePopup,
      getProfileImg,
    };
  },
};
</script>
<template>
  <Transition>
    <div class="comparison-side-bar" @click="closePopup">
      <div class="comparison-side-bar-body" :class="{ active: isActive }" @click.prevent.stop="">
        <i @click="closePopup" class="fa-solid fa-xmark"></i>
        <div class="comparison-side-bar-body-wrap">
          <div class="targetOne">
            <div class="targetOne-title">
              내가 고른 캠핑장
              <!--              <span @click="targetOneClose">x</span>-->
            </div>
            <div class="targetOne-image">
              <img :src="targetOneData.thumbNailUrl ? targetOneData.thumbNailUrl : 'assets/image/backgroundImg.webp'"
                   alt="" />
            </div>
            <div class="targetOne-list">
              <span
                class="targetOne-list-mode"> {{ targetOneData.campingManageMode ? targetOneData.campingManageMode : "x"
                }}</span>
              <span class="targetOne-list-name">{{ targetOneData.campingName ? targetOneData.campingName : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span class="targetOne-list-intro">{{ targetOneData.campingIntro ? targetOneData.campingIntro : "x"
                }}</span>
            </div>
            <div class="targetOne-list">
              <span>{{ targetOneData.campingTypes ? targetOneData.campingTypes : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-location-dot"></i></span>
              <span> {{ targetOneData.address ? targetOneData.address : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-phone"></i> {{ targetOneData.tel ? targetOneData.tel : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-campground"></i></span>
              <span> {{ targetOneData.campInnerOption ? targetOneData.campInnerOption : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span> <i class="fa-solid fa-table-tennis-paddle-ball"></i></span>
              <span> {{ targetOneData.campOuterOption ? targetOneData.campOuterOption : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-dog"></i> {{ targetOneData.getInAnimal ? targetOneData.getInAnimal : "x"
                }}</span>
            </div>
            <div class="targetOne-list">
              <a :href="targetOneData.homePageUrl">{{ targetOneData.homePageUrl ? "홈페이지 바로가기" : "x" }}</a>
            </div>
            <div class="targetOne-list">
              <span>설립날짜 : {{ targetOneData.createdDate ? targetOneData.createdDate : "x" }}</span>
            </div>
          </div>
          <div v-if="store.state.targetTwo === '' " class="targetOne" :style="{'border-right' : 'none'}">
            <div class="targetOne-title">
              비교대상
            </div>
          </div>
          <div v-else class="targetOne" :style="{'border-right' : 'none'}">
            <div class="targetOne-title">
              비교대상
            </div>
            <div class="targetOne-image">
              <img :src="targetTwoData.thumbNailUrl ? targetTwoData.thumbNailUrl : 'assets/image/backgroundImg.webp'"
                   alt="" />

            </div>
            <div class="targetOne-list">
              <span
                class="targetOne-list-mode"> {{ targetTwoData.campingManageMode ? targetTwoData.campingManageMode : "x"
                }}</span>
              <span class="targetOne-list-name">{{ targetTwoData.campingName ? targetTwoData.campingName : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span class="targetOne-list-intro">{{ targetTwoData.campingIntro ? targetTwoData.campingIntro : "x"
                }}</span>
            </div>
            <div class="targetOne-list">
              <span>{{ targetTwoData.campingTypes ? targetTwoData.campingTypes : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-location-dot"></i></span>
              <span> {{ targetTwoData.address ? targetTwoData.address : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-phone"></i> {{ targetTwoData.tel ? targetTwoData.tel : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-campground"></i></span>
              <span> {{ targetTwoData.campInnerOption ? targetTwoData.campInnerOption : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span> <i class="fa-solid fa-table-tennis-paddle-ball"></i></span>
              <span> {{ targetTwoData.campOuterOption ? targetTwoData.campOuterOption : "x" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-dog"></i> {{ targetTwoData.getInAnimal ? targetTwoData.getInAnimal : "x"
                }}</span>
            </div>
            <div class="targetOne-list">
              <a :href="targetTwoData.homePageUrl">{{ targetTwoData.homePageUrl ? "홈페이지 바로가기" : "x" }}</a>
            </div>
            <div class="targetOne-list">
              <span>설립날짜 : {{ targetTwoData.createdDate ? targetTwoData.createdDate : "x" }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>