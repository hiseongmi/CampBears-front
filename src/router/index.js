import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'mainPage',
		component: () => import('../views/mainPage.vue'),
	},
	{
		path: '/samplePage',
		name: 'samplePage',
		component: () => import('../views/samplePage.vue'),
	},
	{
		path: '/sample-login',
		name: 'sample-login',
		component: () => import('../views/sample-login.vue'),
	},

];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
