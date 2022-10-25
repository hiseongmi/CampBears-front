<script>
import customButton from "../components/layout/customButton.vue";
import customInput from "../components/layout/customInput.vue";
import { ref } from "vue";
import NewsContentPage from "../components/snsBoard/snsContentPage.vue";

export default {
  name: "myPage",
  components: {
    NewsContentPage,
    customButton,
    customInput
  },
  setup() {
    const tabType = {
      FEED: "feed",
      SELL: "sell",
      RENT: "rent",
      SAVE: "save",
      REVIEW: "review"
    };
    const tabIndex = ref(tabType.FEED);

    const componentChange = (v) => {
      console.log(v);
      tabIndex.value = v;
    };
    return {
      tabIndex,
      tabType,
      componentChange
    };
  }
};
</script>

<template>
  <div class="myPage">
    <div class="myProfile">
      <img class="backgroundPicture" src="/assets/image/camping.png" alt="" />
      <img class="profilePicture" src="/assets/image/bgs.png" alt="" />
    </div>
    <div class="myContents">
      <div class="tapBar">
        <custom-button :placeholder="'피드'" :onClick="()=>componentChange(tabType.FEED)" />
        <custom-button :placeholder="'판매'" :onClick="()=>componentChange(tabType.SELL)" />
        <custom-button :placeholder="'대여'" :onClick="()=>componentChange(tabType.RENT)" />
        <custom-button :placeholder="'저장'" :onClick="()=>componentChange(tabType.SAVE)" />
        <custom-button :placeholder="'후기'" :onClick="()=>componentChange(tabType.REVIEW)" />
      </div>
      <div class="content-area">
        <news-content-page v-if="tabIndex === tabType.FEED" />
        <div v-else-if="tabIndex === tabType.SELL">'판매'</div>
        <div v-else-if="tabIndex === tabType.RENT">'대여'</div>
        <div v-else-if="tabIndex === tabType.SAVE">'저장'</div>
        <custom-input v-else="tabIndex === tabType.REVIEW"></custom-input>
      </div>
    </div>
  </div>
</template>
