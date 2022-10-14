<script>
export default {
  name: "writeBoardPopup",
  props: {
    clickClose: {
      type: Function,
      required: true
    }
  },
}
</script>
<template>
  <div class="modal-inner">
    <div class="save-btn">
      <span class="cancel" @click="clickClose" type="button">취소</span>
      <span type="button">저장</span>
      <span class="up" type="button">올리기</span>
    </div>
    <div class="content">
      <div class="file">
        <input type="file"/>
        
      </div>
      <div class="content-profile">
        <div class="content-profile-wrap">
          <img src="/assets/image/IU.png">
          <span>dlwlrma</span>
        </div>
        <div class="content-profile-public">
          <span>전체공개</span>
          <span>비공개</span>
        </div>
      </div>
      <div class="content-content">
        <textarea placeholder="문구 입력..." maxlength="200"></textarea>
        <div class="count">
          (0 / 200)
        </div>
      </div>
      <div class="content-position">
        <div class="content-position-wrap">
          <span class="title">위치태그</span>
          <span><i class="fa-solid fa-chevron-right"></i></span>
        </div>
      </div>
      <div class="content-position">
        <div class="content-position-wrap">
          <span class="title">장소</span>
          <span><i class="fa-solid fa-chevron-right"></i></span>
        </div>
      </div>
      <div class="content-person">
        <div class="content-person-wrap">
          <span>인원</span>
          <div>
            range slider
          </div>
        </div>
      </div>
      <div class="content-tag">
        <div class="content-tag-div">
          태그 설정
        </div>
        <div class="content-tag-wrap">
          <textarea placeholder="# 태그입력 (최대 30개)"></textarea>
        </div>
      </div>
    </div>

  </div>

</template>
