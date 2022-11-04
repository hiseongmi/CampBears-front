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
        <span class="temperature">
          불멍온도 {{ profileInfo.temperature }}
          <svg width="12" height="13" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.5558 0.157967C3.72991 -0.0559007 4 -0.052971 4.17411 0.160896C4.79018 0.919685 5.3683 1.73707 5.90848 2.62183C6.15402 2.19996 6.43304 1.74 6.73438 1.365C6.91071 1.1482 7.18304 1.1482 7.35938 1.36793C8.1317 2.33472 8.78572 3.61207 9.24554 4.82496C9.69866 6.02027 10 7.24195 10 8.10328C10 11.8416 7.77232 14.9998 5 14.9998C2.19643 14.9998 0 11.8386 0 8.10035C0 6.97535 0.397321 5.60133 1.01339 4.24195C1.63616 2.86207 2.51563 1.42359 3.5558 0.157967ZM5.03795 12.1873C5.60268 12.1873 6.10268 11.9822 6.57366 11.572C7.51339 10.7107 7.76563 8.98804 7.20089 7.63453C7.13839 7.47047 7.07589 7.3064 6.98214 7.14234L5.85268 8.865C5.85268 8.865 4.03571 5.82984 3.90848 5.62476C2.97098 7.14234 2.5 8.00367 2.5 8.98804C2.5 10.9978 3.62946 12.1873 5.03795 12.1873Z"
              fill="black"
            />
          </svg>
        </span>
        <span class="nickName">{{ profileInfo.nickName }}</span>
        <span class="introduce">
          {{ profileInfo.introduce }}
          <custom-button class="profileEdit" :onClick="() => componentChange(tabType.EDIT)">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.11581 13.0483H13.2316"
                stroke="#4C4C4C"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.1737 1.83627C10.4441 1.56594 10.8107 1.41406 11.193 1.41406C11.3823 1.41406 11.5698 1.45135 11.7447 1.52379C11.9196 1.59623 12.0785 1.70241 12.2123 1.83627C12.3462 1.97013 12.4524 2.12904 12.5248 2.30393C12.5973 2.47882 12.6346 2.66627 12.6346 2.85558C12.6346 3.04488 12.5973 3.23233 12.5248 3.40722C12.4524 3.58211 12.3462 3.74102 12.2123 3.87488L3.71814 12.3691L1 13.0486L1.67954 10.3305L10.1737 1.83627Z"
                stroke="#4C4C4C"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
