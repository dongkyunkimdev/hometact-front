<template>
	<div class="container">
		<div class="row">
			<input
				class="title"
				v-model="title"
				type="text"
				name="title"
				id="title"
				ref="title"
				placeholder="Title"
			/>
		</div>
		<div class="row">
			<footer class="blockquote-footer">카테고리를 선택해주세요.</footer>
		</div>
		<div class="row">
			<div
				class="btn-group"
				role="group"
				aria-label="Basic radio toggle button group"
			>
				<input
					type="radio"
					class="btn-check"
					name="btnradio"
					id="book"
					autocomplete="off"
					checked
				/>
				<label class="btn btn-outline-secondary bold" for="book"
					>독서</label
				>

				<input
					type="radio"
					class="btn-check"
					name="btnradio"
					id="movie"
					autocomplete="off"
				/>
				<label class="btn btn-outline-secondary bold" for="movie"
					>영화</label
				>

				<input
					type="radio"
					class="btn-check"
					name="btnradio"
					id="game"
					autocomplete="off"
				/>
				<label class="btn btn-outline-secondary bold" for="game"
					>게임</label
				>
				<input
					type="radio"
					class="btn-check"
					name="btnradio"
					id="craft"
					autocomplete="off"
				/>
				<label class="btn btn-outline-secondary bold" for="craft"
					>공예</label
				>
				<input
					type="radio"
					class="btn-check"
					name="btnradio"
					id="etc"
					autocomplete="off"
				/>
				<label class="btn btn-outline-secondary bold" for="etc"
					>기타</label
				>
			</div>
		</div>
		<div class="row quill-editor-wrap">
			<quill-editor
				class="content"
				style="min-height: 28rem"
				name="content"
				id="content"
				ref="content"
				v-model="content"
				:options="editorOption"
			/>
		</div>
		<p v-if="$v.content.$error" id="contentError"></p>
		<div class="btn-toolbar justify-content-end">
			<button
				type="button"
				class="btn btn-outline-secondary mr-1"
				@click.once="cancelBtn"
			>
				취소
			</button>
			<button
				type="button"
				class="btn btn-outline-primary"
				@click="uploadAction"
				v-if="this.postId === undefined"
			>
				등록
			</button>
			<button
				type="button"
				class="btn btn-outline-primary"
				@click="updateAction"
				v-else
			>
				수정
			</button>
		</div>
		<!-- People vector created by pikisuperstar - www.freepik.com -->
		<!-- Heart doodle vector created by rawpixel.com - www.freepik.com -->
		<!-- Design vector created by freepik - www.freepik.com -->
		<!-- Eye examination vector created by pch.vector - www.freepik.com -->
	</div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import { uploadPost, updatePost } from '@/api/index';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
	name: 'uploadPost',
	data: function () {
		return {
			postId: '',
			title: '',
			content: '',
			logMessage: '',
			editorOption: {
				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						[{ color: [] }, { background: [] }],
						[{ align: [] }],
						['image'],
						['formula'],
					],
				},
				placeholder:
					'모임 진행 방식 및 신청 방법에 대해 구체적으로 작성해주세요',
			},
		};
	},
	validations: {
		title: {
			required,
			maxLength: maxLength(500),
		},
		content: {
			required,
			maxLength: maxLength(5000),
		},
	},
	mounted() {
		this.updateCheck();
	},
	methods: {
		updateCheck() {
			if (this.$route.params) {
				this.postId = this.$route.params.postId;
				this.title = this.$route.params.title;
				this.content = this.$route.params.content;
			}
		},
		cancelBtn() {
			this.$router.push('/');
		},
		async uploadAction() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					for (let key in Object.keys(this.$v)) {
						const input = Object.keys(this.$v)[key];
						if (input.includes('$')) return false;
						if (!this.$v[input].required) {
							this.$toast.error(input + ' is required');
							break;
						} else if (!this.$v[input].maxLength) {
							if (input === 'title') {
								this.$toast.error(
									'제목의 길이는 500 이하여야 합니다',
								);
							} else if (input === 'content') {
								this.$toast.error(
									'내용의 길이는 5000 이하여야 합니다',
								);
							}
							break;
						}
					}
				} else {
					const postDto = {
						title: this.title,
						content: this.content,
					};
					await uploadPost(postDto);
					this.$router.push({
						name: '/',
						params: { eventName: 'uploadPost' },
					});
				}
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(this.logMessage.message);
			}
		},
		async updateAction() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					for (let key in Object.keys(this.$v)) {
						const input = Object.keys(this.$v)[key];
						if (input.includes('$')) return false;
						if (!this.$v[input].required) {
							this.$toast.error(input + ' is required');
							break;
						} else if (!this.$v[input].maxLength) {
							if (input === 'title') {
								this.$toast.error(
									'제목의 길이는 500 이하여야 합니다',
								);
							} else if (input === 'content') {
								this.$toast.error(
									'내용의 길이는 5000 이하여야 합니다',
								);
							}
							break;
						}
					}
				} else {
					const postDto = {
						title: this.title,
						content: this.content,
					};
					await updatePost(this.postId, postDto);
					this.$router.push({
						name: '/',
						params: { eventName: 'updatePost' },
					});
				}
			} catch (error) {
				this.logMessage = error.response.data;
				this.$toast.error(this.logMessage.message);
			}
		},
	},
	computed: {
		editor() {
			return this.$refs.content.quill;
		},
	},
	components: {
		quillEditor,
	},
};
</script>

<style scoped>
input {
	border: 0;
	outline: 0;
	background: transparent;
	border-bottom: 1px solid black;
}

input.title {
	font-size: 3rem;
	font-weight: 700;
	outline: none;
	padding-bottom: 0.5rem;
	border: none;
	border-bottom: 1px solid #ced4da;
	margin-bottom: 2rem;
	width: 100%;
	height: 4rem;
}

@media (max-width: 575px) {
	input.title {
		font-size: 2rem;
	}
}

.container {
	padding: 3rem 1rem;
}

@media (min-width: 1400px) {
	.container {
		max-width: 960px;
	}
}

@media (min-width: 1200px) {
	.container {
		max-width: 960px;
	}
}

.quill-editor-wrap {
	margin-top: 2rem;
}

.ql-container {
	min-height: inherit;
}

.btn-toolbar {
	margin-top: 3.5rem;
}
</style>
