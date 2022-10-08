<script>
export default {
  name: "detailScreenPopup",
  props: {
    clickClose: {
      type: Function,
      required: true
    }
  },
}
</script>
<template>
  <div class="modal-detail">
    <!--    <span @click="clickClose" type="button">X</span>-->
    <div class="modal-detail-content">
      <div>
        <div class="container">
          <input type="checkbox" class="container-trigger">
          <label class="container-trigger-label">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div class="pop">

        </div>
        <div class="modal-detail-content-image">
          <img src="public/assets/image/camping.png" alt="게시물 사진">
        </div>
      </div>
      <div class="content">
        <div class="content-wrap">
          <div class="content-wrap-profile">
            <img src="public/assets/image/bgs.png" alt="프로필 사진">
            <div class="content-wrap-profile-info">
              <div class="follow">
                <span>베어그릴스</span>
                <button>팔로우</button>
              </div>
              <p class="content-wrap-profile-info-intro">캠핑을 좋아하는 30대 아저씨에요~^^</p>
              <p class="content-wrap-profile-info-tag">#자기랑 #오토캠핑 #인생은 #즐거워</p>
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

      <div class="save-btn">
        <button @click="clickClose">취소</button>
        <button>올리기</button>
      </div>
    </div>

  </div>
</template>
