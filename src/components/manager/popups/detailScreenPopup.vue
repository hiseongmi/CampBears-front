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
    }; //신고창열기
    const goToUpdate = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.UPDATE);
    }; //수정팝업열기

    const RerAction = ref(false);
    const RerOption = () => {
      RerAction.value = !RerAction.value;
    }; //수정신고삭제 옵션
    const RerCommentActive = ref(false);
    const RerCommentOption = commentIdx => {
      store.commit(STORE_TYPE.commentIdx, commentIdx);
      console.log(store.state.commentIdx);
      if (store.state.commentIdx) {
        RerCommentActive.value = !RerCommentActive.value;
      } else {
        console.log("x");
      }
    }; //댓글 수정 신고 삭제 옵션

    const followData = ref({ followType: "", targetIdx: "", targetType: "" });
    const follow = async () => {
      const data = await apiClient("/common/doFollow", followData.value);
      console.log(followData.value);
      console.log(data);
    }; //팔로우 매니저

    //상세 게시물 조회 api
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
      console.log("이 글 내용 : ", detailData.value.boardBody);
      await commentList();
    };
    //게시물 삭제 api
    const deleteData = ref({
      boardIdx: store.state.boardIdx,
    });
    const deleteContent = async () => {
      const data = await apiClient("/sns/deleteSns", deleteData.value);
      if (data.resultCode === 0) {
        console.log(data);
        console.log(data.data);
        window.alert("삭제되었습니다.");
        // await getContent();
        closePopup();
        router.go(); //새로고침
      } else {
        window.alert("다시시도해주세요");
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
      } else {
        console.log("댓글 조회에 실패했습니다.");
      }
    };
    //댓글 추가 api
    const commentData = ref({
      boardIdx: store.state.boardIdx,
      commentBody: "",
    });
    const upComment = async () => {
      const data = await apiClient("/comment/insertComment", commentData.value);
      if (data.resultCode === 0) {
        console.log("추가한 댓글 : ", commentData.value.commentBody);
        await commentList();
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
      console.log("이 댓글 idx: ", deleteCommentData.value.commentIdx);
      deleteComment();
    }; //댓글 idx를 리스트에 담는다.
    const deleteComment = async () => {
      const data = await apiClient("/comment/deleteComment", deleteCommentData.value);
      if (data.resultCode === 0) {
        console.log(data);
        window.alert("삭제되었습니다.");
        await detail();
      } else {
        window.alert("다시 시도해주세요");
      }
    };
    //팝업 닫기
    const closePopup = () => {
      //popup close
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
      putCommentIdx,
      deleteCommentData,
      deleteComment,
      getComment,
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
      RerAction,
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
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div class="pop" v-if="RerAction">
          <ul>
            <li @click="goToUpdate">수정</li>
            <li @click="deleteContent">삭제</li>
            <li @click="goToReport">신고 <i class="fa-solid fa-circle-exclamation"></i></li>
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
                  :custom-class="'follow_btn'"
                  @click="follow"
                  @update:value="followData.targetIdx"
                ></custom-button>
              </div>
              <p class="content-wrap-profile-info-intro">{{ detailData.boardBody }}</p>
              <p class="content-wrap-profile-info-tag">{{ detailData.hashTag }}</p>
            </div>
          </div>
          <div class="content-wrap-emotion">
            <div class="content-wrap-emotion-like">
              <span v-if="heartCount < 1" @click="heartActive"><i class="fa-regular fa-heart"></i></span>
              <span v-else @click="heartActive"><i class="fa-solid fa-heart"></i></span>
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
          <img src="/assets/image/iugold5.png" />
          <div class="content-comments-wrap">
            <span>{{ item.userNickName }}</span>
            <p>{{ item.commentBody }}</p>
          </div>
          <div class="content-comments-option">
            <span class="date">{{ item.dateReg }}</span>
            <span> <i class="fa-regular fa-comment"></i></span>
            <span @click="RerCommentOption(item.commentIdx)"><i class="fa-solid fa-ellipsis-vertical"></i></span>
          </div>
          <div class="commentPop" v-if="RerCommentActive">
            <ul>
              <li @click="putCommentIdx(item.commentIdx)">삭제</li>
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
