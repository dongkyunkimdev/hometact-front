import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		createPersistedState({
			storage: window.sessionStorage,
		}),
	],
	state: {
		email: '',
		nickname: '',
		accessToken: '',
	},
	getters: {
		isLogin(state) {
			return state.accessToken !== '';
		},
		getEmail(state) {
			return state.email;
		},
	},
	mutations: {
		setEmail(state, email) {
			state.email = email;
		},
		setNickname(state, nickname) {
			state.nickname = nickname;
		},
		setAccessToken(state, accessToken) {
			state.accessToken = accessToken;
		},
		logout(state) {
			state.email = '';
			state.nickname = '';
			state.accessToken = '';
		},
	},
});
