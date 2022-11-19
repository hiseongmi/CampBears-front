<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";
import { getStore, POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
import router from "../../../router/index.js";
import commonUtil from "../../../utils/common-util.js";
import { CONSTANTS } from "../../../constants.js";
import CustomInputFileButton from "../../layout/customInputFileButton.vue";

export default {
  name: "writeBoardPopup",
  components: { CustomInputFileButton, CustomInput, CustomButton },
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const userData = ref();
    const getData = async () => {
      userData.value = commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      console.log(userData.value);
    };
    const publicType = {
      All: "ALL",
      FOLLOW: "FOLLOW",
    };
    const publicIndex = ref();
    const checkValue = v => {
      publicIndex.value = v;
    };

    const store = getStore();
    const isPopup = ref(store.state.popupType);

    const upLoadData = ref({
      boardBody: "",
      optionList: ["SHOWER", "PARMERCY", "CAFE", "FITTING", "SUBWAY", "MARKET", "STORE", "DRINK", "PARK", "RESTROOM", "STARBUCKS", "MOVIE", "RESTAURANT", "SHUTTLE"],
    });
    const inputHashTag = ref("");
    const hashTagList = ref([]);
    // const headers = { "Content-Type": "multipart/form-data" };
    const uploadSnsBoard = async () => {
      // const param = Object.assign({}, upLoadData.value, { hashTag: hashTagList.value });
      // console.log(param);
      SNSFormData.append("boardBody", upLoadData.value.boardBody);
      if (hashTagList.value) {
        SNSFormData.append("hashTag", hashTagList.value);
      } else {
        hashTagList.value = " ";
      }
      const data = await apiClient("/sns/insert", SNSFormData);
      if (data.resultCode === 0) {
        router.go();
        store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE); //팝업 닫기
      } else {
        window.alert("다시 시도해주세요.");
      }
    };
    //이미지 업로드
    const SNSImgPreview = ref();
    let SNSFormData = new FormData();
    const upFileChange = (e) => {
      SNSImgPreview.value = URL.createObjectURL(e.target.files[0]); //blob 객체를 가상의 URL을 부여하여 접근할수있게함
      SNSFormData.append("file", e.target.files[0]);
      // SNSFormData.append("optionList", upLoadData.value.optionList);
      // SNSFormData.append("hashTag", hashTagList.value);
    };

    //태그 지우기
    const deleteTag = (index) => {
      hashTagList.value.index = index;
      hashTagList.value.splice(hashTagList.value.index, 1);
    };

    const pAction = ref(false);
    const position = () => {
      pAction.value = !pAction.value;
    };
    //kakao 지도
    const initMap = () => {
      // if (window.kakao && window.kakao.maps) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.71173, 126.88878),
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, options);
      console.log(map);
      // } else {
      //   addScript();
      // }
    };

    const handleInput = (e) => {
      let target = e.target.value;
      target = target.trim();
      // if (target.includes("#")) {
      //   console.log(target.includes("#"));
      // }
      if (target[0] === "#") {
        inputHashTag.value = target;
      } else {
        const eng = /^[a-z|A-Z]+$/;
        if (eng.test(e.target.value)) {
          e.target.value = "#" + e.target.value;
        } else {
          e.target.value = "#" + e.target.value.substring(1);
        }
        // inputHashTag.value = "#" + inputHashTag.value;
      }
    };

    const handleEnterEvent = (e) => {
      // inputHashTag.value = inputHashTag.value.trim();
      if (e.key === "Enter") {
        if (inputHashTag.value[0] === "#" && inputHashTag.value.length >= 2) {
          const param = inputHashTag.value.substring(1).trim();
          hashTagList.value.push(param);
          inputHashTag.value = "";
        }
      }

    };
    const getImgUrl = (file) => {
      try {
        if (file) {
          return commonUtil.getImgUrl(file.fileName);
        }
      } catch (e) {
        return "./assets/image/camping.png";
      }
    };
    onMounted(() => {
      getData();
    });

    return {
      SNSImgPreview,
      userData,
      publicType,
      publicIndex,
      pAction,
      upLoadData,
      isPopup,
      inputHashTag,
      hashTagList,
      // imgPreview,
      getImgUrl,
      getData,
      upFileChange,
      deleteTag,
      checkValue,
      initMap,
      position,
      uploadSnsBoard,
      handleInput,
      handleEnterEvent,
    };
  },
};
</script>
<template>
  <div class="modal-inner">
    <div class="save-btn">
      <custom-button :customClass="'cancel'" :placeholder="'취소'" :onClick="clickClose" />
      <div class="save-btn-wrap">
        <custom-button :customClass="'save'" :placeholder="'저장'" :onClick="clickClose" />
        <custom-button :customClass="'upLoad'" :placeholder="'올리기'" :onClick="uploadSnsBoard" />
      </div>
    </div>
    <div class="modal-inner-wrap">
      <form>
        <div class="content">
          <div class="content-file">
            <div class="content-file-img">
              <img class="content-file-img-no" v-if="!SNSImgPreview" :src="upLoadData.file" alt="" />
              <img class="content-file-img-yes" v-else :src="SNSImgPreview" alt="" />
            </div>
            <custom-input-file-button @change="upFileChange" />
          </div>
          <!--          <div class="content-profile">-->
          <!--                        <div class="content-profile-wrap">-->
          <!--                          <img src="/assets/image/IU.png">-->
          <!--                          <span>{{ userData.userNickName }}</span>-->
          <!--                        </div>-->

          <!--          </div>-->
          <div class="content-content">
            <custom-input :custom-class="'content'" :placeholder="'문구 입력...'"
                          @update:value="upLoadData.boardBody = $event" />
            <div class="count">
              (0 / 200)
            </div>
          </div>
          <div class="content-profile-public">
            <custom-button
              :placeholder="'전체 공개'"
              :onClick="() => checkValue(publicType.All)"
              :custom-class="publicIndex === publicType.All ? 'active' : ''"
            />
            <custom-button
              :placeholder="'팔로워 공개'"
              :onClick="() => checkValue(publicType.FOLLOW)"
              :custom-class="publicIndex === publicType.FOLLOW ? 'active' : ''"
            />
          </div>
          <div class="content-position">
            <div class="content-position-wrap">
              <span class="title">위치태그</span>
              <span @click="position"><i class="fa-solid fa-chevron-right"></i></span>
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
              <div>
                range slider
              </div>
            </div>
          </div>
          <div class="content-tag">
            <div class="content-tag-div">
              태그 설정
            </div>
            <div class="content-tag-main" v-if="hashTagList.length > 0 ">
              <div class="content-tag-main-content" v-for="(item,index) in hashTagList" :key="index">#{{ item }}
                <span class="deleteTag" @click="deleteTag(index)">x</span>
              </div>
            </div>
            <div class="content-tag-wrap">
              <input type="text" placeholder="# 태그입력...(최대 30개)" v-model="inputHashTag" @keydown="handleEnterEvent"
                     @input="handleInput">
            </div>
          </div>
          <!--        <div class="comment">-->
          <!--          <div id="map">-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
      </form>
    </div>
    <div class="modal-inner-map" v-if="pAction">
      <div id="map">
      </div>
      <div class="modal-inner-map-btn">
        <span @click="position">취소</span>
        <span @click="initMap">지도보기</span>
      </div>
    </div>

  </div>

</template>

