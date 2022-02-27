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

function getPostList(page, order) {
	return axiosService.get('/post/get?page=' + page + '&order=' + order);
}

function getMyPostList(page) {
	return axiosService.get('/post/my/post?page=' + page);
}

function getMyLikePostList(page) {
	return axiosService.get('/post/my/like?page=' + page);
}

function getPostListByCategory(postCategoryId, page, order) {
	return axiosService.get(
		'/post/get/category/' +
			postCategoryId +
			'?page=' +
			page +
			'&order=' +
			order,
	);
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
	return axiosService.get('/post/get/' + postId);
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

function updateNickname(updateDto) {
	return axiosService.patch('/user/updateNickname', updateDto);
}

function updatePassword(updateDto) {
	return axiosService.patch('/user/updatePassword', updateDto);
}

export {
	getPostList,
	getMyPostList,
	getMyLikePostList,
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
	updateNickname,
	updatePassword,
};
