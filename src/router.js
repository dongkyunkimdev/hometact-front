import Vue from 'vue';
import VueRouter from 'vue-router';
import Content from './components/views/Content';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [{ path: '/component', component: Content }],
});

export default router;
