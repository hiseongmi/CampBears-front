<script>
import { onMounted, onUnmounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";

export default {
  name: "usedContentsComponent",
  components: {},
  setup: function () {
    let keyword = "";
    const postData = ref();
    const selectedValue = ref();

    const getData = async () => {
      let param = {};

      if (selectedValue.value !== null && selectedValue.value !== undefined) {
        param = Object.assign({}, param, { sorted: selectedValue.value }); //ob 내장함수 합침
        param.sorted = selectedValue.value;
      }

      const data = await apiClient("/product/getProductList", param);
      if (data.data) {
        console.log(data.data);
        postData.value = data.data;
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

    onMounted(() => {
      window.addEventListener("SEARCH", handleSearch); //search 이벤트를 찾아서 handel이벤트로 보냄
      getData();
    });

    onUnmounted(() => {
      window.removeEventListener("SEARCH", handleSearch);
    });

    return {
      postData,
      getData,
    };
  },
};
</script>

<template>
  <div class="used-contents-area">
    <div class="used-post" v-for="item in postData">
      <div class="used-post-img-box">
        <img src="/assets/image/camping.png" alt="Posts" />
      </div>
      <div class="used-post-info">
        <div class="used-post-title">title</div>
        <div class="used-post-seller-name">{{ item.userNickName }}</div>
        <div class="used-post-contents">contents contents contents contents contents</div>
        <div class="used-post-coast">{{ item.productPrice }}</div>
        <div class="used-post-footer">
          <div class="used-post-date">
            <img src="/assets/image/icon/time.png" alt="" />
            <a>{{ item.dateReg.slice(5, 10) }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
