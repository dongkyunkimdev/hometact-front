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
};
