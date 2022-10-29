<script>
import {apiClient} from "../../../utils/axios.js";

export default {
  name: 'reportPopup',
  props: {
    clickClose: {
      type: Function,
      required: true
    }
  },
  setup() {

    return {}
  }
}
</script>
<template>
  <div class="modal-report">
    <span @click="clickClose" type="button">X</span>
    <div class="modal-content">
      <input class="modal-content-writer" placeholder="신고자"/>
      <input class="modal-content-writer" placeholder="날짜"/>
      <textarea class="modal-content-content" placeholder="이유"/>
      <input type="file"/>
    </div>
    <div class="save-btn">
      <button @click="clickClose">취소</button>
      <button>신고하기</button>
    </div>
  </div>
</template>