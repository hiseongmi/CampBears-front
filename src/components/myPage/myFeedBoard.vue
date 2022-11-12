<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";
import commonUtil from "../../utils/common-util.js";
import { CONSTANTS } from "../../constants.js";

export default {
  name: "myFeedBoard",
  components: { customPagination },
  component: {
    customPagination,
  },
  setup() {
    const contentData = ref({});

    const getData = async () => {
      const data = await apiClient("sns/getSnsMine", {});
      if (data) {
        contentData.value = data.data;
      }
    };

    onMounted(() => {
      getData();
    });

    return {
      contentData,
      page: 1,
    };
  },
};
</script>

<template>
  <div class="contents-box" v-for="item in contentData">
    <div class="contents-img-wrap">
      <img :src="item" alt="" />
    </div>
  </div>
  <custom-pagination v-model="page" :length="15" />
</template>
