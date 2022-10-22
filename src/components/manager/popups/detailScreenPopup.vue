<script>
import store, {POPUP_TYPE, STORE_TYPE} from "../../../store/index.js";
import {ref} from "vue";
import postImage from "../../../data/postImage.js";
import {apiClient} from "../../../utils/axios.js";

export default {
  name: "detailScreenPopup",
  props: {
    clickClose: {
      type: Function,
      required: true
    }
  },

  setup() {

    const goToReport = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.REPORT)
    }//신고창열기

    const RerActive = ref(false);

    const RerOption = () => {
      RerActive.value = !RerActive.value;
    }; //수정신고삭제 옵션

    const followData = ref({followType: "", targetIdx: "", targetType: ""});
    const follow = async () => {
      const data = await apiClient("/common/doFollow", followData.value)
      console.log(followData.value)
      console.log(data)
    }//팔로우 매니저

    return {
      follow,
      RerActive,
      RerOption,
      goToReport,
      postImage,
    }
  }

}
</script>
<template>
  <div class="modal-detail">
    <!--    <span @click="clickClose" type="button">X</span>-->
    <div class="modal-detail-content">
      <div>
        <div class="container" @click="RerOption">
          <input type="checkbox" class="container-trigger">
          <label class="container-trigger-label">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div class="pop" v-if="RerActive">
          <ul>
            <li>수정</li>
            <li>삭제</li>
            <li @click="goToReport">신고 <i class="fa-solid fa-circle-exclamation"></i></li>
          </ul>
        </div>
        <div class="modal-detail-content-image">
          <img src="/assets/image/iucamp3.gif" alt="게시물 사진">
        </div>
      </div>
      <div class="content">
        <div class="content-wrap">
          <div class="content-wrap-profile">
            <img src="/assets/image/IU.png" alt="프로필 사진">
            <div class="content-wrap-profile-info">
              <div class="follow">
                <span>dlwlrma</span>
                <button class="follow_btn" @click="follow">팔로우</button>
              </div>
              <p class="content-wrap-profile-info-intro">캠핑을 좋아하는 슈퍼 스타중의 스타~ 이지금이에요</p>
              <p class="content-wrap-profile-info-tag">#내친구 #camp #인생은 #즐거워</p>
            </div>
          </div>
          <div class="content-wrap-emotion">
            <div class="content-wrap-emotion-like">
              <span><i class="fa-regular fa-heart"></i></span>
              <span>23,812</span>
            </div>
            <div class="content-wrap-emotion-book">
              <span><i class="fa-solid fa-bookmark"></i></span>
            </div>
            <div class="content-wrap-emotion-book">
              <span><i class="fa-solid fa-share-nodes"></i></span>
            </div>
          </div>
        </div>
        <div class="content-line">
          <div class="content-line-wrap">
            <span>댓글20</span>
            <span>조회수2,500</span>
          </div>
        </div>
        <div class="comment">
          test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test
        </div>
      </div>
    </div>
    <span class="right">
      <i class="fa-solid fa-circle-chevron-right"></i>
    </span>
    <span class="left">
      <i class="fa-solid fa-circle-chevron-left"></i>
    </span>
  </div>
</template>
