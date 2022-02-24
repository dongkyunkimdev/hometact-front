<template>
	<div class="container">
		<div class="row title">
			{{ postObj.title }}
		</div>
		<div class="profile">
			<div class="user-info">
				<img class="user-img" src="@/images/man.jpg" alt="userImg" />
				<div class="user-name" v-if="postObj.userDto">
					{{ postObj.userDto.nickname }}
				</div>
			</div>
			<div class="created">{{ postObj.createdDate }}</div>
		</div>
		<div class="row post-info">
			<div class="post-info-item" v-if="postObj.postLikeDtos">
				<img
					v-if="checkPostLike"
					src="@/images/hart.png"
					class="img-fluid"
					alt="hart"
					@click="cancelLikePostAction(postObj.postId)"
				/>
				<img
					v-else
					src="@/images/disable_hart.png"
					class="img-fluid"
					alt="hart"
					@click="likePostAction(postObj.postId)"
				/>
				{{ postObj.postLikeDtos.length }}
			</div>
		</div>
		<div
			class="row post-manage-wrap justify-content-end"
			v-if="postObj.userDto && postObj.userDto.email === getEmail"
		>
			<button @click.once="updatePostAction(postObj)">수정</button>
			<button @click="deletePostAction(postObj.postId)">삭제</button>
		</div>
		<div class="row category">
			<div class="category-item" v-if="postObj.postCategoryDto">
				{{ postObj.postCategoryDto.categoryName }}
			</div>
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
						src="@/images/man.jpg"
						class="profile-img"
					/>
				</div>
				<div>
					<div>
						<div class="comment-manage-wrap">
							<h4>{{ comment.userDto.nickname }}</h4>
							<template v-if="comment.userDto.email === getEmail">
								<button>수정</button
								><button
									@click="
										deleteCommentAction(comment.commentId)
									"
								>
									삭제
								</button>
							</template>
						</div>
					</div>
					<p class="comment-content">
						{{ comment.content }}
					</p>
					<p class="comment-created">{{ comment.createdDate }}</p>
				</div>
			</div>
		</div>
		<div class="row write-comment-wrapper">
			<textarea
				class="write-comment"
				placeholder="댓글을 입력하세요."
				v-model="comment"
			></textarea>
		</div>
		<div class="row justify-content-end">
			<button
				type="button"
				class="btn btn-outline-primary write-comment-btn bold"
				@click="uploadCommentAction"
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
import {
	getPost,
	uploadComment,
	deleteComment,
	deletePost,
	likePost,
	cancelLikePost,
} from '@/api/index';
import { quillEditor } from 'vue-quill-editor';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
	name: 'viewPost',
	data: function () {
		return {
			postId: this.$route.query.postId,
			postObj: '',
			comment: '',
			logMessage: '',
			editorOption: {
				modules: {
					toolbar: false,
				},
			},
		};
	},
	validations: {
		comment: {
			required,
			maxLength: maxLength(5000),
		},
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
		async uploadCommentAction() {
			if (this.getEmail === '') {
				this.$toast.error('로그인이 필요한 기능입니다');
				return;
			}
			if (!this.$v['comment'].required) {
				this.$toast.error('내용을 입력해주세요');
				return;
			} else if (!this.$v['comment'].maxLength) {
				this.$toast.error('댓글의 길이는 5000 이하여야 합니다');
				return;
			}
			try {
				const commentDto = {
					postId: this.postId,
					content: this.comment,
				};

				await uploadComment(commentDto);
				this.clearComment();
				this.init();
				this.toastUploadComment();
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(this.logMessage.message);
			}
		},
		deleteCommentAction(commentId) {
			this.$confirm({
				message: `삭제하시겠습니까?`,
				button: {
					no: '아니오',
					yes: '예',
				},
				callback: async confirm => {
					if (confirm) {
						try {
							await deleteComment(commentId);
							this.init();
							this.toastDeleteComment();
						} catch (error) {
							this.logMessage = error.response.data;
							this.$toast.error(this.logMessage.message);
						}
					}
				},
			});
		},
		deletePostAction(postId) {
			this.$confirm({
				message: `삭제하시겠습니까?`,
				button: {
					no: '아니오',
					yes: '예',
				},
				callback: async confirm => {
					if (confirm) {
						try {
							await deletePost(postId);
							this.$router.push({
								name: '/',
								params: { eventName: 'deletePost' },
							});
						} catch (error) {
							this.logMessage = error.response.data;
							this.$toast.error(this.logMessage.message);
						}
					}
				},
			});
		},
		updatePostAction(postObj) {
			this.$router.push({
				name: '/uploadPost',
				params: {
					postId: postObj.postId,
					title: postObj.title,
					content: postObj.content,
					postCategoryId: postObj.postCategoryDto.postCategoryId,
				},
			});
		},
		clearComment() {
			this.comment = '';
		},
		toastUploadComment() {
			this.$toast.success('댓글이 등록되었습니다');
		},
		toastUpdateComment() {
			this.$toast.success('댓글이 수정되었습니다');
		},
		toastDeleteComment() {
			this.$toast.success('댓글이 삭제되었습니다');
		},
		async likePostAction(postId) {
			if (this.getEmail === '') {
				this.$toast.error('로그인이 필요한 기능입니다');
				return;
			}
			try {
				await likePost(postId);
				this.$toast.success('좋아요를 누르셨습니다');
				this.init();
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(this.logMessage.message);
			}
		},
		async cancelLikePostAction(postId) {
			try {
				await cancelLikePost(postId);
				this.$toast.success('좋아요를 취소하셨습니다');
				this.init();
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(this.logMessage.message);
			}
		},
	},
	computed: {
		getEmail() {
			return this.$store.getters.getEmail;
		},
		checkPostLike() {
			for (const element of this.postObj.postLikeDtos) {
				if (element.userDto.email === this.getEmail) {
					return true;
				}
			}
			return false;
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
	overflow-wrap: anywhere;
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
	cursor: pointer;
	display: block;
	height: 3rem;
	width: 3rem;
	margin-right: 0.25rem;
	box-shadow: 0 0 8px rgb(0 0 0 / 9%);
	border-radius: 50%;
	object-fit: cover;
	transition: all 0.125s;
}

div.profile > .user-info > .user-name {
	cursor: pointer;
	font-size: 18px;
	font-weight: 600;
}

div.profile > .created {
	margin-top: 1.5rem;
	font-weight: bold;
	letter-spacing: -0.005em;
	color: #b1b7bd;
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
}

div.post-info-item {
	display: flex;
	align-items: center;
	width: 1rem;
	height: 1rem;
	font-size: 1.2rem;
	color: #6c757d;
	justify-content: flex-end;
}

div.post-info-item > img {
	width: 1.7rem;
	max-width: none;
	margin-right: 0.2rem;
	cursor: pointer;
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

.profile-img-wrapper > img {
	display: block;
	height: 3rem;
	width: 3rem;
	margin-right: 0.5rem;
	box-shadow: 0 0 8px rgb(0 0 0 / 9%);
	border-radius: 50%;
	object-fit: cover;
	transition: all 0.125s ease-in 0s;
}

.comment-created {
	font-weight: bold;
	color: #b1b7bd;
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
	margin-bottom: 3rem;
}

.comment-manage-wrap {
	display: flex;
}

.comment-manage-wrap > button {
	outline: none;
	border: none;
	background-color: #fff;
	cursor: pointer;
	padding-bottom: 0.5rem;
}

.comment-manage-wrap > h4 {
	margin-right: 1rem;
}

.comment-content {
	line-break: anywhere;
}

.post-manage-wrap {
	display: flex;
	margin-top: 1rem;
}

.post-manage-wrap > button {
	width: auto;
	outline: none;
	border: none;
	background-color: #fff;
	cursor: pointer;
}
</style>
