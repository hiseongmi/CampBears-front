<script>
import { computed, ref, toRef, watch } from "vue";
import { apiClient } from "../../utils/axios.js";
import commonUtil from "../../utils/common-util.js";
import router from "../../router/index.js";

export default {
  name: "profile",
  props: {
    name: {
      type: String,
      required: true
    },
    img: {
      type: Array,
      required: true
    },
    userInfo: {
      required: false
    }
  },
  setup(props) {
    const userName = ref(props.name);
    const userProfileImg = computed(() => {
      const v = props.img.filter(v => v.fileType === "USER_PROFILE");
      return v[0];
    });
    const userInfo = ref(
      props.userInfo
    );

    const getImgUrl = (file) => {
      try {
        if (file) {
          return commonUtil.getImgUrl(file.fileName);
        }
      } catch (e) {
        return "./assets/image/camping.webp";
      }
    };

    const goTargetFeed = () => {
      router.push(`/userFeed/${userInfo.value.userIdx}`);
    };

    return {
      userName,
      userProfileImg,
      getImgUrl, goTargetFeed

    };
  }
};
</script>
<template>
  <div class="profile">
    <div class="profile-wrap">
      <img :src="getImgUrl(userProfileImg)" alt="프사" @click="goTargetFeed()" />
      <div class="profile-wrap-data">
        <span>{{ userName }}</span>
        <span class="middle-dot">&#183;</span>
        <button class="follow">팔로우</button>
        <p><i class="fa-solid fa-location-dot"></i> 경기도 고양시 덕양구 OO캠핑장 어쩌구저쩌구</p>
      </div>
    </div>
  </div>
</template>
