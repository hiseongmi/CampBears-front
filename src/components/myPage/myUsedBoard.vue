<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";
import commonUtil from "../../utils/common-util.js";
import { CONSTANTS } from "../../constants.js";

export default {
  name: "myUsedBoard",
  props: {
    idx: {},
  },
  components: {
    customPagination,
  },
  setup(props) {
    const idx = ref(props.idx);
    const contentData = ref({});

    const getData = async () => {
      let param = { userIdx: idx };
      const data = await apiClient("product/getProductList", param);
      console.log(data);
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
  <custom-pagination v-model="page" :length="16" />
</template>
