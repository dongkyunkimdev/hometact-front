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
						@click="initPage"
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
							@change="initPage"
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
		<div class="row order-wrap">
			<section class="order-section">
				<div class="order-item order-active">
					<input
						class="invisibile"
						type="radio"
						id="order-date"
						v-model="orderSelected"
						value="date"
					/>
					<label
						class="pointer order-label"
						:class="{
							'order-active': orderSelected === 'date',
							'order-inactive': orderSelected !== 'date',
						}"
						for="order-date"
						><svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 448 512"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12zm333.296 95.947l-28.169-28.398c-4.667-4.705-12.265-4.736-16.97-.068L194.12 364.665l-45.98-46.352c-4.667-4.705-12.266-4.736-16.971-.068l-28.397 28.17c-4.705 4.667-4.736 12.265-.068 16.97l82.601 83.269c4.667 4.705 12.265 4.736 16.97.068l142.953-141.805c4.705-4.667 4.736-12.265.068-16.97z"
							></path>
						</svg>
						<span class="order-text">최신</span></label
					>
					<input
						class="invisibile"
						type="radio"
						id="order-like"
						v-model="orderSelected"
						value="like"
					/>
					<label
						class="pointer order-label"
						:class="{
							'order-active': orderSelected === 'like',
							'order-inactive': orderSelected !== 'like',
						}"
						for="order-like"
						><svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 1024 1024"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M834.1 469.2A347.49 347.49 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 0 1-47.5 46.1 352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9z"
							></path></svg
						><span class="order-text">인기</span></label
					>
				</div>
			</section>
		</div>
		<div class="row post-list-wrapper">
			<div
				class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-3"
			>
				<div
					class="col post-list"
					v-for="post in postList"
					:key="'d-' + post.postId"
				>
					<div class="h-100" @click="viewPost(post.postId)">
						<div class="post-body">
							<p class="card-text">
								{{ post.title }}
							</p>
							<div
								class="category-item"
								v-if="post.postCategoryDto"
							>
								{{ post.postCategoryDto.categoryName }}
							</div>
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
		<infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
			<span slot="no-more"></span>
		</infinite-loading>
		<!-- People vector created by pikisuperstar - www.freepik.com -->
		<!-- Heart doodle vector created by rawpixel.com - www.freepik.com -->
		<!-- Design vector created by freepik - www.freepik.com -->
		<!-- Eye examination vector created by pch.vector - www.freepik.com -->
		<!-- Heart vector created by alicia_mb - www.freepik.com -->
	</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
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
			postList: [],
			postCategoryList: '',
			postCategoryId: '999',
			page: 0,
			orderSelected: 'date',
			eventName: this.$route.params.eventName,
		};
	},
	mounted() {
		this.initPostCategory();
		this.eventToast();
	},
	methods: {
		async initPostCategory() {
			try {
				this.postCategoryList = await (
					await getPostCategoryList()
				).data;
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(error.response.data);
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
		async infiniteHandler($state) {
			try {
				let { data } = [];
				if (this.postCategoryId === '999') {
					data = await getPostList(this.page);
				} else {
					data = await getPostListByCategory(
						this.postCategoryId,
						this.page,
					);
				}
				if (data.data.length > 0) {
					this.page += 1;
					for (const post of data.data) {
						this.postList.push(post);
					}
					$state.loaded();
				} else {
					$state.complete();
				}
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(error.response.data);
			}
		},
		initPage() {
			this.postList = [];
			this.page = 0;
			this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
		},
	},
	computed: {
		getEmail() {
			return this.$store.getters.getEmail;
		},
	},
	components: {
		InfiniteLoading,
	},
};
</script>

<style scoped>
@media (max-width: 1300px) {
	.main-intro {
		width: 80%;
		margin: auto;
	}
}

@media (min-width: 576px) {
	.category-wrap {
		margin-top: 2rem;
	}
	.row-cols-sm-2 > * {
		flex: 0 0 auto;
		width: 45%;
	}
}

@media (min-width: 768px) {
	.category-wrap {
		margin-top: 5rem;
	}

	.row-cols-md-3 > * {
		flex: 0 0 auto;
		width: 30%;
	}
}

@media (min-width: 992px) {
	.category-wrap {
		margin-top: 3rem;
	}
}

@media (min-width: 1200px) {
	.row-cols-xl-5 > * {
		flex: 0 0 auto;
		width: 22.5%;
	}
}

@media (max-width: 576px) {
	.container-sm,
	.container {
		width: 90%;
	}

	.category-wrap {
		margin-top: 2rem;
	}
}

@media screen and (min-width: 1700px) {
	.container-sm,
	.container {
		width: 1400px;
	}
	.row-cols-xl-5 > * {
		flex: 0 0 auto;
		width: 18%;
	}
}

.post-list {
	height: 15rem;
	margin: 0.625rem;
	padding: 1.5rem;
	box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
	border-radius: 1.5rem;
	cursor: pointer;
}

.card-text {
	text-align: center;
	height: 4.5rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	border: none;
	margin-top: 1rem;
	overflow-wrap: anywhere;
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
	padding-top: 1rem;
}

.post-list-wrapper {
	margin-bottom: 10rem;
}

.order-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 3rem;
}

.order-section {
	display: flex;
}

.order-active {
	color: #000;
}
.order-item {
	display: flex;
	align-items: center;
	margin-right: 1rem;
	cursor: pointer;
	font-weight: 700;
	font-size: 1.5rem;
}

.order-text {
	margin-left: 0.5rem;
}

.order-inactive {
	color: #868e96;
}

.order-label {
	display: flex;
	align-items: center;
}

div.category-item {
	background: #dce2f0;
	border: 2px solid #dce2f0;
	border-radius: 58px;
	padding: 0.15rem 0.6rem;
	font-weight: 500;
	width: 4.3rem;
	text-align: center;
	margin: 2.5rem auto 0 auto;
}
</style>
