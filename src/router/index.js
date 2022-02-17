import Vue from 'vue';
import VueRouter from 'vue-router';
// import Landing from '@/components/views/Landing';
// import Content from '@/components/views/Content';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('@/components/views/Landing'),
		},
		{
			path: '/component',
			component: () => import('@/components/views/Content'),
		},
		{
			path: '*',
			component: () => import('@/components/views/NotFoundPage'),
		},
	],
});

export default router;
