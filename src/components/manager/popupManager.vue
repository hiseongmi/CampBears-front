<script>
import store, { getStore, STORE_TYPE, POPUP_TYPE } from "../../store/index.js";
import { onMounted, ref, watch } from "vue";
import writeBoardPopup from "./popups/writeBoardPopup.vue";
import DetailScreenPopup from "./popups/detailScreenPopup.vue";
import ReportPopup from "./popups/reportPopup.vue";
import UpdateBoardPopup from "./popups/updateBoardPopup.vue";

export default {
  name: "popupManager",
  components: { UpdateBoardPopup, ReportPopup, DetailScreenPopup, writeBoardPopup },
  setup() {
    const store = getStore();
    const isPopup = ref(store.state.popupType);
    const PopupList = ref(store.state.popupList);
    const clickClose = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE);
    };
    const goDetail = () => { //취소 누르면 디테일 창 뜨게
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
    };
    watch(() => store.state.popupType, () => {
      isPopup.value = store.state.popupType;
      PopupList.value.push(store.state.popupList);
    });

    return {
      PopupList,
      store,
      isPopup,
      POPUP_TYPE,
      clickClose,
      goDetail,
    };
  },
};
</script>
<template>
  <div class="popup-manager">
    <div class="black" @click.prevent.stop="clickClose()"></div>
    <writeBoardPopup v-if="isPopup === POPUP_TYPE.WRITE_BOARD" :clickClose="clickClose"></writeBoardPopup>
    <detail-screen-popup v-if="isPopup === POPUP_TYPE.DETAIL_SCREEN" :click-close="clickClose"></detail-screen-popup>
    <!--    <report-popup v-if="isPopup === POPUP_TYPE.REPORT " :click-close="clickClose" :go-detail="goDetail"></report-popup>-->
    <UpdateBoardPopup v-if="isPopup === POPUP_TYPE.UPDATE " :click-close="clickClose"
                      :go-detail="goDetail"></UpdateBoardPopup>
  </div>
</template>