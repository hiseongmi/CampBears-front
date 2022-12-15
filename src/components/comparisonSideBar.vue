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
    //1번 항복 삭제 버튼

    const closePopup = () => {
      store.commit(STORE_TYPE.comparisonSideBar, false);
      store.commit(STORE_TYPE.targetOne, "");
      store.commit(STORE_TYPE.targetTwo, "");
    };
    const targetOneClose = () => {
      store.commit(STORE_TYPE.targetOne, "");
      targetOneData.value = [];
    };
    const targetTwoClose = () => {
      store.commit(STORE_TYPE.targetTwo, "");
      targetTwoData.value = [];
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
      // console.log(targetOneData.thumbNailUrl)
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
          // window.alert("같은곳을 누르신거같아요")
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
      targetTwoClose,
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
              <!--              <button @click="targetOneClose">기준슬롯삭제</button>-->
              내가 고른 캠핑장
              <!--              <span @click="targetOneClose">x</span>-->
            </div>
            <div class="targetOne-image">
              <img :src="targetOneData.thumbNailUrl ? targetOneData.thumbNailUrl : 'assets/image/backgroundImg.webp'"
                   alt="" />
            </div>
            <div class="targetOne-list">
              <span
                class="targetOne-list-mode"> {{
                  targetOneData.campingManageMode ? targetOneData.campingManageMode : "x"
                }}</span>
              <span class="targetOne-list-name">{{
                  targetOneData.campingName ? targetOneData.campingName : "정보가 없어요ㅠ"
                }}</span>
            </div>
            <div class="targetOne-list">
              <span class="targetOne-list-intro">{{
                  targetOneData.campingIntro ? targetOneData.campingIntro : "캠핑장 소개글이 없어요"
                }}</span>
            </div>
            <div class="targetOne-list">
              <span>{{ targetOneData.campingTypes ? targetOneData.campingTypes : "정보가 없어요ㅠ" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-location-dot"></i></span>
              <span> {{ targetOneData.address ? targetOneData.address : "주소가없어요" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-phone"></i> {{ targetOneData.tel ? targetOneData.tel : "번호가 없어요" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-campground"></i></span>
              <span> {{ targetOneData.campInnerOption ? targetOneData.campInnerOption : "내부시설 정보가없어요" }}</span>
            </div>
            <div class="targetOne-list">
              <span> <i class="fa-solid fa-table-tennis-paddle-ball"></i></span>
              <span> {{ targetOneData.campOuterOption ? targetOneData.campOuterOption : "외부시설 정보가 없어요" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-dog"></i>
                  {{ targetOneData.getInAnimal ? targetOneData.getInAnimal : "정보가 없어요ㅠ" }}
                </span>
            </div>
            <div class="targetOne-list">
              <a :href="targetOneData.homePageUrl">{{
                  targetOneData.homePageUrl ? "홈페이지 바로가기 " : "홈페이지가 없는 캠핑장이에요"
                }}</a>
            </div>
            <div class="targetOne-list">
              <span>설립날짜 : {{ targetOneData.createdDate ? targetOneData.createdDate : "x" }}</span>
            </div>
          </div>

          <!--          //-->


          <div v-if="store.state.targetTwo === '' " class="targetOne" :style="{'border-right' : 'none'}">
            <div class="targetOne-title">
              <!--              <button @click="targetTwoClose">비교슬롯삭제</button>-->
              비교대상
            </div>
          </div>
          <div v-else class="targetOne" :style="{'border-right' : 'none'}">
            <div class="targetOne-title">
              <!--              <button @click="targetTwoClose">비교슬롯삭제</button>-->
              비교대상
            </div>
            <div class="targetOne-image">
              <img :src="targetTwoData.thumbNailUrl ? targetTwoData.thumbNailUrl : 'assets/image/backgroundImg.webp'"
                   alt="" />
            </div>
            <div class="targetOne-list">
              <span
                class="targetOne-list-mode"> {{
                  targetTwoData.campingManageMode ? targetTwoData.campingManageMode : "x"
                }}</span>
              <span class="targetOne-list-name">{{
                  targetTwoData.campingName ? targetTwoData.campingName : "정보가 없어요ㅠ"
                }}</span>
            </div>
            <div class="targetOne-list">
              <span class="targetOne-list-intro">{{
                  targetTwoData.campingIntro ? targetTwoData.campingIntro : "캠핑장 소개글이 없어요"
                }}</span>
            </div>
            <div class="targetOne-list">
              <span>{{ targetTwoData.campingTypes ? targetTwoData.campingTypes : "정보가 없어요ㅠ" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-location-dot"></i></span>
              <span> {{ targetTwoData.address ? targetTwoData.address : "주소가없어요" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-phone"></i> {{ targetTwoData.tel ? targetTwoData.tel : "번호가 없어요" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-campground"></i></span>
              <span> {{ targetTwoData.campInnerOption ? targetTwoData.campInnerOption : "내부시설 정보가없어요" }}</span>
            </div>
            <div class="targetOne-list">
              <span> <i class="fa-solid fa-table-tennis-paddle-ball"></i></span>
              <span> {{ targetTwoData.campOuterOption ? targetTwoData.campOuterOption : "외부시설 정보가 없어요" }}</span>
            </div>
            <div class="targetOne-list">
              <span><i class="fa-solid fa-dog"></i>
                  {{ targetTwoData.getInAnimal ? targetTwoData.getInAnimal : "정보가 없어요ㅠ" }}
                </span>
            </div>
            <div class="targetOne-list">
              <a :href="targetTwoData.homePageUrl">{{ targetTwoData.homePageUrl ? "홈페이지 바로가기" : "홈페이지가 없는 캠핑장이에요" }}</a>
            </div>
            <div class="targetOne-list">
              <span>설립날짜 : {{ targetTwoData.createdDate ? targetTwoData.createdDate : "정보가 없어요ㅠ" }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>