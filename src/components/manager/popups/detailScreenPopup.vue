<script>
import store, { POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import { onMounted, onUnmounted, ref } from "vue";
import postImage from "../../../data/postImage.js";
import { apiClient } from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";
import router from "../../../router/index.js";

export default {
  name: "detailScreenPopup",
  components: { CustomButton, CustomInput },
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
    const RerCommentActive = ref(false);
    const RerCommentOption = () => {
      RerCommentActive.value = !RerCommentActive.value;
    }; //댓글수정신고삭제 옵션

    const followData = ref({ followType: "", targetIdx: "", targetType: "" });
    const follow = async () => {
      const data = await apiClient("/common/doFollow", followData.value);
      console.log(followData.value);
      console.log(data);
    };//팔로우 매니저

    //상세게시물 api
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
      // console.log(data.data);
      detailData.value = data.data;
      console.log(detailData.value.boardBody);
    };
    //게시물 삭제 api
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
    //댓글 조회 api
    const commentListData = ref({
      boardIdx: store.state.boardIdx,
      commentBody: "",
      commentIdx: "",
      dateMod: "",
      dateReg: "",
      userIdx: "",
      userNickName: "",
    });
    const commentList = async () => {
      const data = await apiClient("/comment/getCommentList", commentListData.value);
      if (data.resultCode === 0) {
        console.log(data.data);
        commentListData.value = data.data;
      } else {
        window.alert("댓글 조회에 실패했습니다.");
      }
    };
    //댓글 추가 api
    const commentData = ref({
      boardIdx: store.state.boardIdx,
      commentBody: "",
      commentIdx: "",
      dateMod: "",
      dateReg: "",
      userIdx: "",
      userNickName: "",
    });
    const upComment = async () => {
      const data = await apiClient("/comment/insertComment", commentData.value);
      if (data.resultCode === 0) {
        console.log(commentData.value.commentBody);
        console.log(data.data);
      } else {
        window.alert("댓글을 입력해주세요");
      }
    };
    //댓글 삭제 api
    const deleteCommentData = ref({
      boardIdx: store.state.boardIdx,
      commentBody: "",
      commentIdx: commentListData.value.commentIdx,
      dateMod: "",
      dateReg: "",
      userIdx: "",
      userNickName: "",
    });
    const deleteComment = async () => {
      const data = await apiClient("/comment/deleteComment", commentData.value);
      if (data.resultCode === 0) {
        console.log(data);
        console.log(data.data);
        window.alert("삭제되었습니다.");
        RerCommentOption();
      } else {
        window.alert("다시 시도해주세요");
      }
    };

    //팝업닫기
    const closePopup = () => { //popup close
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE);
      store.commit(STORE_TYPE.boardIdx, "");
    };
    //좋아요, 북마크
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
      commentList();
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
      deleteCommentData,
      deleteComment,
      commentListData,
      commentList,
      upComment,
      commentData,
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
      RerCommentActive,
      RerCommentOption,
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
        <!--        댓글창-->
        <div class="content-line">
          <div class="content-line-wrap">
            <span>댓글{{ commentListData.length }}</span>
            <span>조회수2,500</span>
          </div>
        </div>
        <div class="content-enterComment">
          <div class="content-enterComment-wrap">
            <custom-input :custom-class="'comment'" :placeholder="'댓글을 입력해주세요.'"
                          @update:value="commentData.commentBody = $event" />
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.1262 1V0H11.1262V1H13.1262ZM12.1262 11.5V12.5H13.1262V11.5H12.1262ZM1 11.5V10.5C0.614909 10.5 0.264033 10.7211 0.0978755 11.0685C-0.068282 11.4159 -0.020195 11.8279 0.22151 12.1277L1 11.5ZM2.64026 15.1277L3.26792 15.9061L4.8249 14.6508L4.19724 13.8723L2.64026 15.1277ZM11.1262 1V11.5H13.1262V1H11.1262ZM12.1262 10.5H1V12.5H12.1262V10.5ZM0.22151 12.1277L2.64026 15.1277L4.19724 13.8723L1.77849 10.8723L0.22151 12.1277Z"
                fill="#818181" />
            </svg>
          </div>
          <button @click="upComment"><i class="fa-regular fa-comment"></i></button>
        </div>
        <div class="content-comments" v-for="item in commentListData">
          <img src="/assets/image/iugold5.png" />
          <div class="content-comments-wrap">
            <!--            <div class="content-comments-wrap-user">-->
            <span>{{ item.userNickName }}</span>
            <p>{{ item.commentBody }}</p>
            <!--            </div>-->
            <!--            <span class="cocoment">답글달기</span>-->
          </div>
          <div class="content-comments-option">
            <span class="date">{{ item.dateReg }}</span>
            <span> <i class="fa-regular fa-comment"></i></span>
            <span @click="RerCommentOption(item.commentIdx)"><i class="fa-solid fa-ellipsis-vertical"></i></span>
          </div>
          <div class="commentPop" v-if="RerCommentActive">
            <ul>
              <li @click="deleteComment">삭제</li>
              <li @click="goToReport">신고</li>
              <li @click="RerCommentOption">취소</li>
            </ul>
          </div>
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
