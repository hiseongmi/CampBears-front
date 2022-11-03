<script>
import CustomButton from "../components/layout/customButton.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { apiClient } from "../utils/axios.js";

export default {
  name: "usedMarket",
  components: { CustomButton },
  setup() {
    const tabType = {
      SELL: "sell",
      BUY: "buy",
    }; // 컴포넌트 이름

    const tabIndex = ref(tabType.SELL);

    const componentChange = v => {
      console.log(v);
      tabIndex.value = v;
    };

    let keyword = "";
    const postData = ref();
    const selectedValue = ref();

    const getContent = async () => {
      let param = { keyword: keyword, sorted: "RECENT" };
      if (selectedValue.value !== null && selectedValue.value !== undefined) {
        param = Object.assign({}, param, { sorted: selectedValue.value }); //ob 내장함수 합침
        param.sorted = selectedValue.value;
      }
      const data = await apiClient("/sns/getSnsList", param);
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
      getContent();
    };

    onMounted(() => {
      window.addEventListener("SEARCH", handleSearch); //search 이벤트를 찾아서 handel이벤트로 보냄
      getContent();
    });

    onUnmounted(() => {
      window.removeEventListener("SEARCH", handleSearch);
    });

    return {
      tabType,
      tabIndex,
      componentChange,
      postData,
      getContent,
    };
  },
};
</script>

<template>
  <div class="used-market">
    <div class="used-title">
      <span>USED MARKET</span>
      <div class="used-component-change">
        <custom-button
          :placeholder="'팝니다'"
          :onClick="() => componentChange(tabType.SELL)"
          :custom-class="tabIndex === tabType.SELL ? 'active' : ''"
        />
        <custom-button
          :placeholder="'삽니다'"
          :onClick="() => componentChange(tabType.BUY)"
          :custom-class="tabIndex === tabType.BUY ? 'active' : ''"
        />
      </div>
    </div>
    <div class="used-banner">
      <div class="used-banner-popup" @click="">
        <svg width="18" height="18" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1.5" y1="1.5" x2="21.5" y2="1.5" stroke="black" stroke-width="3" stroke-linecap="round" />
          <line x1="1.5" y1="9.16602" x2="21.5" y2="9.16602" stroke="black" stroke-width="3" stroke-linecap="round" />
          <line x1="1.5" y1="16.834" x2="21.5" y2="16.834" stroke="black" stroke-width="3" stroke-linecap="round" />
        </svg>
      </div>
      <custom-button :placeholder="'글쓰기'" />
    </div>
    <div class="used-contents-area">
      <div class="used-post" v-for="item in postData">
        <div class="used-post-img-box">
          <img src="/assets/image/camping.png" alt="Posts" />
        </div>
        <div class="used-post-info">
          <div class="used-post-title">title</div>
          <div class="used-post-seller-name">seller-name</div>
          <div class="used-post-contents">contents contents contents contents contents</div>
          <div class="used-post-coast">100$</div>
          <div class="used-post-footer">
            <div class="used-post-date">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.5 10C7.98528 10 10 7.98528 10 5.5C10 3.01472 7.98528 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5 10Z"
                  stroke="#818181"
                  stroke-width="0.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.5 2.80078V5.50078L7.3 6.40078"
                  stroke="#818181"
                  stroke-width="0.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a>2022.11.01</a>
            </div>
            <div class="used-post-like">
              <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.60844 5.59993C0.526769 4.13324 0.887326 1.93321 2.69011 1.19987C4.49289 0.466523 5.57457 1.93321 5.93512 2.66656C6.29568 1.93321 7.73791 0.466523 9.54069 1.19987C11.3435 1.93321 11.3435 4.13324 10.2618 5.59993C9.18013 7.06662 5.93512 10 5.93512 10C5.93512 10 2.69011 7.06662 1.60844 5.59993Z"
                  stroke="#818181"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a>22</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
