<template>
	<div>
		<nav class="header-nav">
			<button @click="homeRoute" class="btn btn-link">
				<img class="nav-logo" src="@/images/logo.png" alt="logo" />
			</button>
			<div class="nav-content-wrap">
				<button class="nav-post-write" @click="uploadPostRoute">
					글 작성
				</button>
				<button
					class="nav-login"
					v-if="!isLogin"
					@click.stop="showLoginForm = true"
				>
					로그인
				</button>
				<div
					class="nav-userInfo-wrap"
					v-if="isLogin"
					@click.stop="showDropDown = !showDropDown"
				>
					<div class="userInfo-name">{{ getNickname }}</div>
					<img
						class="userInfo-img"
						src="@/images/man.jpg"
						alt="userImg"
					/><svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 24 24"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M7 10l5 5 5-5z"></path>
					</svg>
					<div class="nav-dropdown-wrap" v-if="showDropDown">
						<ul class="dropdown-list">
							<li class="dropdown-items" @click="myPostRoute">
								내 작성글
							</li>
							<li class="dropdown-items" @click="myLikeRoute">
								내 관심글
							</li>
							<li
								class="dropdown-items"
								@click.stop="
									(showSettingForm = true),
										(showDropDown = false)
								"
							>
								설정
							</li>
							<li class="dropdown-items" @click="logout">
								로그아웃
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
		<ul
			class="nav justify-content-end list-inline text-center d-flex justify-content-center align-items-center m-4"
		></ul>
		<p v-on-clickaway="away"></p>
		<LoginForm
			v-if="showLoginForm"
			@close-modal="showLoginForm = false"
			@login-toast="loginEventToast"
		>
		</LoginForm>
		<UserSetting
			v-if="showSettingForm"
			@close-modal="showSettingForm = false"
			@nickname-update-toast="updateNicknameEventToast"
			@password-update-toast="updatePasswordEventToast"
		>
		</UserSetting>
	</div>
</template>

<script>
import LoginForm from '@/components/views/LoginForm.vue';
import UserSetting from '@/components/views/UserSetting.vue';
import { mixin as clickaway } from 'vue-clickaway';

export default {
	mixins: [clickaway],
	data: function () {
		return {
			showLoginForm: false,
			showDropDown: false,
			showSettingForm: false,
		};
	},
	methods: {
		logout() {
			this.$store.commit('logout');
			this.$router.push('/');
		},
		uploadPostRoute() {
			this.$router.push('uploadPost');
		},
		homeRoute() {
			this.$router.push('/');
		},
		loginEventToast() {
			this.$toast.success(this.getNickname + '님, 환영합니다');
		},
		updateNicknameEventToast() {
			this.$toast.success('닉네임이 변경되었습니다');
		},
		updatePasswordEventToast() {
			this.$store.commit('logout');
			this.$toast.success(
				'비밀번호가 변경되었습니다, 다시 로그인 해주세요',
			);
		},
		away() {
			this.showDropDown = false;
		},
		myPostRoute() {
			this.$router.push('/mypost');
		},
		myLikeRoute() {
			this.$router.push('/mylike');
		},
		userSettingRoute() {
			this.$router.push('/usersetting');
		},
	},
	computed: {
		isLogin() {
			return this.$store.getters.isLogin;
		},
		getNickname() {
			return this.$store.getters.getNickname;
		},
	},
	components: {
		LoginForm,
		UserSetting,
	},
};
</script>

<style scoped>
.btn:active {
	box-shadow: none;
}

.header-nav {
	display: flex;
	justify-content: space-between;
	padding: 2.5rem;
}

.nav-logo {
	width: 8.5rem;
}

.nav-content-wrap {
	display: flex;
	margin-right: 1rem;
}

.nav-login,
.nav-post-write {
	margin-right: 2rem;
	font-weight: 600;
	font-size: 1.125rem;
}
button {
	outline: none;
	border: none;
	background-color: #fff;
	cursor: pointer;
}

.nav-userInfo-wrap {
	cursor: pointer;
	display: flex;
	align-items: center;
	position: relative;
}

.userInfo-name {
	font-size: 18px;
	font-weight: 600;
	margin-right: 0.25rem;
}

.userInfo-img {
	display: block;
	height: 2.5rem;
	width: 2.5rem;
	box-shadow: 0 0 8px rgb(0 0 0 / 9%);
	border-radius: 50%;
	object-fit: cover;
	transition: all 0.125s ease-in 0s;
}

.nav-userInfo-wrap svg {
	font-size: 1.5rem;
	margin-left: 0.25rem;
	color: #868e96;
	transition: all 0.125s ease-in 0s;
	margin-right: -0.4375rem;
}

.nav-dropdown-wrap {
	position: absolute;
	top: 100%;
	margin-top: 1rem;
	right: 0;
}

.dropdown-list {
	position: relative;
	z-index: 5;
	width: 12rem;
	background: #fff;
	box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
	list-style: none;
	padding-left: 0rem !important;
}

.dropdown-items {
	padding: 0.75rem 1rem;
	line-height: 1.5;
	font-weight: bold;
	cursor: pointer;
}

@media screen and (max-width: 575px) {
	.nav-post-write {
		display: none;
	}
}

@media screen and (max-width: 600px) {
	.userInfo-name {
		display: none;
	}
}
</style>
