<script>
import { apiClient } from "../../utils/axios.js";
import { ref } from "vue";
// import { checkForm } from "../../utils/common-util.js";
import customButton from "../layout/customButton.vue";
import customInput from "../layout/customInput.vue";

export default {
	name: "updateProfile",
	components: {
		customButton,
		customInput,
	},
	setup() {
		const input = ref("");
		const input2 = ref("");

		const updateProfile = async () => {
			const userData = ref({
				userName: "",
				userEmail: "",
				userPassword: "",
			});

			// if (checkForm.checkForm(userData)) {
			// 	// 추가해줘 응애

			const data = await apiClient("", userData.value);
			if (!data && data.length < 1) console.log("axios error");
			if (data.data.status === 200) alert("변경 완료!");
			// }
		};

		return {
			updateProfile,
			input,
			input2,
		};
	},
};
</script>

<template>
	<custom-input :placeholder="'111'" @update:value="input = $event" />
	<custom-input :placeholder="'222'" @update:value="input2 = $event" />
	<custom-button :placeholder="'안녕?'" :onClick="updateProfile" />
</template>
