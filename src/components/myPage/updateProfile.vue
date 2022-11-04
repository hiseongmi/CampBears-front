<script>
import { apiClient } from "../../utils/axios.js";
import { ref } from "vue";
// import { checkForm } from "../../utils/common-util.js";
import customButton from "../layout/customButton.vue";
import customInput from "../layout/customInput.vue";

export default {
  name: "updateProfile",
  components: {
    customButton,
    customInput,
  },
  setup() {
    const input = ref("");
    const input2 = ref("");

    const updateProfile = async () => {
      const userData = ref({
        userName: "",
        userEmail: "",
        userPassword: "",
      });

      // if (checkForm.checkForm(userData)) {
      // 	// 추가해줘 응애

      const data = await apiClient("", userData.value);
      if (!data && data.length < 1) console.log("axios error");
      if (data.data.status === 200) alert("변경 완료!");
      // }
    };

    return {
      updateProfile,
      input,
      input2,
    };
  },
};
</script>

<template>
  <div class="updateProfile">
    <div class="inputBox">
      <span>이름</span>
      <custom-input :placeholder="'베어 물어쓰'" @update:value="input = $event" />
    </div>
    <div class="inputBox">
      <span>이메일</span>
      <custom-input :placeholder="'test@test.com'" @update:value="input2 = $event" />
    </div>
    <div class="inputBox">
      <span>소개</span>
      <custom-input :placeholder="'캠핑을 좋아하는 30대 아저씨에요^^'" @update:value="input2 = $event" />
    </div>
    <div class="profilePictureBox">
      <span>이미지</span>
    </div>
    <div class="buttonBox">
      <custom-button :class="'cancel'" :placeholder="'취소'" :onClick="updateProfile" />
      <custom-button :class="'save'" :placeholder="'저장'" :onClick="updateProfile">
        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.626 0.564941L9.20802 1.98291L13.0166 5.7915L14.4346 4.37353C15.167 3.64111 15.167 2.45459 14.4346 1.72217L13.2803 0.564941C12.5479 -0.16748 11.3613 -0.16748 10.6289 0.564941H10.626ZM8.54591 2.64502L1.71681 9.47705C1.41212 9.78174 1.18946 10.1597 1.06642 10.5728L0.0293074 14.0972C-0.0439347 14.3462 0.0234481 14.6128 0.205089 14.7944C0.386729 14.9761 0.653331 15.0435 0.899425 14.9731L4.42384 13.936C4.83692 13.813 5.21485 13.5903 5.51954 13.2856L12.3545 6.45361L8.54591 2.64502Z"
            fill="white"
          />
        </svg>
      </custom-button>
    </div>
  </div>
</template>
