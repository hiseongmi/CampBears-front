<script>
import { onMounted, onUnmounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";
import commonUtil from "../../utils/common-util.js";
import CustomModal from "../layout/customModal.vue";
import store, { POPUP_TYPE, STORE_TYPE } from "../../store/index.js";

export default {
  name: "buyComponent",
  components: { CustomModal, customPagination },
  setup() {
    const postData = ref({});
    const file = ref("");
    let keyword = "";

    const getData = async () => {
      const data = await apiClient("/product/getProductList", { productType: "BUY", sorted: "RECENT" });
      if (data) postData.value = data.data;
    };

    const getImgUrl = file => {
      return commonUtil.getImgUrl(file.fileName);
    };

    const handleSearch = e => {
      if (e.detail !== "") keyword = e.detail;
      else keyword = e.detail;
      getData();
    };

    const openDetail = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.PRODUCT_DETAIL);
    }; //게시물 상세 페이지 팝업 열기

    onMounted(() => {
      window.addEventListener("SEARCH", handleSearch); //search 이벤트를 찾아서 handel이벤트로 보냄
      getData();
    });

    onUnmounted(() => {
      window.removeEventListener("SEARCH", handleSearch);
    });

    const isModal = ref(false);
    const modalControl = state => {
      isModal.value = state;
    };

    return {
      openDetail,
      postData,
      getData,
      modalControl,
      isModal,
      file,
      getImgUrl
    };
  }
};
</script>

<template>
  <div class="used-contents-area">
    <div class="used-contents-area-ul">
      <div class="used-post" v-for="item in postData" @click="openDetail()">
        <div class="used-post-img-wrap">
          <img :src="getImgUrl(item.file[0])" alt="Posts" />
        </div>
        <div class="used-post-info">
          <div class="used-post-info-title">{{ item.productName }}</div>
          <div class="used-post-info-seller-name">{{ item.userNickName }}</div>
          <div class="used-post-info-contents">{{ item.productDes }}</div>
          <div class="used-post-info-coast">{{ item.productPrice.toLocaleString() }}</div>
          <div class="used-post-info-footer">
            <div class="used-post-info-footer-date">
              <img src="/assets/image/icon/time.webp" alt="" />
              <a>{{ item.dateReg.slice(5, 10) }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <custom-pagination v-if="!isModal" />
    <custom-modal v-if="isModal" @close="modalControl(false)" />
  </div>
</template>
