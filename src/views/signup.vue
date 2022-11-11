<script>
import CustomLoading from "../components/layout/customLoading.vue";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import signupPage from "../components/login/signupPage.vue";
import { onMounted, ref } from "vue";
import { apiClient } from "../utils/axios.js";

export default {
  name: "signup",
  components: {
    CustomLoading,
    customInput,
    customButton,
  },
  setup() {
    const joinUserData = ref({
      userName: "",
      userEmail: "",
      userType: "",
      userPassword: "",
      userPassCheck: "",
      userAddress: "",
      userPhone: "",
      userNickName: "",
      stateTerms: "Y",
      dateTerms: new Date(),
      stateMarketing: "Y",
    });
    const typeSearchData = ref({
      type: "USER_TYPE",
    });
    const typeData = ref();
    const typeSearch = async () => {
      const data = await apiClient("/common/getTypeList", typeSearchData.value);
      //console.log(data.data) //태그 장소 검색 글 데이터
      typeData.value = data.data;
      if (typeData.value) {
        joinUserData.value.userType = typeData.value[0].column;
        //console.log(joinUserData.value)
      }
      // contentData.value = data.data
      //search 이벤트를 날림
    };
    /**이메일 유효성검사함수*/
    const checkForm = e => {
      const reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const passCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

      if (joinUserData.value.userName === "") {
        alert("이름을 입력해주세여");
        //console.log(joinUserData.value.userName)
        return false;
      }
      if (reg.test(joinUserData.value.userEmail) === false) {
        alert("이메일 형식이 올바르지 않아요");

        return false;
      }
      if (!passCheck.test(joinUserData.value.userPassword)) {
        alert("비밀번호는 영문자 + 숫자 + 특수문자 조합으로 8~25자리 사용해야해요");

        return false;
      }
      if (joinUserData.value.userPassword === joinUserData.value.userPassCheck) {
        alert("비밀번호가 일치하지않습니다.");

        return false;
      }

      // return false;

      joinUser();
    };

    const joinUser = async () => {
      // //console.log("가입 좀 하자: ", joinUserData.value)
      const data = await apiClient("/user/join", joinUserData.value);
      // //console.log(data.data)
      // //console.log(data)

      // contentData.value = data.data
      //search 이벤트를 날림
    };

    onMounted(() => {
      typeSearch();
    });

    return {
      joinUserData,
      joinUser,
      typeSearch,
      typeSearchData,
      checkForm,
    };
  },
};
</script>
<template>
  <div class="signup">
    <div class="signup-img-fir">
      <img src="/assets/image/login-camp1.png" alt="" />
    </div>
    <div class="signup-img-sec">
      <img src="/assets/image/login-camp2.png" alt="" />
    </div>
    <div class="signup-form">
      <span>캠퍼가 되어봐요! </span>
      <custom-input :placeholder="'이름'" @update:value="joinUserData.userName = $event"></custom-input>
      <custom-input :placeholder="'이메일'" @update:value="joinUserData.userEmail = $event"></custom-input>
      <custom-input :placeholder="'비밀번호'" @update:value="joinUserData.userPassword = $event"></custom-input>
      <custom-input :placeholder="'비밀번호확인'" @update:value="joinUserData.userPassCheck = $event"></custom-input>
      <custom-input :placeholder="'주소'" @update:value="joinUserData.userAddress = $event"></custom-input>
      <custom-input :placeholder="'닉네임'" @update:value="joinUserData.userNickName = $event"></custom-input>
      <custom-input :placeholder="'번호'" @update:value="joinUserData.userPhone = $event"></custom-input>
      <custom-button :placeholder="'회원가입'" @click="checkForm"></custom-button>
    </div>
  </div>
</template>
