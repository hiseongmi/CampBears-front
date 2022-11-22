<script>
import store, { POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import { computed, onMounted, onUnmounted, ref } from "vue";
import postImage from "../../../data/postImage.js";
import { apiClient } from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";
import router from "../../../router/index.js";
import dayjs from "dayjs";
import reportPopup from "./reportPopup.vue";
import commonUtil from "../../../utils/common-util.js";
import { CONSTANTS } from "../../../constants.js";

export default {
  name: "detailScreenPopup",
  components: { CustomButton, CustomInput, reportPopup },
  props: {
    clickClose: {
      type: Function,
      required: true
    }
  },

  setup() {
    //로컬스토리지에 저장된 유저정보
    const userData = ref();
    const getData = async () => {
      userData.value = commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
    };
    const goToReport = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.REPORT);
    }; //신고창열기
    const goToUpdate = (detailData) => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.UPDATE);
    }; //수정팝업열기

    // 해당 유저를 팔로우 하고 있는지, 아닌지
    const followType = ref({
      STATE: "UNFOLLOW"
    });
    const followData = ref({
      followType: "", // 내가 지금 팔로우 할 건지, 아닌지
      targetIdx: "",
      targetType: "USER"
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
      const data = await apiClient("/common/doFollow", followData.value);
    };
    //좋아요
    const heartCount = ref(0);
    const heartState = ref({
      STATE: "DISLIKE"
    });
    const heartData = ref({
      targetIdx: "",
      likeType: "",
      targetType: "USER"
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
      userNickName: ""
    });

    const detail = async () => {
      const data = await apiClient("/sns/getSnsDetail", detailData.value);
      detailData.value = data.data;
      detailData.value.userProfile = detailData.value.userProfile.filter(v => v.fileType === "USER_PROFILE")[0];
      //filter로 타입이 user_profile 인것을 [0]로 넣는다
      if (detailData.value) {
        followData.value.targetIdx = detailData.value.userIdx;
      }
      if (detailData.value) {
        heartData.value.targetIdx = detailData.value.userIdx;
      }
      await commentList();
    };
    const MyRerAction = ref(false);
    const RerAction = ref(false);
    const RerOption = () => {
      if (userData.value.userIdx === detailData.value.userIdx) {
        MyRerAction.value = !MyRerAction.value;
      } else {
        RerAction.value = !RerAction.value;
      }
    }; //수정신고삭제 옵션
    const FollowAction = ref(false);
    const Follow = () => {
      if (userData.value.userIdx !== detailData.value.userIdx) {
        FollowAction.value = true;
      } else {
        FollowAction.value;
      }
    };


    const reportAction = ref(false);
    const reportPop = () => {
      reportAction.value = !reportAction.value;
    };

    //게시물 삭제 api
    const deleteData = ref({
      boardIdx: store.state.boardIdx
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
        commentListData.value = data.data;
      } else {
      }
    };

    const setDateValue = (date) => {
      const b = dayjs(date.dateReg, "YYYY-MM-DD HH:mm");
      return b.format("YYYY-MM-DD HH:mm");
    };

    const MySelectedComment = ref("");
    const selectedComment = ref("");

    //댓글 수정 신고 삭제 옵션
    const RerCommentOption = comment => {
      if (detailData.value.userIdx === userData.value.userIdx || userData.value.userIdx === comment.userIdx) {
        MySelectedComment.value = comment.commentIdx; //특정만 나와
      } else if (detailData.value.userIdx === userData.value.userIdx) {
        selectedComment.value = comment.commentIdx;
      }
    };


    //댓글 추가 api
    const handleEnterEvent = (e) => {
      if (e.key === "Enter") {
        upComment();
        commentData.value.commentBody = "";
      }
    };
    const commentData = ref({
      boardIdx: store.state.boardIdx,
      commentBody: ""
    });
    const upComment = async () => {
      const data = await apiClient("/comment/insertComment", commentData.value);
      if (data.resultCode === 0) {
        commentData.value.commentBody = "";
        await commentList();
      } else {
        window.alert("댓글을 입력해주세요");
      }
    };
    //댓글 삭제 api
    const deleteCommentData = ref({
      commentIdx: ""
    });
    const putCommentIdx = commentIdx => {
      deleteCommentData.value.commentIdx = commentIdx;
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

    const getImgUrl = (file) => {
      try {
        if (file) {
          return commonUtil.getImgUrl(file.fileName);
        }
      } catch (e) {
        return "./assets/image/camping.webp";
      }
    };
    onMounted(() => {
      getData();
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
      reportAction,
      selectedComment,
      MySelectedComment,
      postImage,
      Follow,
      getData,
      handleEnterEvent,
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
      getImgUrl,
      setDateValue
    };
  }
};
</script>
<template>
  <div class="modal-detail">
    <div class="modal-detail-content">
      <div class="content">
        <div>
          <div class="container" @click="RerOption">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
          <div class="myPop" v-if="MyRerAction">
            <ul>
              <li @click="goToUpdate(detailData)">수정</li>
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
        <div class="content-close" @click="closePopup">
          <span><i class="fa-solid fa-xmark"></i></span>
        </div>
        <div class="content-image">
          <img v-for="item in detailData.file" :src="getImgUrl(item)" alt="게사" />
        </div>
        <div class="content-wrap">
          <div class="content-wrap-profile">
            <!--            {{ detailData.userProfile.fileName }}-->
            <img :src="getImgUrl(detailData.userProfile)" alt="프사" />
            <div class="content-wrap-profile-info">
              <div class="follow">
                <span>{{ detailData.userNickName }}</span>
                <custom-button
                  v-if="userData?.userIdx !== detailData.userIdx"
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
            <input
              placeholder="댓글을 입력해주세요. ⤶"
              v-model.trim="commentData.commentBody"
              @keydown="handleEnterEvent"
            />
          </div>
          <button @click="upComment"><i class="fa-regular fa-comment"></i></button>
        </div>
        <div class="content-null" v-if="commentListData.length === 0">
          <div class="state">댓글이 없습니다.</div>
        </div>
        <div class="content-comments" v-for="item in commentListData" v-else>
          <img :src="item.file ? getImgUrl(item.file[0]) : '' " alt="프사" />
          <div class="content-comments-wrap">
            <span>{{ item.userNickName }}</span>
            <p>{{ item.commentBody }}</p>
          </div>
          <div class="content-comments-option">
            <span class="date">{{ setDateValue(item) }}</span>
            <span> <i class="fa-regular fa-comment"></i></span>
            <span @click="RerCommentOption(item)"><i class="fa-solid fa-ellipsis-vertical"></i></span>
          </div>
          <div>
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
