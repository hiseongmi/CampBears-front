<script>
import {ref} from "vue";
import {apiClient} from "../../utils/axios.js";

export default {
  name: 'profile',
}
</script>
<template>
  <div class="profile">
    <div class="profile-wrap">
      <img src="/assets/image/IU.png" alt="프로필 사진"/>
      <div class="profile-wrap-data">
        <span>dlwlrma</span>
        <button class="follow">팔로우</button>
        <p>캠핑을 좋아하는 슈퍼 스타중의 스타~ 이지금이에요</p>
      </div>
      <div class="profile-wrap-comment">
        <span><i class="fa-regular fa-comment"></i></span>
        <span>4.219</span>
      </div>
      <div class="profile-wrap-heart">
        <span><i class="fa-regular fa-heart"></i></span>
        <span>23,812</span>
      </div>
    </div>
  </div>
</template>