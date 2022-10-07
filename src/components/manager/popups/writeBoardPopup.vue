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
    <span @click="clickClose" type="button">X</span>
    <div class="modal-content">
      <input class="modal-content-writer" placeholder="글쓴이"/>
      <input class="modal-content-writer" placeholder="제목"/>
      <input class="modal-content-writer" placeholder="날짜"/>
      <textarea class="modal-content-content" placeholder="내용"/>
      <input type="file"/>
    </div>
    <div class="save-btn">
      <button @click="clickClose">취소</button>
      <button>올리기</button>
    </div>
  </div>

</template>
