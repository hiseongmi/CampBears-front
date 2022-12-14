<script>
import commonUtil from "../../../utils/common-util.js";
import { CONSTANTS } from "../../../constants.js";
import { ref } from "vue";

export default {
  name: "userPreferencePopup",
  props: {
    clickClose: {
      type: Function,
      required: true
    }
  },
  setup() {
    const userInfo = ref(JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)));
    const questionList = [
      { id: "one", q: "1. 밖에서 하는 캠핑을 선호하나요?", answer: undefined },
      { id: "two", q: "2. 주위에 놀거리가 많은 캠핑장을 선호하나요?", answer: undefined },
      { id: "three", q: "3. 캠핑 시설이 많은 곳을 선호하나요?", answer: undefined },
      { id: "four", q: "4. 조용한 곳을 선호하나요?", answer: undefined },
      { id: "five", q: "5. 불멍을 할 수 있는곳을 선호하나요?", answer: undefined },
      { id: "six", q: "6. 선호하는 이동시간을 골라주세요!", answer: undefined }
    ];

    const setPreferenceValue = () => {
      const result = [];
      questionList.map(v => {
        result.push({ id: v.id, value: v.answer });
      });
      console.log(result);
    };


    return {
      userInfo,
      questionList,
      setPreferenceValue
    };
  }
};
</script>
<template>
  <div>

    <div>
      잠시만요! 당신의 취향을 알고 싶어요
    </div>
    <div>간단한 설문을 도와주시면 {{ userInfo.userName }}님의 취향을 더 잘 알 수 있어요!</div>
    <div v-for="item in questionList">
      <div>{{ item.q }}</div>
      <div>
        <span v-for="index in 5">
        <input type="radio" :name="item.id" :value="index" v-model="item.answer">
        {{ index }}
        </span>
      </div>
    </div>
    <input type="button" @click="setPreferenceValue">
  </div>

</template>
