<script>
import modalPage from '../sungmi/modalPage.vue';
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import router from "../../router/index.js";

export default {
  name: 'modalHome',
  components: {modalPage},
  setup() {
    const route = useRoute();


    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    const selectedFile = ref(null);
    const onFileSelected = event => {
      selectedFile.value = event.target.files[0];
    };
    return {
      modalActive,
      toggleModal,
      onFileSelected,
    };
  },
};
</script>

<template>
  <div class="modalHome">
    <modal-page @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content">
        <input v-model="borderData.writer" class="modal-content-writer" placeholder="글쓴이"/>
        <input v-model="borderData.title" class="modal-content-writer" placeholder="제목"/>
        <input v-model="borderData.date" class="modal-content-writer" placeholder="날짜"/>
        <textarea v-model="borderData.content" class="modal-content-content" placeholder="내용"/>
        <input v-model="borderData.file" type="file" @change="onFileSelected"/>
      </div>
    </modal-page>
    <!--		<a class="write_btn">-->
    <!--			<img @click="toggleModal" type="button" src="/assets/image/jjanggu.png" alt="글쓰기" />-->
    <!--		</a>-->
    <button @click="toggleModal">
      <i class="fa-solid fa-pen"></i>
      글쓰기
    </button>
  </div>
</template>
