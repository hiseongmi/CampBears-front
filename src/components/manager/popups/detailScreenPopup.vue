<script>
import store, { POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import { onMounted, onUnmounted, ref } from "vue";
import postImage from "../../../data/postImage.js";
import { apiClient } from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";
import router from "../../../router/index.js";
import dayjs from "dayjs";
import reportPopup from "./reportPopup.vue";

export default {
  name: "detailScreenPopup",
  components: { CustomButton, CustomInput, reportPopup },
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },

  setup() {
    //로컬스토리지에 저장된 유저정보
    const userData = JSON.parse(localStorage.getItem("userData")) || "";

    const goToReport = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.REPORT);
    }; //신고창열기
    const goToUpdate = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.UPDATE);
    }; //수정팝업열기

    // 해당 유저를 팔로우 하고 있는지, 아닌지
    const followType = ref({
      STATE: "UNFOLLOW",
    });
    const followData = ref({
      followType: "", // 내가 지금 팔로우 할 건지, 아닌지
      targetIdx: "",
      targetType: "USER",
    });
    const followManager = async () => {
      if (followType.value.STATE === "UNFOLLOW") {
        //안하고있으니까
        followData.value.followType = "FOLLOW"; // 팔로우했다
        followType.value.STATE = "FOLLOW"; //상태도 팔로우상태
      } else {
        followData.value.followType = "UNFOLLOW"; //언팔했다
        followType.value.STATE = "UNFOLLOW"; //상태도 언팔
      }
      ////console.log(followData.value);
      const data = await apiClient("/common/doFollow", followData.value);
      ////console.log(data);
    };
    //좋아요
    const heartCount = ref(0);
    const heartState = ref({
      STATE: "DISLIKE",
    });
    const heartData = ref({
      targetIdx: "",
      likeType: "",
      targetType: "USER",
    });
    const doLike = async () => {
      if (heartState.value.STATE === "DISLIKE") {
        heartData.value.likeType = "LIKE";
        heartState.value.STATE = "LIKE";
        heartCount.value++;
      } else {
        heartData.value.likeType = "DISLIKE";
        heartState.value.STATE = "DISLIKE";
        heartCount.value -= 1;
      }
      ////console.log(heartData.value);
      const data = await apiClient("/common/doLike", heartData.value);
    };
    //상세 게시물 조회 api
    const detailData = ref({
      boardIdx: store.state.boardIdx,
      followIdx: "",
      userIdx: "",
      targetType: "",
      dateReg: "",
      hashTag: "",
      boardBody: "",
      userNickName: "",
    });
    const detail = async () => {
      const data = await apiClient("/sns/getSnsDetail", detailData.value);
      ////console.log(data.data);
      detailData.value = data.data;
      ////console.log();
      if (detailData.value) {
        followData.value.targetIdx = detailData.value.userIdx;
      }
      if (detailData.value) {
        heartData.value.targetIdx = detailData.value.userIdx;
      }
      ////console.log("이 글 내용 : ", detailData.value.boardBody);
      await commentList();
    };
    const MyRerAction = ref(false);
    const RerAction = ref(false);
    const RerOption = () => {
      if (userData.userIdx === detailData.value.userIdx) {
        MyRerAction.value = !MyRerAction.value;
      } else {
        RerAction.value = !RerAction.value;
      }
    }; //수정신고삭제 옵션

    const reportAction = ref(false);
    const reportPop = () => {
      reportAction.value = !reportAction.value;
    };

    //게시물 삭제 api
    const deleteData = ref({
      boardIdx: store.state.boardIdx,
    });
    const deleteContent = async () => {
      const check = confirm("삭제하시겠습니까?");
      if (check === true) {
        const data = await apiClient("/sns/deleteSns", deleteData.value);
        if (data.resultCode === 0) {
          window.alert("삭제되었습니다.");
          closePopup();
          router.go(); //새로고침
        } else {
          window.alert("다시시도해주세요");
        }
      }
    };

    //댓글 조회 api
    const getComment = ref({ boardIdx: store.state.boardIdx });
    const commentListData = ref({ commentIdx: "" });
    const commentList = async () => {
      const data = await apiClient("/comment/getCommentList", getComment.value);
      if (data.resultCode === 0) {
        console.log("댓글들: ", data.data);
        commentListData.value = data.data;
        // const date = dayjs(commentListData.value[0].dateReg, "YYYY-MM-DD HH:mm");
        // ////console.log(date.format("YYYY-MM-DD HH:mm"));
      } else {
        ////console.log("댓글 조회에 실패했습니다.");
      }
    };
    const MySelectedComment = ref("");
    const selectedComment = ref("");
    //댓글 수정 신고 삭제 옵션
    const RerCommentActive = ref(false);
    const RerCommentOption = comment => {
      if (detailData.value.userIdx === userData.userIdx || userData.userIdx === comment.userIdx) {
        MySelectedComment.value = comment.commentIdx; //특정만 나와
      } else if (detailData.value.userIdx === userData.userIdx) {
        selectedComment.value = comment.commentIdx;
      }
    };

    //댓글 추가 api
    const inputComment = ref("");
    const commentData = ref({
      boardIdx: store.state.boardIdx,
      commentBody: "",
    });
    const upComment = async () => {
      const data = await apiClient("/comment/insertComment", commentData.value);
      if (data.resultCode === 0) {
        inputComment.value = "";
        await commentList();
        console.log(commentData.value.commentBody);
      } else {
        window.alert("댓글을 입력해주세요");
      }
    };
    //댓글 삭제 api
    const deleteCommentData = ref({
      commentIdx: "",
    });
    const putCommentIdx = commentIdx => {
      deleteCommentData.value.commentIdx = commentIdx;
      ////console.log("이 댓글 idx: ", deleteCommentData.value.commentIdx);
      deleteComment();
    }; //댓글 idx를 리스트에 담는다.
    const deleteComment = async () => {
      const check = confirm("삭제하시겠습니까?");
      if (check === true) {
        const data = await apiClient("/comment/deleteComment", deleteCommentData.value);
        if (data.resultCode === 0) {
          window.alert("삭제되었습니다.");
          await detail();
        } else {
          window.alert("다시 시도해주세요");
        }
      }
    };

    //팝업 닫기
    const closePopup = () => {
      //popup close
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE);
      store.commit(STORE_TYPE.boardIdx, "");
    };

    //북마크
    const bookmark = ref(false);
    const bookmarkActive = () => {
      bookmark.value = !bookmark.value;
    };

    onMounted(() => {
      detail();
    });
    // delete store boardIdx
    onUnmounted(() => {
      // closePopup();
    });

    return {
      userData,
      followType,
      followData,
      getComment,
      deleteCommentData,
      commentListData,
      commentData,
      bookmark,
      heartCount,
      heartData,
      detailData,
      RerAction,
      MyRerAction,
      RerCommentActive,
      reportAction,
      selectedComment,
      MySelectedComment,
      inputComment,
      postImage,
      putCommentIdx,
      followManager,
      deleteComment,
      commentList,
      upComment,
      bookmarkActive,
      doLike,
      deleteContent,
      detail,
      RerOption,
      RerCommentOption,
      goToReport,
      goToUpdate,
      closePopup,
      reportPop,
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
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div class="myPop" v-if="MyRerAction">
          <ul>
            <li @click="goToUpdate">수정</li>
            <li @click="deleteContent">삭제</li>
            <li @click="reportPop">신고 <i class="fa-solid fa-circle-exclamation"></i></li>
          </ul>
        </div>
        <div class="pop" v-if="RerAction">
          <ul>
            <li @click="reportPop">신고 <i class="fa-solid fa-circle-exclamation"></i></li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="content-image">
          <img src="/assets/image/camping.png" alt="게시물 사진" />
        </div>
        <div class="content-wrap">
          <div class="content-wrap-profile">
            <img src="/assets/image/IU.png" alt="프로필 사진" />
            <div class="content-wrap-profile-info">
              <div class="follow">
                <span>{{ detailData.userNickName }}</span>
                <custom-button
                  :placeholder="'팔로우'"
                  :custom-class="followType.STATE === 'FOLLOW' ? 'followActive' : 'follow_btn'"
                  @click="followManager"
                  @update:value="followData.targetIdx"
                ></custom-button>
              </div>
              <p class="content-wrap-profile-info-intro">{{ detailData.boardBody }}</p>
              <p class="content-wrap-profile-info-tag">{{ detailData.hashTag }}</p>
            </div>
          </div>
          <div class="content-wrap-emotion">
            <div class="content-wrap-emotion-like">
              <span v-if="heartCount < 1" @click="doLike"><i class="fa-regular fa-heart"></i></span>
              <span v-else @click="doLike"><i class="fa-solid fa-heart"></i></span>
              <span>{{ heartCount }}</span>
            </div>
            <div class="content-wrap-emotion-book">
              <span v-if="bookmark < 1" @click="bookmarkActive"><i class="fa-regular fa-bookmark"></i></span>
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
            <span>조회수 없음</span>
          </div>
        </div>
        <div class="content-enterComment">
          <div class="content-enterComment-wrap">
            <custom-input
              :custom-class="'comment'"
              :placeholder="'댓글을 입력해주세요.'"
              v-model="inputComment"
              @update:value="commentData.commentBody = $event"
            />
            <img src="/assets/image/icon/breakArrow.png" alt="" />
          </div>
          <button @click="upComment"><i class="fa-regular fa-comment"></i></button>
        </div>
        <div class="content-null" v-if="commentListData.length === 0">
          <div class="state">댓글이 없습니다.</div>
        </div>
        <div class="content-comments" v-for="item in commentListData" v-else>
          <img src="/assets/image/iugold5.png" alt="" />
          <div class="content-comments-wrap">
            <span>{{ item.userNickName }}</span>
            <p>{{ item.commentBody }}</p>
          </div>
          <div class="content-comments-option">
            <span class="date">{{ item.dateReg }}</span>
            <span> <i class="fa-regular fa-comment"></i></span>
            <span @click="RerCommentOption(item)"><i class="fa-solid fa-ellipsis-vertical"></i></span>
          </div>
          <div class="commentPop" v-if="item.commentIdx === MySelectedComment">
            <ul>
              <li @click="putCommentIdx(item.commentIdx)">삭제</li>
              <li @click="reportPop">신고</li>
              <li>취소</li>
            </ul>
          </div>
          <div class="commentPop" v-if="item.commentIdx === selectedComment">
            <ul>
              <li @click="reportPop">신고</li>
              <li>취소</li>
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
    <div v-if="reportAction" class="detailBlack">
      <report-popup :reportPop="reportPop"></report-popup>
    </div>
  </div>
</template>
