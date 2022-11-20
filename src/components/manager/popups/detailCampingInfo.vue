<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

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
    onMounted(() => {
      if (store.state.campInfo)
        campInfo.value = store.state.campInfo;
    });
    return {
      campInfo
    };
  }
};
</script>
<template>
  <section class="detail-camping">
    <img :src="campInfo.thumbNailUrl" alt="main">
    <div class="name">{{ campInfo.campingName }}</div>
    <div class="des">{{ campInfo.campingIntro }}</div>
    <div class="camp-type">
          <span>
          {{ campInfo.campingManageMode }}
        </span>
    </div>
    <div>캠핑 타입 :{{ campInfo.campingTypes }}</div>
    <div>주소 : {{ campInfo.address }}</div>
    <div>전화번호 : {{ campInfo.tel }}</div>
    <div>생성일 : {{ campInfo.createdDate }}</div>
  </section>
</template>
