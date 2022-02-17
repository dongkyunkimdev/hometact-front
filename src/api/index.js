import axios from 'axios';

const axiosService = axios.create({
	baseURL: '/api',
});

function getPostList() {
	return axiosService.post('post');
}

export { getPostList };
