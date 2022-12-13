<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import store, { POPUP_TYPE, STORE_TYPE } from "../store/index.js";
import { useStore } from "vuex";
import customInput from "../components/layout/customInput.vue";
import ComparisonSideBar from "../components/comparisonSideBar.vue";

export default {
  name: "campingInfo",
  components: { ComparisonSideBar, customInput },

  setup() {
    const store = useStore();

    const page = ref(1); //페이지 장

    const api = axios.create({
      baseURL: "http://apis.data.go.kr/B551011/GoCamping",
      timeout: 1000 * 60 * 3,
      headers: { "content-type": "Json" },
    });
    //로딩바
    // api.interceptors.request.use(())

    const index = ref(0);

    const keyword = ref("");
    const value = ref("");
    const dataList = ref([]);
    // const dataLList = ref([]);
    //페이지네이션
    const setRowCount = value => {
      page.value = value;
      getCampInfo();
      window.scrollTo(0, 0);
      // console.log(dataList.value);
    };
    // const getCampserch = async () => {
    //   const e = await api.get(
    //     // `/basedList?numOfRows=10&pageNo=${page.value}&MobileOS=ECT&MobileApp=bears&serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D`,
    //     `/searchList?numOfRows=1&pageNo=1&MobileOS=ECT&MobileApp=bears&serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D&keyword=animalCmgCl`,
    //   );
    //   // console.log(e);
    //   // console.log(e.data.response);
    //   // console.log(e.data.response.body.items);
    //   // const data = e.data.response.body.items.item;
    //
    //   data.map(v => {
    //     const dataSet = {
    //       contentId: v.contentId,
    //       campingName: v.facltNm,
    //       campingIntro: v.lineIntro,
    //       campingManageMode: v.facltDivNm,
    //       campingTypes: v.induty,
    //       address: v.addr1,
    //       mapX: v.mapX,
    //       mapY: v.mapY,
    //       tel: v.tel,
    //       homePageUrl: v.homepage,
    //       thumbNailUrl: v.firstImageUrl,
    //       campInnerOption: v.glampInnerFclty,
    //       campOuterOption: v.sbrsCl,
    //       getInAnimal: v.animalCmgCl,
    //       createdDate: v.modifiedtime,
    //       resveUrl: v.resveUrl,
    //       doNm: v.doNm,
    //       // lineIntro: i.getElementsByTagName("lineIntro")[0].innerHTML,
    //     };
    //     dataLList.value.push(dataSet);
    //   });
    // };

    const getCampInfo = async () => {
      if (dataList.value && dataList.value.length > 0) dataList.value = []; //초기화
      let url = `/basedList?serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D&numOfRows=10&pageNo=${page.value}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
      if (keyword.value && keyword.value !== "" && keyword.value !== undefined) {
        url = `/searchList?pageNo=${
          page.value
        }&MobileOS=ETC&MobileApp=bears&_type=json&serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D&keyword=${encodeURIComponent(keyword.value)}`;
      }
      // console.log(url);
      const d = await api.get(url);

      //https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json
      // console.log(d);
      // console.log(d.data.response);

      // console.log(dataList.value);
      // if (d.data.response.body.items && d.data.response.body.items.length > 0) {

      const data = d.data.response.body.items.item;
      // function filterNum(tel) {
      //   return eventNumbers.filter(function (x) {
      //     return x.data[i].include(tel);
      //   });
      // }
      // console.log(filterNum("033-435-1199"));
      // console.log(data);

      // const result = dataList.value[i].tel.filter(dataList.value[i] => dataList.value[i].tel === "033-435-1199");
      // console.log(result);
      // for (let i = 0; i <= 9; i++) {

      // console.log(dataList.value[i].tel);
      // }

      data.map(v => {
        const dataSet = {
          contentId: v.contentId,
          campingName: v.facltNm,
          campingIntro: v.lineIntro,
          campingManageMode: v.facltDivNm,
          campingTypes: v.induty,
          address: v.addr1,
          mapX: v.mapX,
          mapY: v.mapY,
          tel: v.tel,
          homePageUrl: v.homepage,
          thumbNailUrl: v.firstImageUrl,
          campInnerOption: v.glampInnerFclty,
          campOuterOption: v.sbrsCl,
          getInAnimal: v.animalCmgCl,
          createdDate: v.modifiedtime,
          resveUrl: v.resveUrl,
          doNm: v.doNm,
          // lineIntro: i.getElementsByTagName("lineIntro")[0].innerHTML,
        };
        // console.log(dataList.value.push(dataSet));
        dataList.value.push(dataSet);

        //fillter
        // const eventNumbers = [];
        // dataList.value.map(v => {
        //   if (dataList.value && dataList.value.length > 0) dataList.value = [];
        //   if (v.getInAnimal === "가능") {
        //     dataList.value.push(dataSet);
        //     eventNumbers.push(dataSet);
        //     console.log(eventNumbers);
        //   }
        // });
      });
    };
    // const startTest = async () => {
    //   if (dataList.value && dataList.value.length > 0) dataList.value = []; //초기화
    //   let url = `/basedList?serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D&numOfRows=10&pageNo=${page.value}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    //   //
    //   if (keyword.value && keyword.value !== "" && keyword.value !== undefined) {
    //     // url = `/searchList?pageNo=1&MobileOS=ETC&MobileApp=bears&_type=json&serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D&keyword=%EC%95%BC%EC%98%81%EC%9E%A5`;
    //   }
    //   console.log(url);
    //   const d = await api.get(url);
    //   console.log(d);
    //   if (d.data.response && d.data.response.body) {
    //     const data = d.data.response.body.items.item;
    //     data.map(v => {
    //       const dataSet = {
    //         contentId: v.contentId,
    //         campingName: v.facltNm,
    //         campingIntro: v.lineIntro,
    //         campingManageMode: v.facltDivNm,
    //         campingTypes: v.induty,
    //         address: v.addr1,
    //         mapX: v.mapX,
    //         mapY: v.mapY,
    //         tel: v.tel,
    //         homePageUrl: v.homepage,
    //         thumbNailUrl: v.firstImageUrl,
    //         campInnerOption: v.glampInnerFclty,
    //         campOuterOption: v.sbrsCl,
    //         getInAnimal: v.animalCmgCl,
    //         createdDate: v.modifiedtime,
    //         resveUrl: v.resveUrl,
    //         doNm: v.doNm,
    //         // lineIntro: i.getElementsByTagName("lineIntro")[0].innerHTML,
    //       };
    //       // console.log(dataList.value.push(dataSet));
    //       dataList.value.push(dataSet);
    //     });
    //   }
    // };

    const showDetail = index => {
      // console.log(dataSet);
      store.commit(STORE_TYPE.campInfo, dataList[index]);
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_CAMPING);
    };
    const comparisonAction = (item) => {
      store.commit(STORE_TYPE.comparisonSideBar, true);
      if (store.state.targetOne === "" && store.state.targetTwo === "") {
        store.commit(STORE_TYPE.targetOne, item);
      } else if (!store.state.targetOne) {
        store.commit(STORE_TYPE.targetOne, item);
      } else {
        store.commit(STORE_TYPE.targetTwo, item);
      }
    };


    const reSet = () => {
      location.reload(true);
    };

    //테스트존
    function test() {
      document.getElementById("keyword").value = "";
    }


    /**
     *
     * @type {{value : Array}}
     */

    // const setDataList = (value = {});
    function myFunction() {

      let k = document.getElementById("input").value;

      console.log(k.value);
      setKeyword(k);

    }

    const setKeyword = k => {
      keyword.value = k;
      // console.log(k)
      getCampInfo();
    };
    //
    onMounted(() => {
      getCampInfo();
      // getCampInfo();
    });
    return {
      dataList,
      showDetail,
      setRowCount,
      page,
      index,
      store,
      comparisonAction,
      // startTest,
      myFunction,
      setKeyword,
      getCampInfo,
      reSet,
      test,
      // getCampserch,
      // goLink,
    };
  },
};
</script>
<template>
  <section class="camp-info" :style="store.state.comparisonSideBar ? {width : '50%', margin: '0 0 0 auto'} : ''">
    <!--    <div v-for="index in 5">-->
    <!--      <button @click="setRowCount(index + page - 1)">{{ index + page - 1 }}</button>-->
    <!--    </div>-->

    <!--    <h1>campsite</h1>-->
    <span class="te">캠핑테마</span>

    <!--    <input type="text" @input="onchange($event)">-->
    <input id="input" type="text" @input="myFunction()">
    <span class="selec">테마를 선택해주세요!</span>
    <div class="main-icon">
      <!--      <a @click="setKeyword('텐트')">-->
      <!--        <img src="/assets/image/icon/categoryTent.webp" alt=""/>-->
      <!--        <span>텐트</span>-->
      <!--      </a>-->


      <a @click="setKeyword('카라반')">
        <img src="/assets/image/icon/categoryCaravane.webp" alt="" />
        <span>카라반</span>
      </a>

      <a @click="setKeyword('글램핑')">
        <img src="/assets/image/icon/categoryGlamping.webp" alt="" />
        <span>글램핑</span>
      </a>

      <a @click="setKeyword('오토캠핑')">
        <img src="/assets/image/icon/categoryAutoCamping.webp" alt="" />
        <span>오토캠핑</span>
      </a>

      <!--      <a>-->
      <!--        &lt;!&ndash;        <button >카라반버튼</button>&ndash;&gt;-->
      <!--        <img src="/assets/image/icon/categoryPet.webp" alt=""/>-->
      <!--        <span>반려동물</span>-->
      <!--      </a>-->

      <a @click="setKeyword('키즈')">
        <img src="/assets/image/icon/categoryKids.webp" alt="" />
        <span>키즈</span>
      </a>

      <!--      <a @click="setKeyword('캠프닉')">-->
      <!--        <img src="/assets/image/icon/categoryCampnic.webp" alt=""/>-->
      <!--        <span>캠프닉</span>-->
      <!--      </a>-->
    </div>
    <div class="info-body" v-if="dataList && dataList.length > 0">
      <!--      <div class="search-wrapper">-->

      <!--      </div>-->
      <div class="info-item" @click="showDetail(index)" v-for="(item, index) in dataList">
        <a :href="item.homePageUrl" class="item-front">
          <div class="camp-type">
            <span>
              {{ item.campingManageMode }}
            </span>
          </div>
          <img :src="item.thumbNailUrl ? item.thumbNailUrl : 'assets/image/backgroundImg.webp'" alt="main"
          /></a>

        <div class="camp-list">
          <div class="name">{{ item.campingName }}</div>
          <div class="des">
            <span>{{ item.campingIntro }}</span>
          </div>

          <div class="info-inner">
            <div class="info-add">
              <span class="info-type">캠핑 타입 :{{ item.campingTypes }}</span>
            </div>
            <div class="info-ad">
              <span>주소 : {{ item.address }}</span>
            </div>
            <div class="info-ph">
              <span>전화번호 : {{ item.tel }}</span>
            </div>
            <div class="info-btn">
              <button @click="comparisonAction(item)">비교하기</button>
            </div>

            <!--            <div class="info-ph">-->
            <!--              <span>{{ item.getInAnimal }} </span>-->
            <!--            </div>-->
            <!--            <div class="info-ph">-->
            <!--              <span>지역 : {{ item.doNm }} </span>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <div class="page-nation">
        <!--        <button @click="setRowCount(1)"><i class="fa-solid fa-angles-left"></i></button>-->
        <button v-if="index + page - 10 > 0" @click="setRowCount(index + page - 10)"><i
          class="fa-solid fa-angles-left"></i></button>
        <button v-if="index + page - 1 > 0" @click="setRowCount(index + page - 1)"><i
          class="fa-solid fa-angle-left"></i></button>
        <button v-if="0 < index - 2 + page" @click="setRowCount(index - 2 + page)">{{ index - 2 + page }}</button>
        <button v-if="0 < index - 1 + page" @click="setRowCount(index - 1 + page)">{{ index - 1 + page }}</button>
        <button v-if="index + page > 0" @click="setRowCount(index + page)">
          <span class="current-page">{{ index + page }}</span>
        </button>
        <button v-if="index + 1 + page < 332" @click="setRowCount(index + 1 + page)">{{ index + 1 + page }}</button>
        <button v-if="index + 2 + page < 332" @click="setRowCount(index + 2 + page)">{{ index + 2 + page }}</button>
        <button v-if="index + page + 1 < 332" @click="setRowCount(index + page + 1)"><i
          class="fa-solid fa-angle-right"></i></button>
        <button v-if="index + page + 10 < 332" @click="setRowCount(index + page + 10)"><i
          class="fa-solid fa-angles-right"></i></button>
        <!--        <button @click="setRowCount(331)"><i class="fa-solid fa-angles-right"></i></button>-->
      </div>
      <!--      <a href=""></a>-->
    </div>
    <div v-else>...데이터를 불러오는 중...</div>

  </section>
  <comparison-side-bar v-if="store.state.comparisonSideBar" />
</template>
