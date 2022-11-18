<script>
import { computed, ref, watch } from "vue";
import { apiClient } from "../../utils/axios.js";
import commonUtil from "../../utils/common-util.js";

export default {
  name: "profile",
  props: {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const userName = ref(props.name);
    const userProfileImg = computed(() => {
      const v = props.img.filter(v => v.fileType === "USER_PROFILE");
      return v[0];
    });

    const getImgUrl = (file) => {
      return commonUtil.getImgUrl(file.fileName);
    };

    return {
      userName,
      userProfileImg,
      getImgUrl,
    };
  },
};
</script>
<template>
  <div class="profile">
    <div class="profile-wrap">
      <img :src="getImgUrl(userProfileImg)" alt="프사" />
      <div class="profile-wrap-data">
        <span>{{ userName }}</span>
        <span class="middle-dot">&#183;</span>
        <button class="follow">팔로우</button>
        <p><i class="fa-solid fa-location-dot"></i> 경기도 고양시 덕양구 OO캠핑장 어쩌구저쩌구</p>
      </div>
    </div>
  </div>
</template>
