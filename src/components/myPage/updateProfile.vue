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
        <img src="/assets/image/icon/pen.png" alt="" />
      </custom-button>
    </div>
  </div>
</template>
