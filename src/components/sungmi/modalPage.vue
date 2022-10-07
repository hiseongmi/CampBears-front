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
        file: borderData.value.file,
      });
      router.push('/newsPage');
    }

    return {
      close,
      onUpload,
      borderData
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
          <!--         modal content-->
          <slot/>
          <div class="save-btn">
            <button @click="close">취소</button>
            <button @click="onUpload">올리기</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
