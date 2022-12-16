<script>
import commonUtil from "../../../utils/common-util.js";
import {CONSTANTS} from "../../../constants.js";
import {onMounted, ref} from "vue";
// import { i } from "../../../../dist/assets/index.70e7d3e5.js";

export default {
  name: "userPreferencePopup",
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const userInfo = ref();

    const typeChck = ref({
      fir: "",
      sec: "",
      thr: "",
      foo: "",
      fiv: "",
      six: "",
      sev: "",
      eig: "",
    });

    /**
     * 제출하기
     */
    const setPreferenceValue = () => {
      console.log(result);
    };

    onMounted(() => {
      if (commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)) {
        userInfo.value = JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      }
    });

    return {
      userInfo,

      setPreferenceValue,
    };
  },
};
</script>
<template>
  <div>
    <div class="refer">
      <div>잠시만요! 당신의 취향을 알고 싶어요</div>
      <div>
        간단한 설문을 도와주시면 {{ userInfo ? userInfo.userName : "손" }}님의 취향을 더 잘 알 수 있어요! (1~5까지의
        점수로 알려주세요!)
      </div>
      <span v-for="i in 8">
        <!--        <input type="button" :value="ty">-->
        <img @click="" :src="`/assets/image/prefeRence/${i}.png`" alt=""/>
        <!--        {{ index }}-->
      </span>
    </div>
    <div class="submit">
      <button @click="setPreferenceValue">제출</button>
    </div>
  </div>
</template>
