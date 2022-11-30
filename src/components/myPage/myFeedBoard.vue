<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";
import commonUtil from "../../utils/common-util.js";
import store, { POPUP_TYPE, STORE_TYPE } from "../../store/index.js";

export default {
  name: "myFeedBoard",
  components: { customPagination },
  setup() {
    const contentData = ref({});
    const file = ref("");

    const getData = async () => {
      const data = await apiClient("sns/getSnsMine", {});
      if (data) contentData.value = data.data;
    };

    const getImgUrl = file => {
      try {
        if (file) return commonUtil.getImgUrl(file.fileName);
      } catch (e) {
        return "./assets/image/camping.png";
      }
    };

    const openDetail = boardIdx => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.DETAIL_SCREEN);
      store.commit(STORE_TYPE.detailData, boardIdx);
    }; //게시물 상세 페이지 팝업 열기

    onMounted(() => {
      getData();
    });

    return {
      contentData,
      page: 1,
      file,
      getImgUrl,
      openDetail,
    };
  },
};
</script>

<template>
  <div class="contents-area-li">
    <div class="contents-box" v-for="item in contentData">
      <div class="contents-img-wrap" @click="openDetail(item.boardIdx)">
        <img :src="getImgUrl(item.file[0])" alt="" />
      </div>
    </div>
    <div class="empty-box" />
    <div class="empty-box" />
  </div>
</template>
