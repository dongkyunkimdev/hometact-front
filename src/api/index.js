import axios from 'axios';
import store from '@/store/index';

const axiosService = axios.create({
	baseURL: '/api',
});

axiosService.interceptors.request.use(
	function (config) {
		config.headers.Authorization = 'Bearer ' + store.state.accessToken;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axiosService.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		const errorAPI = error.config;
		if (
			error.response.data.status === 401 &&
			error.response.data.code === 'A002' &&
			store.state.refreshToken !== ''
		) {
			await tokenRefresh();
			return await axiosService(errorAPI);
		}
		return Promise.reject(error);
	},
);

async function tokenRefresh() {
	const refreshUrl = '/api/token/refresh';
	const refreshHeaders = {
		headers: {
			Refresh: 'Bearer ' + store.state.refreshToken,
		},
	};
	const responseRefresh = await axios.get(refreshUrl, refreshHeaders);
	store.commit('setAccessToken', responseRefresh.data.accessToken);
}

function getPostList() {
	return axiosService.get('/post');
}

function getPostListByOrder(orderName) {
	return axiosService.get('/post/order/' + orderName);
}

function getPostListByCategory(postCategoryId) {
	return axiosService.get('/post/category/' + postCategoryId);
}

function getPostCategoryList() {
	return axiosService.get('/postcategory');
}

function login(loginDto) {
	return axiosService.post('/user/login', loginDto);
}

function signup(signupDto) {
	return axiosService.post('/user/signup', signupDto);
}

function uploadPost(postDto) {
	return axiosService.post('/post', postDto);
}

function getPost(postId) {
	return axiosService.get('/post/' + postId);
}

function deletePost(postId) {
	return axiosService.delete('/post/' + postId);
}

function updatePost(postId, postDto) {
	return axiosService.patch('/post/' + postId, postDto);
}

function likePost(postId) {
	return axiosService.post('/postlike/' + postId);
}

function cancelLikePost(postId) {
	return axiosService.delete('/postlike/' + postId);
}

function uploadComment(commentDto) {
	return axiosService.post('/comment', commentDto);
}

function deleteComment(commentId) {
	return axiosService.delete('/comment/' + commentId);
}

export {
	getPostList,
	getPostListByOrder,
	getPostCategoryList,
	login,
	signup,
	uploadPost,
	getPost,
	deletePost,
	updatePost,
	likePost,
	cancelLikePost,
	uploadComment,
	deleteComment,
	getPostListByCategory,
};
