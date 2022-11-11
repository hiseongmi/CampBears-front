<script>
import customButton from "../components/layout/customButton.vue";
import customInput from "../components/layout/customInput.vue";
import { onMounted, ref } from "vue";
import snsContentPage from "../components/snsBoard/snsContentPage.vue";
import UpdateProfile from "../components/myPage/updateProfile.vue";
import MyReview from "../components/myPage/myReview.vue";
import myFeed from "../components/myPage/myFeedBoard.vue";
import pagination from "../components/layout/customPagination.vue";
import { apiClient } from "../utils/axios.js";
import commonUtil from "../utils/common-util.js";

export default {
  name: "myPage",
  components: {
    myFeed,
    MyReview,
    UpdateProfile,
    snsContentPage,
    customButton,
    customInput,
    pagination,
  },
  setup() {
    const tabType = {
      FEED: "feed",
      SELL: "sell",
      RENT: "rent",
      SAVE: "save",
      REVIEW: "review",
      EDIT: "profileUpdate",
    }; // 컴포넌트 이름

    const tabIndex = ref(tabType.FEED);

    const componentChange = v => {
      //console.log(v);
      tabIndex.value = v;
    };

    const profileInfo = ref({
      backgroundPicture: "/assets/image/camping.png",
      profilePicture: "/assets/image/bgs.png",
      temperature: "100.0",
      nickName: "베어 물어쓰",
      introduce: "캠핑을 좋아하는 30대 아저씨에요^^",
    }); // 소개에 띄워줄 내용

    const getMyInfo = async () => {
      const data = await apiClient("user/getMe", {});
      if (data) {
        console.log(data);
        profileInfo.value.nickName = data.data.userNickName;
        profileInfo.value.profilePicture = commonUtil.getImgUrl(data.data.fileName);
      }
    };

    onMounted(() => {
      getMyInfo();
    });

    return {
      profileInfo,
      tabIndex,
      tabType,
      componentChange,
      page: 1,
    };
  },
};
</script>

<template>
  <div class="myPage">
    <div class="myProfile">
      <img class="backgroundPicture" :src="profileInfo.backgroundPicture" alt="" />
      <img class="profilePicture" :src="profileInfo.profilePicture" alt="" />
      <div class="profileIntroduce">
        <span class="nickName">{{ profileInfo.nickName }}</span>
        <span class="introduce">
          {{ profileInfo.introduce }}
          <custom-button class="profileEdit" :onClick="() => componentChange(tabType.EDIT)">
            <img src="/assets/image/icon/penWrite.png" alt="" />
            <span>프로필 편집</span>
          </custom-button>
        </span>
      </div>
    </div>
    <div class="myContents">
      <div class="tabBar">
        <custom-button
          :placeholder="'피드'"
          :onClick="() => componentChange(tabType.FEED)"
          :custom-class="tabIndex === tabType.FEED ? 'active' : ''"
        />
        <custom-button
          :placeholder="'판매'"
          :onClick="() => componentChange(tabType.SELL)"
          :custom-class="tabIndex === tabType.SELL ? 'active' : ''"
        />
        <custom-button
          :placeholder="'대여'"
          :onClick="() => componentChange(tabType.RENT)"
          :custom-class="tabIndex === tabType.RENT ? 'active' : ''"
        />
        <custom-button
          :placeholder="'저장'"
          :onClick="() => componentChange(tabType.SAVE)"
          :custom-class="tabIndex === tabType.SAVE ? 'active' : ''"
        />
        <custom-button
          :placeholder="'후기'"
          :onClick="() => componentChange(tabType.REVIEW)"
          :custom-class="tabIndex === tabType.REVIEW ? 'active' : ''"
        />
      </div>
      <div class="contents-area">
        <my-feed v-if="tabIndex === tabType.FEED" />
        <my-feed v-else-if="tabIndex === tabType.SELL" />
        <sns-content-page v-else-if="tabIndex === tabType.RENT" />
        <sns-content-page v-else-if="tabIndex === tabType.SAVE" />
        <my-review v-else-if="tabIndex === tabType.REVIEW" />
        <update-profile v-else-if="tabIndex === tabType.EDIT" />
      </div>
    </div>
  </div>
</template>
