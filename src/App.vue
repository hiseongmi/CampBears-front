<script>
import { useRoute } from 'vue-router';

export default {
	name: 'App',
	components: {},
	setup() {
		const route = useRoute();

	},
};
</script>

<template>
	<router-view />
</template>

<style src='./assets/css/app.css'>
</style>
