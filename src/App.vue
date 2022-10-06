<script>
import { useRoute } from "vue-router";
import customLoading from "./components/layout/customLoading.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { CONSTANTS } from "./constants.js";
import { apiClient } from "./utils/axios.js";

export default {
	name: "App",
	components: {
		customLoading
	},
	setup() {
		const route = useRoute();
		const isLoading = ref(false);

		const eventHandler = (e) => {
			if (e.detail === CONSTANTS.KEY_LIST.EVENT_MESSAGE.PROCESS) {
				isLoading.value = true;
			} else if (e.detail === CONSTANTS.KEY_LIST.EVENT_MESSAGE.COMPLETE) {
				isLoading.value = false;
			}
		};

		const getAPI = async () => {
			const data = await apiClient("/pbl/getProductList", {});
		};

		onMounted(() => {
			addEventListener(CONSTANTS.KEY_LIST.EVENT_LIST.LOADING, eventHandler);
			console.warn("start");
			// getAPI();
		});

		onUnmounted(() => {
			removeEventListener(CONSTANTS.KEY_LIST.EVENT_LIST.LOADING, eventHandler)
		})

		return {
			isLoading
		};

	}
};
</script>

<template>
	<router-view />
	<custom-loading v-if="isLoading"></custom-loading>
</template>

<style src="./assets/css/app.css">
</style>
