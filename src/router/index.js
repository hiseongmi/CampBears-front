import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "mainPage",
		component: () => import("../views/mainPage.vue"),
	},
	{
		path: "/samplePage",
		name: "samplePage",
		component: () => import("../views/samplePage.vue"),
	},
	{
		path: "/sample-login",
		name: "sample-login",
		component: () => import("../views/sample-login.vue"),
	},
	{
		path: "/newsPage",
		name: "newsPage",
		component: () => import("../components/sungmi/newsPage.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
