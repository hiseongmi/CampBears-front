<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import store, { POPUP_TYPE, STORE_TYPE } from "../store/index.js";
import { useStore } from "vuex";

export default {
  name: "campingInfo",
  setup() {
    const store = useStore();


    const api = axios.create({
      baseURL: "http://apis.data.go.kr/B551011/GoCamping",
      timeout: 1000 * 60 * 3,
      headers: { "content-type": "Json" }
    });

    const dataList = ref([]);
    const getCampInfo = async () => {
      const d = await api.get("/basedList?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=Bears&serviceKey=%2B73Gk9VQ6LP%2FEICWELVtDo%2FLQDhSaoMt46Iv6JFU%2BWo3iERh%2FojmCv5Z8Deh0O93nC5R1xVDq77PxTkQKP3rKA%3D%3D");
      const xmlParser = new DOMParser();
      const par = xmlParser.parseFromString(d.data, "text/xml");
      const t = par.getElementsByTagName("items");
      for (const item of t) {
        for (const i of item.children) {
          const dataSet = {
            contentId: i.getElementsByTagName("contentId")[0].innerHTML,
            campingName: i.getElementsByTagName("facltNm")[0].innerHTML,
            campingIntro: i.getElementsByTagName("lineIntro")[0].innerHTML,
            campingManageMode: i.getElementsByTagName("facltDivNm")[0].innerHTML,
            campingTypes: i.getElementsByTagName("induty")[0].innerHTML,
            address: i.getElementsByTagName("addr1")[0].innerHTML,
            mapX: i.getElementsByTagName("mapX")[0].innerHTML,
            mapY: i.getElementsByTagName("mapY")[0].innerHTML,
            tel: i.getElementsByTagName("tel")[0].innerHTML,
            homePageUrl: i.getElementsByTagName("homepage")[0].innerHTML,
            thumbNailUrl: i.getElementsByTagName("firstImageUrl")[0].innerHTML,
            campInnerOption: i.getElementsByTagName("glampInnerFclty")[0].innerHTML,
            campOuterOption: i.getElementsByTagName("sbrsCl")[0].innerHTML,
            getInAnimal: i.getElementsByTagName("animalCmgCl")[0].innerHTML,
            createdDate: i.getElementsByTagName("modifiedtime")[0].innerHTML
          };
          dataList.value.push(dataSet);
        }
      }
    };

    const showDetail = (index) => {
      console.log(index);
      store.commit(STORE_TYPE.campInfo, dataList[index]);
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_CAMPING);

    };

    onMounted(() => {
      getCampInfo();
    });
    return {
      dataList,
      showDetail
    };
  }
};
</script>
<template>
  <section class="camp-info">
    <h1>camp info</h1>
    <div class="info-body" v-if="dataList && dataList.length >0">
      <div class="info-item" @click="showDetail(index)" v-for="(item,index) in dataList">
        <img :src="item.thumbNailUrl" alt="main">
        <div class="name">{{ item.campingName }}</div>
        <div class="des">{{ item.campingIntro }}</div>
        <div class="camp-type">
          <span>
          {{ item.campingManageMode }}
        </span>
        </div>
        <div>캠핑 타입 :{{ item.campingTypes }}</div>
        <div>주소 : {{ item.address }}</div>
        <div>전화번호 : {{ item.tel }}</div>
        <div>생성일 : {{ item.createdDate }}</div>
      </div>
    </div>
    <div v-else>
      데이터 오는중..
    </div>


  </section>

</template>
