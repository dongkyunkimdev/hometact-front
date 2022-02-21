<template>
	<div class="container">
		<div class="row title">
			{{ postObj.title }}
		</div>
		<div class="profile">
			<div class="user-info">
				<img class="user-img" src="@/images/hart.jpg" alt="userImg" />
				<div class="user-name" v-if="postObj.userDto">
					{{ postObj.userDto.nickname }}
				</div>
			</div>
			<div class="created">{{ postObj.createdDate }}</div>
		</div>
		<div class="row post-info">
			<div class="post-info-item hart" v-if="postObj.postLikeDtos">
				<img src="@/images/hart.png" class="img-fluid" alt="hart" />
				{{ postObj.postLikeDtos.length }}
			</div>
			<div class="post-info-item" v-if="postObj.commentDtos">
				<img
					src="@/images/comment.png"
					class="img-fluid ml-05"
					alt="comment"
				/>
				{{ postObj.commentDtos.length }}
			</div>
			<div class="post-info-item">
				<img src="@/images/view.jpg" class="img-fluid" alt="view" />
				{{ postObj.view }}
			</div>
		</div>
		<div class="row category">
			<div class="category-item">독서</div>
		</div>
		<div class="row content quill-editor-wrap">
			<quill-editor
				class="content"
				name="content"
				id="content"
				v-model="postObj.content"
				:options="editorOption"
				:disabled="true"
			/>
		</div>
		<div class="row comment">
			<h4 class="bold">Comments</h4>
			<div
				class="comment-wrapper"
				v-for="comment in postObj.commentDtos"
				:key="comment.commentId"
			>
				<div class="profile-img-wrapper">
					<img
						alt="comment-writer"
						src="@/images/hart.jpg"
						class="profile-img"
					/>
				</div>
				<div>
					<h4>{{ comment.userDto.nickname }}</h4>
					<p>
						{{ comment.content }}
					</p>
					<p class="comment-created">{{ comment.createdDate }}</p>
				</div>
			</div>
		</div>
		<div class="row write-comment-wrapper">
			<textarea
				class="write-comment"
				name=""
				id=""
				cols="30"
				rows="10"
				placeholder="댓글을 입력하세요."
			></textarea>
		</div>
		<div class="row justify-content-end">
			<button
				type="button"
				class="btn btn-outline-primary write-comment-btn bold"
			>
				댓글 등록
			</button>
		</div>
		<!-- People vector created by pikisuperstar - www.freepik.com -->
		<!-- Heart doodle vector created by rawpixel.com - www.freepik.com -->
		<!-- Design vector created by freepik - www.freepik.com -->
		<!-- Eye examination vector created by pch.vector - www.freepik.com -->
	</div>
</template>

<script>
import { getPost } from '@/api/index';
import { quillEditor } from 'vue-quill-editor';

export default {
	name: 'viewPost',
	data: function () {
		return {
			postId: this.$route.params.postId,
			postObj: '',
			logMessage: '',
			editorOption: {
				modules: {
					toolbar: false,
				},
			},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			try {
				this.postObj = await (await getPost(this.postId)).data;
			} catch (error) {
				this.logMessage = error.response.data;
			}
		},
	},
	components: {
		quillEditor,
	},
};
</script>

<style scoped>
div.title {
	margin-top: 4rem;
	font-weight: 800;
	font-size: 3rem;
	line-height: 126.5%;
	letter-spacing: -0.005em;
	color: #000;
}

@media (min-width: 1400px) {
	.container {
		max-width: 720px;
	}
}

@media (min-width: 1200px) {
	.container {
		max-width: 720px;
	}
}

@media (min-width: 992px) {
	.container {
		max-width: 720px;
	}
}

@media (max-width: 576px) {
	.container {
		width: 90%;
	}
}

div.profile {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

div.profile > .user-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1.7rem;
}

div.profile > .user-info > .user-img {
	width: 2rem;
	height: 2rem;
}

div.profile > .created {
	margin-top: 1.5rem;
	letter-spacing: -0.005em;
	color: #6c757d;
}

div.profile-item {
	flex: 0 0 25%;
	height: 1em;
	font-size: 1.3rem;
	font-weight: bold;
}

div.category-item {
	margin-right: 0.25rem;
	background: #dce2f0;
	border: 2px solid #dce2f0;
	border-radius: 58px;
	padding: 0.15rem 0.6rem;
	margin-bottom: 1rem;
	font-weight: 500;
	width: auto;
}

div.created-date {
	text-align: right;
	color: #6c757d;
}

div.category {
	font-size: 1.2rem;
	font-weight: bold;
	border-bottom: 2px solid #dcdcdc;
	height: 3rem;
}

.quill-editor-wrap {
	margin-top: 2rem;
}

.quill-editor-wrap > .content {
	padding: 0;
}

div.post-info {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 1rem;
	margin-right: 1.3rem;
}

div.post-info-item {
	display: flex;
	align-items: center;
	width: 1rem;
	height: 1rem;
	font-size: 1.2rem;
	color: #6c757d;
	margin-right: 1.5rem;
}

div.post-info-item.hart {
	margin-right: 1rem !important;
}

div.post-info-item > img {
	width: 1.3rem;
	max-width: none;
	margin-right: 0.2rem;
}

div.row.comment {
	margin-top: 5rem;
}

div.comment-wrapper {
	display: flex;
	border-bottom: 1px solid #dcdcdc;
	margin-top: 2rem;
}

.profile-img {
	color: transparent;
	text-align: center;
	text-indent: 10000px;
	width: 100%;
}

.profile-img-wrapper {
	width: 50px;
	height: 50px;
	display: flex;
	overflow: hidden;
	position: relative;
	font-size: 1.25rem;
	align-items: center;
	flex-shrink: 0;
	font-family: Roboto, sans-serif;
	line-height: 1;
	user-select: none;
	border-radius: 50%;
	justify-content: center;
	margin-right: 1rem;
}

.comment-created {
	color: #6c757d;
}

.write-comment {
	font-family: inherit;
	padding: 1rem 1rem 1.5rem;
	outline: none;
	width: 100%;
	height: 100px;
	margin-bottom: 10px;
}

.write-comment-wrapper {
	margin-top: 2rem;
}

.write-comment-btn {
	width: 6rem;
	margin-bottom: 40px;
}
</style>
