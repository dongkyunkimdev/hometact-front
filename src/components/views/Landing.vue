<template>
	<div class="container">
		<div class="row">
			<div
				class="col-sm-6 jumbotron d-flex align-items-center mt-5 main-intro"
			>
				<div>
					<h1 class="bold">
						같은 취미를 공유하는,<br />
						<small class="text-muted"
							>비대면 모임 빌딩 플랫폼 '홈택트'</small
						><br />
					</h1>
					<h3 class="bold mt-3">
						<img src="@/images/logo.png" alt="logo" />에서 함께 할
						친구를 찾아보세요.
					</h3>
				</div>
			</div>
			<div class="col-sm-6 main-intro">
				<img src="@/images/main.jpg" class="img-fluid" alt="main" />
			</div>
		</div>
		<div class="category-wrap">
			<footer class="blockquote-footer">카테고리를 선택해주세요.</footer>
		</div>
		<div class="row">
			<div class="row">
				<div
					class="btn-group"
					role="group"
					aria-label="Basic radio toggle button group"
				>
					<input
						@click="initPost"
						v-model="postCategoryId"
						type="radio"
						class="btn-check"
						name="btnradio"
						id="999"
						value="999"
						autocomplete="off"
						key="i-999"
					/>
					<label
						class="btn btn-outline-secondary bold"
						for="999"
						key="l-999"
						>전체</label
					>
					<template v-for="postCategory in postCategoryList">
						<input
							@change="searchPostByCategory"
							v-model="postCategoryId"
							type="radio"
							class="btn-check"
							name="btnradio"
							:id="postCategory.postCategoryId"
							:value="postCategory.postCategoryId"
							autocomplete="off"
							:key="'i-' + postCategory.postCategoryId"
						/>
						<label
							class="btn btn-outline-secondary bold"
							:for="postCategory.postCategoryId"
							:key="'l-' + postCategory.postCategoryId"
							>{{ postCategory.categoryName }}</label
						>
					</template>
				</div>
			</div>
		</div>
		<div class="row post-list-wrapper">
			<div
				class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-3"
			>
				<div
					class="col post-list"
					v-for="post in postList"
					:key="post.postId"
				>
					<div
						class="card shadow-sm h-100"
						@click="viewPost(post.postId)"
					>
						<div class="card-body">
							<p class="card-text">
								{{ post.title }}
							</p>
							<div
								class="d-flex justify-content-between align-items-center info-wrap"
							>
								<div class="btn-group h-1">
									<img
										src="@/images/hart.png"
										class="img-fluid"
										alt="hart"
									/>
									<small class="text-muted mr-02">
										{{ post.postLikeDtos.length }}
									</small>
									<img
										src="@/images/comment.png"
										class="img-fluid ml-05"
										alt="comment"
									/>
									<small class="text-muted">
										{{ post.commentDtos.length }}
									</small>
									<img
										src="@/images/view.jpg"
										class="img-fluid ml-05"
										alt="comment"
									/>
									<small class="text-muted">
										{{ post.view }}
									</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- People vector created by pikisuperstar - www.freepik.com -->
		<!-- Heart doodle vector created by rawpixel.com - www.freepik.com -->
		<!-- Design vector created by freepik - www.freepik.com -->
		<!-- Eye examination vector created by pch.vector - www.freepik.com -->
		<!-- Heart vector created by alicia_mb - www.freepik.com -->
	</div>
</template>

<script>
import {
	getPostList,
	getPostCategoryList,
	getPostListByCategory,
} from '@/api/index';

export default {
	name: '',
	data: function () {
		return {
			logMessage: '',
			postList: '',
			postCategoryList: '',
			postCategoryId: '999',
			eventName: this.$route.params.eventName,
		};
	},
	mounted() {
		this.initPost();
		this.initPostCategory();
		this.eventToast();
	},
	methods: {
		async initPost() {
			try {
				this.postList = await (await getPostList()).data;
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(error.response.data);
			}
		},
		async searchPostByCategory() {
			try {
				this.postList = await (
					await getPostListByCategory(this.postCategoryId)
				).data;
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(error.response.data);
			}
		},
		async initPostCategory() {
			try {
				this.postCategoryList = await (
					await getPostCategoryList()
				).data;
			} catch (error) {
				this.logMessage = error.response.data;
			}
		},
		viewPost(postId) {
			this.$router.push({
				name: '/viewPost',
				query: {
					postId: postId,
				},
			});
		},
		eventToast() {
			if (this.eventName !== undefined) {
				switch (this.eventName) {
					case 'uploadPost':
						this.$toast.success('글이 등록되었습니다');
						break;

					case 'updatePost':
						this.$toast.success('글이 수정되었습니다');
						break;

					case 'deletePost':
						this.$toast.success('글이 삭제되었습니다');
						break;

					default:
						break;
				}
			}
		},
	},
	computed: {
		getEmail() {
			return this.$store.getters.getEmail;
		},
	},
};
</script>

<style scoped>
@media (min-width: 992px) {
	.category-wrap {
		margin-top: 3rem;
	}
}

@media (min-width: 768px) {
	.category-wrap {
		margin-top: 5rem;
	}
}

@media (min-width: 576px) {
	.category-wrap {
		margin-top: 4rem;
	}
}

@media (max-width: 1400px) {
	.main-intro {
		width: 80%;
		margin: auto;
	}
}

.post-list {
	height: 13rem;
}

.card-text {
	text-align: center;
	height: 3rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.btn-group {
	align-items: center;
}

.btn-group > img {
	width: 1rem;
	margin-right: 0.2rem;
}

.btn-group > samll {
	margin-right: 0.2rem;
}

div.info-wrap {
	margin-top: 6.5rem;
}

.post-list-wrapper {
	margin-bottom: 10rem;
}
</style>
