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
