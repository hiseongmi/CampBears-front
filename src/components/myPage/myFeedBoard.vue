<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";
import commonUtil from "../../utils/common-util.js";

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
      return commonUtil.getImgUrl(file.fileName);
    };

    onMounted(() => {
      getData();
    });

    return {
      contentData,
      page: 1,
      file,
      getImgUrl,
    };
  },
};
</script>

<template>
  <div class="contents-box" v-for="item in contentData">
    <div class="contents-img-wrap">
      <img :src="getImgUrl(item.file[0])" alt="" />
    </div>
  </div>
  <custom-pagination v-model="page" :length="16" />
</template>
