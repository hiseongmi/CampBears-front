<script>
import CustomButton from "../components/layout/customButton.vue";
import {onMounted, ref} from "vue";
import sellComponent from "../components/usedMarket/sellComponent.vue";
import buyComponent from "../components/usedMarket/buyComponent.vue";
import chat from "../components/chat.vue";
import store, {POPUP_TYPE, STORE_TYPE} from "../store/index.js";
import commonUtil from "../utils/common-util.js";
import {CONSTANTS} from "../constants.js";

export default {
  name: "usedMarket",
  components: {sellComponent, buyComponent, CustomButton, chat},
  setup() {
    const loginUser = ref(undefined);
    const tabType = {
      SELL: "sell",
      BUY: "buy",
    }; // 컴포넌트 이름

    const tabIndex = ref(tabType.SELL);

    const componentChange = v => {
      tabIndex.value = v;
    };
    const allScroll = document.querySelector("html")
    const openWrite = () => {
      allScroll.style.overflow = "hidden";
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.PRODUCT_WRITE);

    }; //글쓰기 팝업열기

    onMounted(() => {
      const d = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
      if (d)
        loginUser.value = JSON.parse(d);

    });

    return {
      loginUser,
      tabType,
      tabIndex,
      componentChange,
      openWrite,
    };
  },
};
</script>

<template>
  <div class="used-market">
    <div class="used-title">
      <span>USED MARKET</span>
      <div class="used-component-change">
        <custom-button
            :placeholder="'팝니다'"
            :onClick="() => componentChange(tabType.SELL)"
            :custom-class="tabIndex === tabType.SELL ? 'active' : ''"
        />
        <custom-button
            :placeholder="'삽니다'"
            :onClick="() => componentChange(tabType.BUY)"
            :custom-class="tabIndex === tabType.BUY ? 'active' : ''"
        />
      </div>
    </div>
    <div class="used-banner">
      <div class="used-banner-popup" @click="">
        <img src="/assets/image/icon/dropMenu.webp" alt=""/>
      </div>
      <custom-button :placeholder="'글쓰기'" @click="openWrite()"/>
    </div>
    <div class="used-contents-area">
      <sell-component v-if="tabIndex === tabType.SELL"/>
      <buy-component v-else-if="tabIndex === tabType.BUY"/>
    </div>
  </div>
  <chat v-if="loginUser"></chat>
</template>
