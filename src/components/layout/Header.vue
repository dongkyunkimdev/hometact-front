<template>
	<div>
		<ul
			class="nav justify-content-end list-inline text-center d-flex justify-content-center align-items-center m-4"
		>
			<template v-if="!isLogin">
				<li class="nav-item me-auto ml-3">
					<button @click="homeRoute" class="btn btn-link">
						<img
							src="@/images/logo.png"
							class="img-fluid"
							alt="logo"
						/>
					</button>
				</li>
				<li class="nav-item">
					<button
						class="btn btn-link nav-link link-secondary"
						@click="showLoginForm = true"
					>
						<h5 class="bold m-0 nav-link link-secondary">로그인</h5>
					</button>
				</li>
			</template>
			<template v-else>
				<li class="nav-item me-auto ml-3">
					<button @click="homeRoute" class="btn btn-link">
						<img
							src="@/images/logo.png"
							class="img-fluid"
							alt="logo"
						/>
					</button>
				</li>
				<li class="nav-item">
					<button
						class="btn btn-link nav-link link-secondary"
						@click="uploadPostRoute"
					>
						<h5 class="bold m-0 nav-link link-secondary">
							글 작성
						</h5>
					</button>
				</li>
				<li class="nav-item">
					<button
						class="btn btn-link nav-link link-secondary"
						@click="logout"
					>
						<h5 class="bold m-0 nav-link link-secondary">
							로그아웃
						</h5>
					</button>
				</li>
			</template>
		</ul>
		<LoginForm v-if="showLoginForm" @close-modal="showLoginForm = false">
		</LoginForm>
	</div>
</template>

<script>
import LoginForm from '@/components/views/LoginForm.vue';

export default {
	data: function () {
		return {
			showLoginForm: false,
		};
	},
	methods: {
		logout() {
			this.$store.commit('logout', '');
		},
		uploadPostRoute() {
			this.$router.push('uploadPost');
		},
		homeRoute() {
			this.$router.push('/');
		},
	},
	computed: {
		isLogin() {
			return this.$store.getters.isLogin;
		},
		getEmail() {
			return this.$store.getters.getEmail;
		},
	},
	components: {
		LoginForm,
	},
};
</script>

<style>
.btn:active {
	box-shadow: none;
}
</style>
