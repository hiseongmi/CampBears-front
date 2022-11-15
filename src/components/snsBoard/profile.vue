<script>
import { computed, ref } from "vue";
import { apiClient } from "../../utils/axios.js";

export default {
  name: "profile",
  props: {
    name: {
      type: String,
      required: true,
    },
    img: {
      required: true,
    },
  },
  setup(props) {
    const userName = ref(props.name);
    const userProfileImg = ref(props.img);

    return {
      userName,
      userProfileImg,
    };
  },
};
</script>
<template>
  <div class="profile">
    <div class="profile-wrap">
      <img :src="userProfileImg" alt="프로필 사진" />
      <div class="profile-wrap-data">
        <span>{{ userName }}</span>
        <span class="middle-dot">&#183;</span>
        <button class="follow">팔로우</button>
        <p><i class="fa-solid fa-location-dot"></i> 경기도 고양시 덕양구 OO캠핑장 어쩌구저쩌구</p>
      </div>
    </div>
  </div>
</template>
