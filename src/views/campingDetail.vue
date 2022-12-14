<script>
import { useStore } from "vuex";
import { onMounted } from "vue";

export default {
  name: "campingDetail",
  setup() {
    const store = useStore();
    //todo 기상청, 카카오지도, 캠핑 세부정보


    /**
     * 유저가 조회한 캠핑 로그 수집
     * @param campingIdx 캠핑 고유번호
     * @returns {Promise<void>}
     */
    const insertCampingViewLog = async (campingIdx) => {
      if (campingIdx) {
        const d = await apiClient("/camping/insertSearchLog", { campingIdx: campingIdx });
        console.log(d);
      }
    };

    onMounted(() => {
      //todo 주석 살리면됨
      // if (campInfo && campInfo.campingIdx) {
      //   insertCampingViewLog(campInfo.campingIdx);
      // }
    });


    return {};
  }
};
</script>
<template>
  <div>
    ㅇㅣ거슨 캠핑 디테일!!
  </div>
</template>
