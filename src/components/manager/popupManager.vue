<script>
import {getStore, STORE_TYPE, POPUP_TYPE} from "../../store/index.js";
import {ref, watch} from "vue";
import writeBoardPopup from "./popups/writeBoardPopup.vue";
import DetailScreenPopup from "./popups/detailScreenPopup.vue";

export default {
  name: "popupManager",
  components: {DetailScreenPopup, writeBoardPopup},
  setup() {
    const store = getStore()
    const isPopup = ref(store.state.popupType)
    const clickClose = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE)
    }
    watch(() => store.state.popupType, () => {
      isPopup.value = store.state.popupType
    })

    return {
      store,
      isPopup,
      POPUP_TYPE,
      clickClose
    }
  }
}
</script>
<template>
  <div class="popup-manager">
    <div class="black" @click.prevent.stop="clickClose()"></div>
    <writeBoardPopup v-if="isPopup === POPUP_TYPE.WRITE_BOARD" :clickClose="clickClose"></writeBoardPopup>
    <detail-screen-popup v-if="isPopup === POPUP_TYPE.DETAIL_SCREEN" :click-close="clickClose"></detail-screen-popup>
  </div>
</template>