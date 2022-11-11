<script>
import { onMounted, ref } from "vue";
import { apiClient } from "../../utils/axios.js";
import customPagination from "../layout/customPagination.vue";

export default {
  name: "myFeed",
  components: { customPagination },
  component: {
    customPagination,
  },
  setup() {
    const selectedValue = ref();
    const contentData = ref({});

    const getData = async () => {
      let param = { showType: "HASH" };
      if (selectedValue.value !== null && selectedValue.value !== undefined) {
        param = Object.assign({}, param, { sorted: selectedValue.value }); //ob 내장함수 합침
        param.sorted = selectedValue.value;
      }
      const data = await apiClient("sns/getSnsList", param);
      if (data.data) {
        //console.log(data.data);
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
