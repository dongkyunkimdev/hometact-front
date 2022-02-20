<template>
	<div class="container">
		<div class="row title">
			{{ postObj.title }}
		</div>
		<div class="row profile">
			<div class="profile-item nickname" v-if="postObj.userDto">
				{{ postObj.userDto.nickname }}
			</div>
			<div class="profile-item created-date">
				{{ postObj.createdDate }}
			</div>
		</div>
		<div class="row category">
			<div class="category-item">카테고리 :</div>
			<div class="category-item objects">독서</div>
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
		max-width: 960px;
	}
}

@media (min-width: 1200px) {
	.container {
		max-width: 960px;
	}
}

div.profile {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1.7rem;
}

div.profile-item {
	flex: 0 0 25%;
	height: 1em;
	font-size: 1.3rem;
	font-weight: bold;
}

div.category-item {
	flex: 0 0 17%;
	height: 1em;
	font-size: 1.3rem;
	font-weight: bold;
}

div.created-date {
	text-align: right;
	color: #6c757d;
}

div.category {
	font-size: 1.2rem;
	font-weight: bold;
	margin-top: 1.7rem;
	border-bottom: 2px solid #dcdcdc;
	height: 3rem;
}

.quill-editor-wrap {
	margin-top: 2rem;
	height: 28rem;
}

.quill-editor-wrap > .content {
	padding: 0;
}
</style>
