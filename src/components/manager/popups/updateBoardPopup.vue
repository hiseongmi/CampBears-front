<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";
import store, { POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import router from "../../../router/index.js";

export default {
  name: "updateBoardPopup",
  components: { CustomInput, CustomButton },
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
    goDetail: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const updateData = ref({
      boardIdx: store.state.boardIdx,
      boardBody: "",
      hashTag: [""],
    });
    const update = async () => {
      const data = await apiClient("/sns/updateSns", updateData.value);
      ////console.log(data.data);
      if (data.resultCode === 0) {
        window.alert("수정되었습니다.");
        await store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
      } else {
        window.alert("다시 시도해주세요");
      }
    };

    return {
      updateData,
      update,
    };
  },
};
</script>
<template>
  <div class="modal-inner">
    <div class="save-btn">
      <custom-button :customClass="'cancel'" :placeholder="'취소'" :onClick="goDetail" />
      <div class="save-btn-wrap">
        <custom-button :customClass="'upLoad'" :placeholder="'수정'" :onClick="update" />
      </div>
    </div>
    <div class="modal-inner-wrap">
      <div class="content">
        <div class="file">
          <input type="file" />
        </div>
        <div class="content-profile">
          <div class="content-profile-wrap">
            <img src="/assets/image/IU.png" />
            <span>dlwlrma</span>
          </div>
          <div class="content-profile-public">
            <span>전체공개</span>
            <span>비공개</span>
          </div>
        </div>
        <div class="content-content">
          <custom-input
            :custom-class="'content'"
            :placeholder="'문구 입력...'"
            @update:value="updateData.boardBody = $event"
          >
          </custom-input>
          <div class="count">(0 / 200)</div>
        </div>
        <div class="content-position">
          <div class="content-position-wrap">
            <span class="title">위치태그</span>
            <span><i class="fa-solid fa-chevron-right"></i></span>
          </div>
        </div>
        <div class="content-position">
          <div class="content-position-wrap">
            <span class="title">장소</span>
            <span><i class="fa-solid fa-chevron-right"></i></span>
          </div>
        </div>
        <div class="content-person">
          <div class="content-person-wrap">
            <span>인원</span>
            <div>range slider</div>
          </div>
        </div>
        <div class="content-tag">
          <div class="content-tag-div">태그 설정</div>
          <div class="content-tag-wrap">
            <custom-input
              :custom-class="'content'"
              :placeholder="'# 태그입력 (최대 30개)'"
              @update:value="updateData.hashTag = $event"
            ></custom-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
