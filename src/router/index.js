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
		path: "/myPage",
		name: "myPage",
		component: () => import("../views/myPage.vue"),
	},
	{
		path: "/login",
		name: "myPage",
		component: () => import("../views/login.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
