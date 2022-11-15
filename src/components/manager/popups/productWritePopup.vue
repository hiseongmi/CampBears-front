<script>
import customButton from "../../layout/customButton.vue";
import { ref } from "vue";
import CustomInput from "../../layout/customInput.vue";

export default {
  name: "productWritePopup",
  components: { CustomInput, customButton },
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
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
          <input type="file" accept="image/*" />
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
      </div>
    </div>
  </div>

</template>