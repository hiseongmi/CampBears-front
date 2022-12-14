<script>
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import {useStore} from "vuex";
import store from "../../../store/index.js";
import commonUtil from "../../../utils/common-util.js";

export default {
  name: "detailCampingInfo",
  props: {
    clickClose: {
      type: Function,
      required: true
    }
  },
  setup() {
    const campInfo = ref(undefined);
    const store = useStore();

    const targetOneData = ref([]);


    const getProfileImg = file => {
      try {
        return commonUtil.getImgUrl(file.fileName);
      } catch (e) {
        return "/assets/image/profileImg.webp";
      }
    };


    onMounted(() => {
      if (store.state.campInfo)
        campInfo.value = store.state.campInfo;
      targetOneData.value = Object.assign({}, targetOneData.value, store.state.targetOne);
    });
    onMounted(() => {
      // getCampInfo();
    })
    return {
      campInfo,
      targetOneData,
      getProfileImg,
    };
  }
};
</script>
<template>
  <section class="detail-camping">
    <img :src="targetOneData.thumbNailUrl ? targetOneData.thumbNailUrl : 'assets/image/backgroundImg.webp'" alt="main">
    <div class="name">{{ targetOneData.campingName }}</div>
    <div class="des">{{ targetOneData.campingIntro }}</div>
    <div class="camp-type">
          <span>
          {{ targetOneData.campingManageMode }}
        </span>
    </div>
    <div>캠핑 타입 :{{ targetOneData.campingTypes }}</div>
    <div>주소 : {{ targetOneData.address }}</div>
    <div>전화번호 : {{ targetOneData.tel }}</div>
    <div>생성일 : {{ targetOneData.createdDate }}</div>
  </section>
</template>
