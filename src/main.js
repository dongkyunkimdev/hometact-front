import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/index';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import store from '@/store/index';
import VueQuillEditor from 'vue-quill-editor';
import Vuelidate from 'vuelidate';
import Toast from 'vue-toastification';

import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-toastification/dist/index.css';

const toastOptions = {
	timeout: 2000,
};

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueQuillEditor);
Vue.use(Vuelidate);
Vue.use(Toast, toastOptions);

Vue.config.productionTip = false;

import('@/assets/styles/common.css');

new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app');
