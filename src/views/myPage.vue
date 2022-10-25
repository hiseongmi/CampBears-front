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
    customInput,
  },
  setup() {
    let cc = ref(0);
    const componentChange = page => {
      console.log(page);
    };
    return {
      cc,
      componentChange,
    };
  },
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
        <custom-button :placeholder="'피드'" :onClick="componentChange(1)" />
        <custom-button :placeholder="'판매'" :onClick="componentChange(2)" />
        <custom-button :placeholder="'대여'" :onClick="componentChange(3)" />
        <custom-button :placeholder="'저장'" :onClick="componentChange(4)" />
        <custom-button :placeholder="'후기'" :onClick="componentChange(5)" />
      </div>
      <div v-if="cc === 1" class="myFeed">
        <news-content-page />
      </div>
      <custom-input v-else-if="cc === 5"></custom-input>
    </div>
  </div>
</template>
