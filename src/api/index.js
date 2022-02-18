import axios from 'axios';
import store from '@/store/index';

const axiosService = axios.create({
	baseURL: '/api',
	headers: {
		Authorization: 'Bearer ' + store.state.accessToken,
	},
});

function getPostList() {
	return axiosService.get('/post');
}

function login(loginDto) {
	return axiosService.post('/user/login', loginDto);
}

function signup(signupDto) {
	return axiosService.post('/user/signup', signupDto);
}

export { getPostList, login, signup };
