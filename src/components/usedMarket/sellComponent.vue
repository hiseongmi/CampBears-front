<script>
import { onMounted, onUnmounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";
import commonUtil from "../../utils/common-util.js";
import customModal from "../layout/customModal.vue";
import store, { POPUP_TYPE, STORE_TYPE } from "../../store/index.js";

export default {
  name: "usedContentsComponent",
  components: { customModal, customPagination },
  props: {},
  setup() {
    const postData = ref({});
    const selectedValue = ref();
    let keyword = "";

    const getData = async () => {
      let param = { productType: "SELL" };
      if (selectedValue.value !== null && selectedValue.value !== undefined) {
        param = Object.assign({}, param, { sorted: selectedValue.value }); //ob 내장함수 합침
        param.sorted = selectedValue.value;
      }

      const data = await apiClient("/product/getProductList", param);
      if (data) {
        postData.value = data.data;
        for (let i = 0; i < postData.value.length; i++) {
          console.log(postData.value[i].file);
          postData.value[i].file.map(v => {
            for (let j = 0; j < postData.value[i].file.length; j++) {
              postData.value[i].file[j] = commonUtil.getImgUrl(v.fileName);
            }
          });
        }
      }
    };

    const handleSearch = e => {
      //이벤트를 받음
      if (e.detail !== "") {
        keyword = e.detail;
        //inquiryData.value = {keyword: e.detail} ///빈값이 아닐때  keyword 로 값을 보냄
      } else {
        keyword = e.detail;
        //inquiryData.value = ""
      }
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
    };
  },
};
</script>

<template>
  <div class="used-contents-area">
    <div class="used-contents-area-ul">
      <div class="used-post" v-for="item in postData" @click="openDetail()">
        <div class="used-post-img-wrap">
          <img :src="item.file[0]" alt="Posts" />
        </div>
        <div class="used-post-info">
          <div class="used-post-info-title">{{ item.productName }}</div>
          <div class="used-post-info-seller-name">{{ item.userNickName }}</div>
          <div class="used-post-info-contents">{{ item.productDes }}</div>
          <div class="used-post-info-coast">{{ item.productPrice }}</div>
          <div class="used-post-info-footer">
            <div class="used-post-info-footer-date">
              <!--              <img :src="item.file" alt="" />-->
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
