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
		refreshToken: '',
	},
	getters: {
		isLogin(state) {
			return state.accessToken !== '' && state.email !== '';
		},
		getEmail(state) {
			return state.email;
		},
		getNickname(state) {
			return state.nickname;
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
		setRefreshToken(state, refreshToken) {
			state.refreshToken = refreshToken;
		},
		logout(state) {
			state.email = '';
			state.nickname = '';
			state.accessToken = '';
			state.refreshToken = '';
		},
	},
});
