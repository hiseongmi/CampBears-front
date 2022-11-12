<script>
import { apiClient } from "../../utils/axios.js";
import { onMounted, ref } from "vue";
import customButton from "../layout/customButton.vue";
import customInput from "../layout/customInput.vue";
import commonUtil from "../../utils/common-util.js";
import { CONSTANTS } from "../../constants.js";

export default {
  name: "updateProfile",
  components: {
    customButton,
    customInput,
  },
  setup() {
    const profileInfo = ref({
      userAddress: "",
      userEmail: "",
      userName: "",
      userNickName: "",
      userDescription: "",
      userPassword: "",
      userPhone: "",
    }); // 소개에 띄워줄 내용

    onMounted(() => {
      profileInfo.value = commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
    });

    const updateProfile = async () => {
      const data = await apiClient("user/update", profileInfo.value);
      if (data) {
        alert("변경 완료!");
        location.reload();
      }
    };

    return {
      updateProfile,
      profileInfo,
    };
  },
};
</script>

<template>
  <div class="updateProfile">
    <div class="inputBox">
      <span>닉네임</span>
      <custom-input :placeholder="profileInfo.userNickName" @update:value="profileInfo.userNickName = $event" />
    </div>
    <div class="inputBox">
      <span>소개</span>
      <custom-input :placeholder="profileInfo.userDescription" @update:value="profileInfo.userDescription = $event" />
    </div>
    <custom-button :class="'save'" :placeholder="'저장'" :onClick="updateProfile">
      <img src="/assets/image/icon/pen.png" alt="" />
    </custom-button>

    <div class="inputBox">
      <span>이름</span>
      <div class="fixedInfo">{{ profileInfo.userName }}</div>
    </div>
    <div class="inputBox">
      <span>이메일</span>
      <div class="fixedInfo">{{ profileInfo.userEmail }}</div>
    </div>
    <div class="inputBox">
      <span>주소</span>
      <div class="fixedInfo">{{ profileInfo.userAddress }}</div>
    </div>
    <div class="inputBox">
      <span>연락처</span>
      <div class="fixedInfo">{{ profileInfo.userPhone }}</div>
    </div>
  </div>
</template>
