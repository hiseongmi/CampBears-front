<script>
import store, { POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import { onMounted, onUnmounted, ref } from "vue";
import postImage from "../../../data/postImage.js";
import { apiClient } from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import router from "../../../router/index.js";

export default {
  name: "detailScreenPopup",
  components: { CustomButton },
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const goToReport = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.REPORT);
    };//신고창열기
    const goToUpdate = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.UPDATE);
    }; //수정팝업열기

    const RerActive = ref(false);
    const RerOption = () => {
      RerActive.value = !RerActive.value;
    }; //수정신고삭제 옵션

    const followData = ref({ followType: "", targetIdx: "", targetType: "" });
    const follow = async () => {
      const data = await apiClient("/common/doFollow", followData.value);
      console.log(followData.value);
      console.log(data);
    };//팔로우 매니저

    const detailData = ref({
      boardIdx: store.state.boardIdx,
      followIdx: "",
      userIdx: "",
      targetType: "",
      dateReg: "",
      boardBody: "",
      userNickName: "",
    });
    const detail = async () => {
      const data = await apiClient("/sns/getSnsDetail", detailData.value);
      console.log(data.data);
      detailData.value = data.data;
      console.log(detailData.value.boardBody);
    };
    const deleteData = ref({
      boardIdx: store.state.boardIdx,
      userIdx: "",
      dateMod: "",
      dateReg: "",
      boardBody: "",
    });
    const deleteContent = async () => {
      const data = await apiClient("/sns/deleteSns", deleteData.value);
      if (data.resultCode === 0) {
        console.log(data);
        console.log(data.data);
        window.alert("삭제되었습니다.");
        closePopup();
        router.go();//새로고침
      } else {
        window.alert("다시시도해주세요");
      }
    };


    const closePopup = () => { //popup close
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE);
      store.commit(STORE_TYPE.boardIdx, "");
    };

    const heartCount = ref(0);
    const heartState = ref(false);
    const heartActive = () => {
      if (!heartState.value) {
        heartCount.value++;
        heartState.value = !heartState.value;
      } else {
        heartCount.value -= 1;
        heartState.value = !heartState.value;
      }
      console.log(heartCount.value);
    };
    const bookmark = ref(false);
    const bookmarkActive = () => {
      bookmark.value = !bookmark.value;
    };

    onMounted(() => {
      detail();
      //api 조회
      // if (store.state.boardIdx !== "" && store.state.boardIdx !== null && store.state.boardIdx !== undefined) {
      //   // console.log(`boardIdx : `, store.state.boardIdx);
      //   detail();
      // } else {
      //   closePopup();
      // }
    });
    // delete store boardIdx

    onUnmounted(() => {
      // closePopup();
    });

    return {
      bookmark,
      bookmarkActive,
      heartActive,
      heartCount,
      deleteContent,
      detail,
      detailData,
      follow,
      followData,
      RerActive,
      RerOption,
      goToReport,
      goToUpdate,
      postImage,
      closePopup,
    };
  },

};
</script>
<template>
  <div class="modal-detail">
    <!--    <span @click="clickClose" type="button">X</span>-->
    <div class="modal-detail-content">
      <div>
        <div class="container" @click="RerOption">
          <input type="checkbox" class="container-trigger">
          <label class="container-trigger-label">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div class="pop" v-if="RerActive">
          <ul>
            <li @click="goToUpdate">수정</li>
            <li @click="deleteContent">삭제</li>
            <li @click="goToReport">신고 <i class="fa-solid fa-circle-exclamation"></i></li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="content-image">
          <img src="/assets/image/camping.png" alt="게시물 사진">
        </div>
        <div class="content-wrap">
          <div class="content-wrap-profile">
            <img src="/assets/image/IU.png" alt="프로필 사진">
            <div class="content-wrap-profile-info">
              <div class="follow">
                <span>{{ detailData.userNickName }}</span>
                <custom-button :placeholder="'팔로우'" :custom-class="'follow_btn'" @click="follow"
                               @update:value="followData.targetIdx"></custom-button>
              </div>
              <p class="content-wrap-profile-info-intro">{{ detailData.boardBody }}</p>
              <p class="content-wrap-profile-info-tag">#내친구 #camp #인생은 #즐거워</p>
            </div>
          </div>
          <div class="content-wrap-emotion">
            <div class="content-wrap-emotion-like">
              <span v-if="heartCount<1" @click="heartActive"><i class="fa-regular fa-heart"></i></span>
              <span v-else @click="heartActive"><i class="fa-solid fa-heart"></i></span>
              <span>{{ heartCount }}</span>
            </div>
            <div class="content-wrap-emotion-book">
              <span v-if="bookmark<1" @click="bookmarkActive"><i class="fa-regular fa-bookmark"></i></span>
              <span v-else @click="bookmarkActive"><i class="fa-solid fa-bookmark"></i></span>
            </div>
            <div class="content-wrap-emotion-book">
              <span><i class="fa-solid fa-share-nodes"></i></span>
            </div>
          </div>
        </div>
        <div class="content-line">
          <div class="content-line-wrap">
            <span>댓글20</span>
            <span>조회수2,500</span>
          </div>
        </div>
        <div class="comment">
          test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test<br />test
        </div>
      </div>
    </div>
    <span class="right">
      <i class="fa-solid fa-circle-chevron-right"></i>
    </span>
    <span class="left">
      <i class="fa-solid fa-circle-chevron-left"></i>
    </span>
  </div>
</template>
