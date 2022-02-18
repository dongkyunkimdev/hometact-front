<template>
	<div>
		<ul
			class="nav justify-content-end list-inline text-center d-flex justify-content-center align-items-center m-4"
		>
			<template v-if="!isLogin">
				<li class="nav-item me-auto ml-3">
					<a href="/">
						<img
							src="@/images/logo.png"
							class="img-fluid"
							alt="logo"
						/>
					</a>
				</li>
				<li class="nav-item">
					<h5 class="bold m-0">
						<a
							class="nav-link link-secondary"
							@click="showLoginForm = true"
						>
							로그인
						</a>
					</h5>
				</li>
			</template>
			<template v-else>
				<li class="nav-item me-auto ml-3">
					<a href="/">
						<img
							src="@/images/logo.png"
							class="img-fluid"
							alt="logo"
						/>
					</a>
				</li>
				<li class="nav-item">
					<h5 class="bold m-0 nav-link link-secondary">글 작성</h5>
				</li>
				<li class="nav-item">
					<h5 class="bold m-0">
						<a class="nav-link link-secondary" @click="logout">
							로그아웃
						</a>
					</h5>
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
