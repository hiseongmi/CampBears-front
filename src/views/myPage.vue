<script>
import customButton from "../components/layout/customButton.vue";
import customInput from "../components/layout/customInput.vue";
import { ref } from "vue";

export default {
	name: "myPage",
	components: {
		customButton,
		customInput,
	},
	setup() {
		const clickButton = () => {
			console.log("응애");
		};

		return {
			clickButton,
		};
	},
};
</script>

<template>
	<custom-button :placeholder="'피드'" :onClick="clickButton" />
	<custom-button :placeholder="'판매'" :onClick="clickButton" />
	<custom-button :placeholder="'대여'" :onClick="clickButton" />
	<custom-button :placeholder="'후기'" :onClick="clickButton" />
	<custom-button :placeholder="'찜 목록'" :onClick="clickButton" />
</template>
