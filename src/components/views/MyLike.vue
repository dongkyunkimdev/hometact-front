<template>
	<div class="content">
		<div class="row order-wrap">
			<section class="order-section">
				<div class="order-item order-active">
					<input
						class="invisibile"
						type="radio"
						id="order-date"
						value="createdDate"
					/>
					<label class="pointer order-label" for="order-date">
						<svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 24 24"
							height="1.3em"
							width="1.3em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M23 5v13.883l-1 .117v-16c-3.895.119-7.505.762-10.002 2.316-2.496-1.554-6.102-2.197-9.998-2.316v16l-1-.117v-13.883h-1v15h9.057c1.479 0 1.641 1 2.941 1 1.304 0 1.461-1 2.942-1h9.06v-15h-1zm-12 13.645c-1.946-.772-4.137-1.269-7-1.484v-12.051c2.352.197 4.996.675 7 1.922v11.613zm9-1.484c-2.863.215-5.054.712-7 1.484v-11.613c2.004-1.247 4.648-1.725 7-1.922v12.051z"
							/>
						</svg>
						<span class="order-text">내 관심글</span></label
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
					@click="viewPost(post.postId)"
				>
					<div class="h-100">
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
	</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { getMyLikePostList } from '@/api/index';

export default {
	data: function () {
		return {
			postList: [],
			page: 0,
		};
	},
	methods: {
		viewPost(postId) {
			this.$router.push({
				name: '/viewPost',
				query: {
					postId: postId,
				},
			});
		},
		async infiniteHandler($state) {
			try {
				let { data } = [];
				data = await getMyLikePostList(this.page);
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
	components: {
		InfiniteLoading,
	},
};
</script>

<style scoped>
.content {
	width: 1400px;
	margin: 0 auto;
}

.row-cols-xl-5 > * {
	flex: 0 0 auto;
	width: 18%;
}

.row-cols-1 > * {
}

@media screen and (max-width: 1700px) {
	.content {
		width: 1320px;
	}
	.row-cols-xl-5 > * {
		flex: 0 0 auto;
		width: 22.5%;
	}
}

@media screen and (max-width: 1400px) {
	.content {
		width: 1140px;
	}
}

@media screen and (max-width: 1200px) {
	.content {
		width: 960px;
	}
	.row-cols-xl-5 > * {
		flex: 0 0 auto;
		width: 30%;
	}
}

@media screen and (max-width: 991px) {
	.content {
		width: 720px;
	}
}

@media screen and (max-width: 767px) {
	.content {
		width: 540px;
	}
	.row-cols-xl-5 > * {
		flex: 0 0 auto;
		width: 45%;
	}
}

@media screen and (max-width: 576px) {
	.content {
		width: 90%;
	}
	.row-cols-xl-5 > * {
		flex: 0 0 auto;
		width: 100%;
	}
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

.order-item {
	display: flex;
	align-items: center;
	margin-right: 1rem;
	cursor: pointer;
	font-weight: 700;
	font-size: 1.5rem;
}

.order-label {
	display: flex;
	align-items: center;
}

.post-list-wrapper {
	margin-bottom: 10rem;
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

div.info-wrap {
	padding-top: 1rem;
}

.btn-group {
	align-items: center;
}

.btn-group > img {
	width: 1rem;
	margin-right: 0.2rem;
}

.order-text {
	margin-left: 0.5rem;
}
</style>
