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

export { getPostList, login };
