<script>
import CustomButton from "../../layout/customButton.vue";
import { onMounted, ref } from "vue";
import { apiClient } from "../../../utils/axios.js";
import commonUtil from "../../../utils/common-util.js";

export default {
  name: "productDetailPopup",
  components: { CustomButton },
  setup() {
    const detail = ref({
      productIdx: "",
    });
    const getDetail = async () => {
      const data = await apiClient("product/getProductDetail", detail.value.productIdx);
      if (data) detail.value = data.data;
    };

    onMounted(() => {
      getDetail();
    });

    const getImgUrl = file => {
      return commonUtil.getImgUrl(file.fileName);
    };

    return {
      detail,
      getImgUrl,
    };
  },
};
</script>
<template>
  <section class="product-detail-popup">
    <div class="modal-detail">
      <div class="modal-detail-content">
        <div class="product">
          <div class="product-image">
            <img src="/assets/image/mainpageslider3.png" alt="상품 사진" />
            <div class="product-image-subImg">
              <div class="product-image-subImg-list">
                <img class="product-image-subImg-list-pick" src="/assets/image/mainpageslider3.png" alt="상품1 사진" />
                <img src="/assets/image/mainpageslider1.png" alt="상품2 사진" />
                <img src="/assets/image/mainpageslider2.png" alt="상품3 사진" />
              </div>
            </div>
            <span class="product-image-right">
              <i class="fa-solid fa-circle-chevron-right" />
            </span>
            <span class="product-image-left">
              <i class="fa-solid fa-circle-chevron-left" />
            </span>
          </div>
          <div class="product-wrap">
            <div class="product-wrap-profile">
              <img src="/assets/image/IU.png" alt="프사" />
              <div class="product-wrap-profile-info">
                <span>dlwlrma</span>
              </div>
            </div>
            <div class="product-wrap-chat">
              <custom-button :placeholder="'채팅하기'" />
            </div>
          </div>
          <div class="product-main">
            <div class="product-main-wrap">
              <div class="product-main-wrap-title">
                <div class="pomsom">팝니다</div>
                <h4>엄청 편하고 간지나는 의자</h4>
              </div>
              <div class="product-main-wrap-rest">
                <span><i class="fa-regular fa-clock" />2시간 전</span>
              </div>
            </div>
            <div class="product-main-menu">
              <span class="heart"><i class="fa-regular fa-heart"></i></span>
              <span class="share"><i class="fa-solid fa-share-nodes"></i></span>
            </div>
          </div>
          <div class="product-price">
            <div class="grade">
              <span class="name">상품 컨디션</span>
              <span><i class="fa-solid fa-star"></i></span>
              <span><i class="fa-solid fa-star"></i></span>
              <span><i class="fa-solid fa-star"></i></span>
              <span><i class="fa-solid fa-star"></i></span>
              <span><i class="fa-solid fa-star"></i></span>
            </div>
            <p>35,000원</p>
          </div>
          <div class="product-content">
            <div class="product-content-wrap">
              한번밖에 안쓴 캠핑 의자 팝니다~<br />
              상태 양호하고 얼룩 없스니다.
            </div>
            <div class="product-content-deal">
              <span>택배거래</span>
              <span>직거래</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
