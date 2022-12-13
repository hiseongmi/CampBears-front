<script>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";
import router from "../router/index.js";
import store, { STORE_TYPE } from "../store/index.js";

export default {
  name: "comparisonSideBar",
  setup() {
    const flag = ref(false);
    const userData = ref({
      file: {},
    });
    const profileImg = ref("assets/image/profileImg.webp");
    const isActive = ref(false);

    const goToX = target => {
      closePopup();
      router.push(target);
    };
    const closePopup = () => {
      store.commit(STORE_TYPE.comparisonSideBar, false);
      store.commit(STORE_TYPE.targetOne, "");
      store.commit(STORE_TYPE.targetTwo, "");

    };

    const getProfileImg = file => {
      try {
        return commonUtil.getImgUrl(file.fileName);
      } catch (e) {
        return "/assets/image/profileImg.webp";
      }
    };
    const targetOneData = ref([]);
    const targetTwoData = ref([]);

    onMounted(() => {
      flag.value = store.state.sideBar;
      setTimeout(() => {
        isActive.value = true;
      }, 10);
      targetOneData.value = store.state.targetOne;
      targetTwoData.value = store.state.targetTwo;
    });

    onUnmounted(() => {
    });

    watch(
      () => store.state.targetTwo,
      () => {
        targetTwoData.value = store.state.targetTwo;
        // console.log(flag.value);
        // flag.value = store.state.comparisonSideBar;
      },
    );

    return {
      userData,
      profileImg,
      isActive,
      targetOneData,
      targetTwoData,
      goToX,
      closePopup,
      getProfileImg,
    };
  },
};
</script>
<template>
  <Transition>
    <div class="comparison-side-bar" @click="closePopup">
      <div class="comparison-side-bar-body" :class="{ active: isActive }" @click.prevent.stop="">
        <i @click="closePopup" class="fa-solid fa-xmark"></i>
        <div class="comparison-side-bar-body-wrap">
          <div class="targetOne">
            <div v-for="item in targetOneData">
              {{ item }}
            </div>
          </div>
          <div class=" targetTwo">
            <div v-for="i in targetTwoData">
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>