import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
	if (router.app.$store.state.accessToken !== '') {
		return next();
	}
	next('/');
	router.app.$toast.error('로그인이 필요한 기능입니다');
};

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: '/',
			component: () => import('@/components/views/Landing'),
		},
		{
			path: '*',
			component: () => import('@/components/views/NotFoundPage'),
		},
		{
			path: '/uploadPost',
			name: '/uploadPost',
			component: () => import('@/components/views/UploadPost'),
			beforeEnter: requireAuth(),
		},
		{
			path: '/viewPost',
			name: '/viewPost',
			component: () => import('@/components/views/ViewPost'),
		},
	],
});

export default router;
