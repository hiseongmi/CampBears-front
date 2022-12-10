<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import store, { POPUP_TYPE, STORE_TYPE } from "../store/index.js";
import { useStore } from "vuex";

export default {
  name: "campingInfo",
  components: {},

  setup() {
    const store = useStore();

    const page = ref(1); //한번에 보여줄 콘텐츠 양

    const api = axios.create({
      baseURL: "http://apis.data.go.kr/B551011/GoCamping",
      timeout: 1000 * 60 * 3,
      headers: { "content-type": "Json" },
    });

    const index = ref(0);

    const dataList = ref([]);

    const setRowCount = value => {
      page.value = value;
      getCampInfo();
    };

    const getCampInfo = async () => {
      if (dataList.value && dataList.value.length > 0) dataList.value = [];
      const d = await api.get(
        // `/basedList?numOfRows=10&pageNo=${page.value}&MobileOS=ECT&MobileApp=bears&serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D`,
        `/basedList?serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D&numOfRows=10&pageNo=${page.value}&MobileOS=ETC&MobileApp=AppTest&_type=json`,
      );
      //https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json
      // console.log(d);
      // console.log(d.data.response);
      // console.log(d.data.response.body.items);
      // if (d.data.response.body.items && d.data.response.body.items.length > 0) {
      const data = d.data.response.body.items.item;
      // console.log(data);

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
          // lineIntro: i.getElementsByTagName("lineIntro")[0].innerHTML,
        };
        dataList.value.push(dataSet);
      });

      // }
      // const xmlParser = new DOMParser();
      // const par = xmlParser.parseFromString(d.data, "text/xml");
      // const t = par.getElementsByTagName("items");
      // for (const item of t) {
      //   for (const i of item.children) {
      //     const dataSet = {
      //       contentId: i.getElementsByTagName("contentId")[0].innerHTML,
      //       campingName: i.getElementsByTagName("facltNm")[0].innerHTML,
      //       campingIntro: i.getElementsByTagName("lineIntro")[0].innerHTML,
      //       campingManageMode: i.getElementsByTagName("facltDivNm")[0].innerHTML,
      //       campingTypes: i.getElementsByTagName("induty")[0].innerHTML,
      //       address: i.getElementsByTagName("addr1")[0].innerHTML,
      //       mapX: i.getElementsByTagName("mapX")[0].innerHTML,
      //       mapY: i.getElementsByTagName("mapY")[0].innerHTML,
      //       tel: i.getElementsByTagName("tel")[0].innerHTML,
      //       homePageUrl: i.getElementsByTagName("homepage")[0].innerHTML,
      //       thumbNailUrl: i.getElementsByTagName("firstImageUrl")[0].innerHTML,
      //       campInnerOption: i.getElementsByTagName("glampInnerFclty")[0].innerHTML,
      //       campOuterOption: i.getElementsByTagName("sbrsCl")[0].innerHTML,
      //       getInAnimal: i.getElementsByTagName("animalCmgCl")[0].innerHTML,
      //       createdDate: i.getElementsByTagName("modifiedtime")[0].innerHTML,
      //       // lineIntro: i.getElementsByTagName("lineIntro")[0].innerHTML,
      //     };
      //     dataList.value.push(dataSet);
      //   }
      // }
    };

    const showDetail = index => {
      // console.log(dataSet);
      store.commit(STORE_TYPE.campInfo, dataList[index]);
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_CAMPING);
    };

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
      // goLink,
    };
  },
};
</script>
<template>
  <section class="camp-info">
    <!--    <div v-for="index in 5">-->
    <!--      <button @click="setRowCount(index + page - 1)">{{ index + page - 1 }}</button>-->
    <!--    </div>-->

    <h1>campsite</h1>
    <div class="info-body" v-if="dataList && dataList.length > 0">
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
          </div>
        </div>
      </div>
      <div class="page-nation">
        <button @click="setRowCount(1)">처음으로</button>
        <button v-if="index + page - 1 > 0" @click="setRowCount(index + page - 1)">뒤로</button>
        <button v-if="0 < index - 2 + page" @click="setRowCount(index - 2 + page)">{{ index - 2 + page }}</button>
        <button v-if="0 < index - 1 + page" @click="setRowCount(index - 1 + page)">{{ index - 1 + page }}</button>
        <button v-if="index + page > 0" @click="setRowCount(index + page)">
          <span class="current-page">{{ index + page }}</span>
        </button>
        <button v-if="index + 1 + page < 331" @click="setRowCount(index + 1 + page)">{{ index + 1 + page }}</button>
        <button v-if="index + 2 + page < 331" @click="setRowCount(index + 2 + page)">{{ index + 2 + page }}</button>
        <button v-if="index + page + 1 < 331" @click="setRowCount(index + page + 1)">앞으로</button>
        <button @click="setRowCount(331)">끝으로</button>
      </div>
      <a href=""></a>
    </div>
    <div v-else>데이터를 불러오는 중...</div>
  </section>
</template>
