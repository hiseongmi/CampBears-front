<script>
import {onMounted, ref} from "vue";
import {apiClient} from "../../../utils/axios.js";
import CustomButton from "../../layout/customButton.vue";
import CustomInput from "../../layout/customInput.vue";
import {getStore, POPUP_TYPE, STORE_TYPE} from "../../../store/index.js";
import router from "../../../router/index.js";


export default {
  name: "writeBoardPopup",
  components: {CustomInput, CustomButton,},
  props: {
    clickClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const store = getStore();
    const isPopup = ref(store.state.popupType);

    const upLoadData = ref({
      boardBody: "",
      optionList: ["SHOWER", "PARMERCY", "CAFE", "FITTING", "SUBWAY", "MARKET", "STORE", "DRINK", "PARK", "RESTROOM", "STARBUCKS", "MOVIE", "RESTAURANT", "SHUTTLE"],
    });
    const upLoad = async () => {
      const data = await apiClient("/sns/insert", upLoadData.value);
      console.log(upLoadData.value.boardBody);
      console.log(data);
      if (data.resultCode === 0) {
        router.go();
        store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE); //팝업 닫기
      } else {
        window.alert("내용을 입력해주세요.");
      }
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
    // onMounted(initMap)
    // const addScript = () => {
    //   const script = document.createElement("script");
    //   script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false$appkey=37b652b280e20ff8c7240ecd75bfdbb5`;
    //   script.onload = () => window.kakao.maps.load(initMap);
    //   document.head.appendChild(script);
    //   initMap();
    // };


    return {
      // addScript,
      initMap,
      pAction,
      position,
      upLoadData,
      upLoad,
      isPopup,
    };
  },
  // data() {
  //   return {
  //     map: null,
  //   };
  // },
  // created() {
  //   if (window.kakao && window.kakao.maps) {
  //     this.initMap();
  //   } else {
  //     // const script = document.createElement("script");
  //     // script.onload = () => kakao.maps.load(initMap);
  //     // script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=37b652b280e20ff8c7240ecd75bfdbb5";
  //     // document.head.appendChild(script);
  //   }
  // },
  // methods: {
  //   initMap() {
  //     const container = document.getElementById("map");
  //     const options = {
  //       center: new kakao.maps.LatLng(33.450701, 126.570667),
  //       level: 5,
  //     };
  //     this.map = new kakao.maps.Map(container, options);
  //     this.displayMarker([[this.latitude, this.longitude]]);
  //   },
  // },
};
</script>
<template>
  <div class="modal-inner">
    <div class="save-btn">
      <custom-button :customClass="'cancel'" :placeholder="'취소'" :onClick="clickClose"/>
      <div class="save-btn-wrap">
        <custom-button :customClass="'save'" :placeholder="'저장'" :onClick="clickClose"/>
        <custom-button :customClass="'upLoad'" :placeholder="'올리기'" :onClick="upLoad"/>
      </div>
    </div>
    <div class="modal-inner-wrap">
      <div class="content">
        <div class="file">
          <input type="file"/>
        </div>
        <div class="content-profile">
          <div class="content-profile-wrap">
            <img src="/assets/image/IU.png">
            <span>dlwlrma</span>
          </div>
          <div class="content-profile-public">
            <span>전체공개</span>
            <span>비공개</span>
          </div>
        </div>
        <div class="content-content">
          <custom-input :custom-class="'content'" :placeholder="'문구 입력...'"
                        @update:value="upLoadData.boardBody = $event"/>
          <div class="count">
            (0 / 200)
          </div>
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
          <div class="content-tag-wrap">
            <custom-input :custom-class="'content'" :placeholder="'# 태그입력 (최대 30개)'"></custom-input>
          </div>
        </div>
        <div class="comment">
          test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test
        </div>
      </div>
    </div>
    <div class="modal-inner-map" v-if="pAction">
      <div id="map">

      </div>

      <div class="modal-inner-map-btn">
        <span @click="position">취소</span>
        <span @click="initMap">완료</span>
      </div>
    </div>

  </div>

</template>

