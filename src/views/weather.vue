<script>
import router from "../router/index.js";
import {onMounted, ref} from "vue";
import axios from "axios";
import store, {POPUP_TYPE, STORE_TYPE} from "../store/index.js";
import {useStore} from "vuex";

export default {
  name: "weather",
  components: {},

  setup() {
    const store = useStore();

    const api = axios.create({
      baseURL: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
      timeout: 1000 * 60 * 3,
      headers: {"content-type": "Json"},
    });

    const dataList = ref([]);
    const getCampInfo = async () => {
      const d = await api.get(
          "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
      );
      const xmlParser = new DOMParser();
      const par = xmlParser.parseFromString(d.data, "text/xml");
      const t = par.getElementsByTagName("items");
      for (const item of t) {
        for (const i of item.children) {
          const dataSet = {
            contentId: i.getElementsByTagName("contentId")[0].innerHTML,
          };
          dataList.value.push(dataSet);
        }
      }
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
      // goLink,
    };
  },
};
</script>

<template>
  <!--  <div> {{ this.responseText }}</div>-->
</template>
