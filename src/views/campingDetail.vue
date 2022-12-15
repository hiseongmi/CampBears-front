<script>
import { useStore } from "vuex";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import store, { STORE_TYPE } from "../store/index.js";
import router from "../router/index.js";
import commonUtil from "../utils/common-util.js";
import { apiClient } from "../utils/axios.js";
import kakaoMap from "../components/kakaoMap.vue";
import { useRoute } from "vue-router";

export default {
  name: "campingDetail",
  components: { kakaoMap },
  setup() {
    const route = useRoute();
    const campingIdx = ref("");
    // todo 기상청, 카카오지도, 캠핑 세부정보
    const campingInfo = ref([]);

    /**
     * 유저가 조회한 캠핑 로그 수집
     * @param campingIdx 캠핑 고유번호
     * @returns {Promise<void>}
     */

    // console.log(infoAp())

    const insertCampingViewLog = async campingIdx => {
      if (campingIdx) {
        const d = await apiClient("/camping/insertSearchLog", { campingIdx: campingIdx });
        // console.log(d);
      }
    };

    const getCampingData = async () => {
      const c = route.path.split("/")[2];
      campingIdx.value = c;

      const d = await apiClient("/camping/getCampingList", { campingIdx: c });
      // console.log(d);
      if (d.data) {
        campingInfo.value = d.data[0];
      }
    };

    onMounted(() => {
      // todo 주석 살리면됨
      getCampingData();
      // if (campInfo && campInfo.campingIdx) {
      //   insertCampingViewLog(campInfo.campingIdx);
      // }
    });

    return {
      campingInfo,
      campingIdx,
    };
  },
};
</script>
<template>
  <section class="detail-camping" v-if="campingInfo">
    <h1 class="det-title">멋진 여행을 기대하고 계신가요?</h1>
    <kakaoMap />

    <!--todo    지도-->

    <!--    <div id="map" style="width: 55%; height: 350px; margin: 0 auto; z-index: 0"></div>-->

    <img :src="campingInfo ? campingInfo.thumbnailUrl : 'assets/image/backgroundImg.webp'" alt="main" />
    <div class="name">{{ campingInfo.campingName }}</div>
    <div class="des">{{ campingInfo.campingIntro }}</div>
    <div class="camp-type">
      <span>
        {{ campingInfo.campingManageMode }}
      </span>
    </div>
    <div>캠핑 타입 :{{ campingInfo.campingTypes }}</div>
    <div>주소 : {{ campingInfo.address }}</div>
    <div>전화번호 : {{ campingInfo.tel }}</div>
    <div>생성일 : {{ campingInfo.createdDate }}</div>
  </section>
</template>
