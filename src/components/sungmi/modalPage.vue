<script>
import {ref} from "vue";
import router from "../../router/index.js";
import data from "../../data/index.js";

export default {
  name: 'modalPage',
  props: ['modalActive'],
  setup(props, {emit}) {
    const close = () => {
      emit('close');
    };
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    const borderData = ref({
      writer: '',
      title: '',
      date: '',
      content: '',
      file: '',
    });
    const onUpload = () => {
      data.push({
        name: borderData.value.writer,
        title: borderData.value.title,
        date: borderData.value.date,
        content: borderData.value.content,

      });
      router.push('/newsPage');
    }

    const selectedFile = ref(null);
    const onFileSelected = event => {
      selectedFile.value = event.target.files[0];
    };

    return {
      close,
      onUpload,
      borderData,
      onFileSelected,
      toggleModal,
    };
  },
};
</script>
<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <span @click="close" type="button">X</span>
          <div class="modal-content">
            <input v-model="borderData.writer" class="modal-content-writer" placeholder="글쓴이"/>
            <input v-model="borderData.title" class="modal-content-writer" placeholder="제목"/>
            <input v-model="borderData.date" class="modal-content-writer" placeholder="날짜"/>
            <textarea v-model="borderData.content" class="modal-content-content" placeholder="내용"/>
            <input type="file" @change="onFileSelected"/>
          </div>
          <div class="save-btn">
            <button @click="close">취소</button>
            <button @click="onUpload">올리기</button>
          </div>

        </div>
      </transition>

    </div>
  </transition>

</template>
