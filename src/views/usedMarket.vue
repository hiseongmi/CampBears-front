<script>
import CustomButton from "../components/layout/customButton.vue";
import { ref } from "vue";
import UsedContentsComponent from "../components/usedMarket/usedContentsComponent.vue";

export default {
  name: "usedMarket",
  components: { UsedContentsComponent, CustomButton },
  setup() {
    const tabType = {
      SELL: "sell",
      BUY: "buy",
    }; // 컴포넌트 이름

    const tabIndex = ref(tabType.SELL);

    const componentChange = v => {
      console.log(v);
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
        <svg width="18" height="18" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1.5" y1="1.5" x2="21.5" y2="1.5" stroke="black" stroke-width="3" stroke-linecap="round" />
          <line x1="1.5" y1="9.16602" x2="21.5" y2="9.16602" stroke="black" stroke-width="3" stroke-linecap="round" />
          <line x1="1.5" y1="16.834" x2="21.5" y2="16.834" stroke="black" stroke-width="3" stroke-linecap="round" />
        </svg>
      </div>
      <custom-button :placeholder="'글쓰기'" />
    </div>
    <used-contents-component />
  </div>
</template>
