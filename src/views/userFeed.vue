<script>
import { apiClient } from "../utils/axios.js";
import { nextTick, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import commonUtil from "../utils/common-util.js";

export default {
  name: "userFeed",
  setup() {
    const route = useRoute();
    const userData = ref();
    const userIdx = ref();
    const profileImg = ref();
    const backProfile = ref();


    const setUserIdx = () => {
      userIdx.value = route.path.split("/")[2];
    };
    const getTargetUserInfo = async () => {
      const d = await apiClient("/user/getUserInfo", { userIdx: userIdx.value });
      if (d.data) {
        // console.log(d);
        userData.value = d.data;
        profileImg.value = commonUtil.getImgUrl(userData.value.file.filter(v => v.fileType === "USER_PROFILE")[0].fileName);
        backProfile.value = commonUtil.getImgUrl(userData.value.file.filter(v => v.fileType === "USER_BACKGROUND")[0].fileName);
        // console.log(profileImg);
      }
    };

    const getImgUrl = (file) => {
      return commonUtil.getImgUrl(file);
    };

    const doFollow = () => {
      if (
        confirm(`날 팔로우하고싶나?`)) {
        alert("자넨 날 팔로우 할수 없네 ㅋ");
      } else {
        alert("겁쟁이ㅋ");
      }
    };

    onMounted(() => {
      setUserIdx();
      nextTick(() => {
        getTargetUserInfo();
      });
    });
    return {
      userData,
      profileImg,
      backProfile,
      getImgUrl,
      doFollow
    };
  }
};
</script>
<template>
  <section class="user-feed">
    <div class="profile-area" v-if="userData">
      <img class="background-img" :src="backProfile" alt="gi">
      <div class="profile">
        <img class="profile-img" :src="profileImg" alt="gi">
        <div>{{ userData.userNickName }}</div>
        <div class="follow-btn" @click="doFollow">팔로우하기</div>
      </div>
    </div>
    <div v-else>
      no data...
    </div>
  </section>

</template>
