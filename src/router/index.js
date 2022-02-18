import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('@/components/views/Landing'),
		},
		{
			path: '*',
			component: () => import('@/components/views/NotFoundPage'),
		},
		{
			path: '/component',
			component: () => import('@/components/views/Content'),
		},
		{
			path: '/uploadPost',
			component: () => import('@/components/views/UploadPost'),
		},
	],
});

export default router;
