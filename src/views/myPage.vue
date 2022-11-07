<script>
import customButton from "../components/layout/customButton.vue";
import customInput from "../components/layout/customInput.vue";
import { ref } from "vue";
import snsContentPage from "../components/snsBoard/snsContentPage.vue";
import UpdateProfile from "../components/myPage/updateProfile.vue";
import MyReview from "../components/myPage/myReview.vue";

export default {
  name: "myPage",
  components: {
    MyReview,
    UpdateProfile,
    snsContentPage,
    customButton,
    customInput,
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
      console.log(v);
      tabIndex.value = v;
    };

    const profileInfo = ref({
      backgroundPicture: "/assets/image/camping.png",
      profilePicture: "/assets/image/bgs.png",
      temperature: "100.0",
      nickName: "베어 물어쓰",
      introduce: "캠핑을 좋아하는 30대 아저씨에요^^",
    }); // 소개에 띄워줄 내용

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
        <sns-content-page v-if="tabIndex === tabType.FEED" />
        <sns-content-page v-else-if="tabIndex === tabType.SELL" />
        <sns-content-page v-else-if="tabIndex === tabType.RENT" />
        <sns-content-page v-else-if="tabIndex === tabType.SAVE" />
        <my-review v-else-if="tabIndex === tabType.REVIEW" />
        <update-profile v-else-if="tabIndex === tabType.EDIT" />
        <v-pagination v-model="page" :length="15"></v-pagination>
      </div>
    </div>
  </div>
</template>
