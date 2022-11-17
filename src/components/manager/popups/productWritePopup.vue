<script>
import customButton from "../../layout/customButton.vue";
import { ref } from "vue";
import CustomInput from "../../layout/customInput.vue";
import CustomInputFileButton from "../../layout/customInputFileButton.vue";

export default {
  name: "productWritePopup",
  components: { CustomInputFileButton, CustomInput, customButton },
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const overall_Type = [
      {
        name: "텐트/타프",
      }, {
        name: "침낭/매트",
      }, {
        name: "테이블/의자",
      }, {
        name: "조명 기구",
      }, {
        name: "주방 용품",
      }, {
        name: "화로/버너",
      }, {
        name: "안전/위생용품",
      }, {
        name: "전기/전자제품",
      }, {
        name: "캠핑카/카라반",
      }, {
        name: "차박 용품",
      }, {
        name: "의류/수납",
      }, {
        name: "기타 용품",
      },
    ];
    const typeType = {
      SELL: "sell",
      BUY: "buy",
    };
    const typeIndex = ref();
    const checkValue = v => {
      typeIndex.vlaue = v;
    };

    return {
      typeType,
      typeIndex,
      checkValue,
      overall_Type,
    };
  },
};
</script>
<template>
  <div class="modal-inner">
    <div class="save-btn">
      <custom-button :customClass="'cancel'" :placeholder="'취소'" :onClick="clickClose" />
      <div class="save-btn-wrap">
        <custom-button :customClass="'upLoad'" :placeholder="'올리기'" />
      </div>
    </div>
    <div class="modal-inner-wrap">
      <div class="product">
        <div class="product-file">
          <custom-input-file-button />
        </div>
        <div class="product-title">
          <custom-input :placeholder="'제목'" />
          <div class="product-title-type">
            <custom-button
              :placeholder="'팝니다'"
              :onClick="() => checkValue(typeType.SELL)"
              :custom-class="typeIndex === typeType.SELL ? 'active' : ''"
              :customClass="'buy'"
            />
            <custom-button
              :placeholder="'삽니다'"
              :onClick="() => checkValue(typeType.BUY)"
              :custom-class="typeIndex === typeType.BUY ? 'active' : ''"
            />
          </div>
        </div>
        <div class="product-option">
          <div class="product-option-price">
            <custom-input :placeholder="'가격(원)'" />
            <button><i class="fa-solid fa-circle"></i></button>
            <span>흥정 가능</span>
          </div>
          <div class="product-option-grade">
            <span class="title">상품 컨디션</span>
            <span><i class="fa-solid fa-star"></i></span>
            <span><i class="fa-solid fa-star"></i></span>
            <span><i class="fa-solid fa-star"></i></span>
            <span><i class="fa-solid fa-star"></i></span>
            <span><i class="fa-solid fa-star"></i></span>
          </div>
        </div>
        <div class="product-sort">
          <div class="product-sort-info">
            <span>구분</span>
            <span class="import">*</span>
          </div>
          <div class="product-sort-deal">
            <span>택배거래</span>
            <span>직거래</span>
            <div class="product-sort-deal-type">
              <span v-for="item in overall_Type">{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="product-content">
          <custom-input :placeholder="'게시글 내용을 작성해주세요. 허위 내용 작성시 게시가 제한될 수 있어요.'" />
        </div>
      </div>
    </div>
  </div>

</template>