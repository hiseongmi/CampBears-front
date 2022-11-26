<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";
import store, { getStore, POPUP_TYPE, STORE_TYPE } from "../../../store/index.js";
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
    goDetail: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const userData = ref();
    const getData = async () => {
      try {
        return userData.value = commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO));
      } catch (e) {
        return e;
      }
    };
    const editState = ref(true);

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
    const uploadSnsBoard = async () => {
      console.log(upLoadData.value.boardBody);
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
    const updateBoardData = ref();
    const updateData = ref({
      boardIdx: store.state.boardIdx,
      boardBody: store.state.detailData.boardBody,
      hashTag: store.state.detailData.hashTag,
    });
    let hashTag = "";
    const updateBoard = async () => {
      hashTag = store.state.detailData.hashTag.split(",");
      const param = Object.assign({}, updateData.value, { hashTag: hashTag });
      const data = await apiClient("/sns/updateSns", param);
      updateBoardData.value = data.data;
      console.log(updateBoardData.value);

      // if (data.resultCode === 0) {
      //   window.alert("수정되었습니다.");
      //   await store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
      // } else {
      //   window.alert("다시 시도해주세요.");
      // }

    };
    //이미지 업로드
    const SNSImgPreview = ref([]);
    let SNSFormData = new FormData();
    const upFileChange = (e) => {
      let SNSFileList = e.target.files;
      if (SNSFileList.length < 1) {
        window.alert("사진을 한 장 이상 넣어주세요.");
      } else if (SNSFileList.length < 11) {
        let i;
        for (i = 0; i < SNSFileList.length; i++) {
          SNSImgPreview.value.push(URL.createObjectURL(SNSFileList[i])); //blob 객체를 가상의 URL을 부여하여 접근할수있게함
          SNSFormData.append("file", SNSFileList[i]);
        }
      } else {
        window.alert("사진은 열 장까지.");
      }
    };
    const tabIndex = ref(0);
    const changeImg = index => {
      tabIndex.value = index;
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
        return "./assets/image/camping.webp";
      }
    };
    onMounted(() => {
      getData();
      if (store.state.detailData === "") {
        editState.value = true;
      } else {
        console.log(store.state.detailData);
        editState.value = false;
      }
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
      tabIndex,
      // imgPreview,
      updateBoardData,
      updateData,
      editState,
      updateBoard,
      changeImg,
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
    <div class="save-btn" v-if="editState">
      <custom-button :customClass="'cancel'" :placeholder="'취소'" :onClick="clickClose" />
      <div class="save-btn-wrap">
        <custom-button :customClass="'save'" :placeholder="'저장'" :onClick="clickClose" />
        <custom-button :customClass="'upLoad'" :placeholder="'올리기'" :onClick="uploadSnsBoard" />
      </div>
    </div>
    <div class="save-btn" v-else>
      <custom-button :customClass="'cancel'" :placeholder="'취소'" :onClick="goDetail" />
      <div class="save-btn-wrap">
        <custom-button :customClass="'upLoad'" :placeholder="'수정'" :onClick="updateBoard" />
      </div>
    </div>
    <div class="modal-inner-wrap">
      <form>
        <div class="content">
          <div class="content-file">
            <div class="content-file-img">
              <div v-if="!SNSImgPreview.length > 0" />
              <div v-else class="content-file-img-wrap">
                <img :src="SNSImgPreview[tabIndex]" alt="" />
              </div>
            </div>
            <div class="content-file-up" v-if="SNSImgPreview">
              <div v-for=" (item , index) in SNSImgPreview" class="content-file-up-preview">
                <img @click="changeImg(index)" :src="item" alt="" />
              </div>
            </div>
            <custom-input-file-button @change="upFileChange" />
          </div>
          <div class="content-content" v-if="editState">
            <input placeholder="문구 입력..." v-model="upLoadData.boardBody" />
            <div class="count">
              ({{ upLoadData.boardBody.length }} / 200 )
            </div>
          </div>
          <div class="content-content" v-else>
            <input placeholder="문구 입력..." v-model="updateData.boardBody" />
            <div class="count">
              ({{ updateData.boardBody.length }} / 200 )
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
          <div class="content-tag" v-if="editState">
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
          <div class="content-tag" v-else>
            <div class="content-tag-div">
              태그 설정
            </div>
            <div class="content-tag-main" v-if="hashTagList.length > 0 ">
              <div class="content-tag-main-content" v-for="(item,index) in updateBoardData.hashTag"
                   :key="index">
                #{{ item }}
                <span class="deleteTag" @click="deleteTag(index)">x</span>
              </div>
            </div>
            <div class="content-tag-wrap">
              <input type="text" placeholder="# 태그입력...(최대 30개)"
                     v-model="inputHashTag"
                     @keydown="handleEnterEvent"
                     @input="handleInput">
            </div>
          </div>
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

