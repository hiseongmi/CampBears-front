<script>
import CustomButton from "../components/layout/customButton.vue";
import { ref } from "vue";
import UsedContentsComponent from "../components/usedMarket/usedContentsComponent.vue";
import customPagination from "../components/layout/customPagination.vue";

export default {
  name: "usedMarket",
  components: { customPagination, UsedContentsComponent, CustomButton },
  setup() {
    const tabType = {
      SELL: "sell",
      BUY: "buy",
    }; // 컴포넌트 이름

    const tabIndex = ref(tabType.SELL);

    const componentChange = v => {
      //console.log(v);
      tabIndex.value = v;
    };

    return {
      tabType,
      tabIndex,
      componentChange,
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
        <img src="/assets/image/icon/dropMenu.png" alt="" />
      </div>
      <custom-button :placeholder="'글쓰기'" />
    </div>
    <div class="used-contents-area">
      <used-contents-component />
      <custom-pagination />
    </div>
  </div>
</template>
