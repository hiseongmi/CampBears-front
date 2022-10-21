import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "mainPage",
		component: () => import("../views/mainPage.vue"),
	},
	{
		path: "/loginPage",
		name: "loginPage",
		component: () => import("../components/yd/loginPage.vue"),
	},
	{
		path: "/signupPage",
		name: "signupPage",
		component: () => import("../components/yd/signupPage.vue"),
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
	{
		path: "/PostPage",
		name: "PostPage",
		component: () => import("../components/sungmi/PostPage.vue"),
	},
	{
		path: "/detailScreenPopup/:id",
		name: "detailScreenPopup",
		component: () => import("../components/manager/popups/detailScreenPopup.vue"),
	},
	{
		path: "/auth",
		name: "loginAccess",
		component: () => import("../components/snslogin/loginAccess.vue"),
	},
	{
		path: "/loginNaver",
		name: "loginNaver",
		component: () => import("../components/snslogin/loginNaver.vue"),
	},
	{
		path: "/myPage",
		name: "myPage",
		component: () => import("../views/myPage.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
