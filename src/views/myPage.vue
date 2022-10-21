<script>
import customButton from "../components/layout/customButton.vue";
import customInput from "../components/layout/customInput.vue";
import { ref } from "vue";
import NewsContentPage from "../components/sungmi/newscontentPage.vue";

export default {
	name: "myPage",
	components: {
		NewsContentPage,
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
	<div class="myPage">
		<div class="myProfile">
			<img src="assets/image/camping.png" alt="" />
		</div>
		<div class="myContents">
			<div class="tapBar">
				<custom-button :placeholder="'피드'" :onClick="clickButton" />
				<custom-button :placeholder="'판매'" :onClick="clickButton" />
				<custom-button :placeholder="'대여'" :onClick="clickButton" />
				<custom-button :placeholder="'후기'" :onClick="clickButton" />
				<custom-button :placeholder="'찜 목록'" :onClick="clickButton" />
			</div>
			<div class="myFeed">
				<news-content-page />
			</div>
		</div>
	</div>
</template>
