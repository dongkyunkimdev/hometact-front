<template>
	<div class="modal">
		<div class="overlay" @click="$emit('close-modal')"></div>
		<div class="modal-card">
			<div class="wrapper">
				<div class="logo">
					<img src="@/images/hart.jpg" alt="" />
				</div>
				<div class="text-center mt-4 name">Hometact</div>
				<form class="p-3 mt-3">
					<div class="form-field d-flex align-items-center">
						<span class="far fa-user"></span>
						<input
							v-model="email"
							type="text"
							name="email"
							id="email"
							placeholder="Email"
							autocomplete="off"
						/>
					</div>
					<div class="form-field d-flex align-items-center">
						<span class="fas fa-key"></span>
						<input
							v-model="password"
							type="password"
							name="password"
							id="pwd"
							placeholder="Password"
						/>
					</div>
					<div
						class="form-field d-flex align-items-center"
						v-if="isSignup"
					>
						<span class="fas fa-key"></span>
						<input
							v-model="nickname"
							type="text"
							name="nickname"
							id="nickname"
							placeholder="Nickname"
						/>
					</div>
					<button
						type="button"
						class="btn mt-3"
						@click="loginAction"
						v-if="!isSignup"
					>
						Login
					</button>
					<button
						type="button"
						class="btn mt-3"
						@click="signupAction"
						v-else
					>
						Sign up
					</button>
				</form>
				<div class="text-center fs-6" v-if="!isSignup">
					<span @click="isSignup = true">Sign up</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { login, signup } from '@/api/index';
import {
	required,
	minLength,
	maxLength,
	email,
} from 'vuelidate/lib/validators';

export default {
	data: function () {
		return {
			email: '',
			password: '',
			nickname: '',
			logMessage: '',
			tokenDto: '',
			userDto: '',
			isSignup: false,
		};
	},
	validations: {
		email: {
			required,
			email,
			minLength: minLength(3),
			maxLength: maxLength(100),
		},
		password: {
			required,
			minLength: minLength(8),
			maxLength: maxLength(100),
		},
	},
	methods: {
		async loginAction() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					for (let key in Object.keys(this.$v)) {
						const input = Object.keys(this.$v)[key];
						if (input.includes('$')) return false;
						if (!this.$v[input].required) {
							if (input === 'email') {
								this.$toast.error('이메일을 입력해주세요');
							} else if (input === 'password') {
								this.$toast.error('비밀번호를 입력해주세요');
							}
							break;
						} else if (!this.$v[input].minLength) {
							if (input === 'email') {
								this.$toast.error(
									'이메일의 길이는 3 이상이어야 합니다',
								);
							} else if (input === 'password') {
								this.$toast.error(
									'비밀번호의 길이는 8 이상이어야 합니다',
								);
							}
							break;
						} else if (!this.$v[input].maxLength) {
							if (input === 'email') {
								this.$toast.error(
									'이메일의 길이는 100 이하여야 합니다',
								);
							} else if (input === 'password') {
								this.$toast.error(
									'비밀번호의 길이는 100 이하여야 합니다',
								);
							}
							break;
						} else if (!this.$v[input].email) {
							if (input === 'email') {
								this.$toast.error('이메일 형식이어야 합니다');
							}
							break;
						}
					}
				} else {
					const loginDto = {
						email: this.email,
						password: this.password,
					};
					this.tokenDto = await login(loginDto);
					this.setVuex(this.email, this.tokenDto);
					this.closeModal();
					this.$emit('login-toast');
				}
			} catch (error) {
				this.logMessage = error.response.data;
				if (this.logMessage.errors.length === 0) {
					this.$toast.error(this.logMessage.message);
				} else {
					this.$toast.error(
						this.logMessage.errors[0].field +
							' ' +
							this.logMessage.errors[0].reason,
					);
				}
				this.initPassword();
			}
		},
		async signupAction() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					for (let key in Object.keys(this.$v)) {
						const input = Object.keys(this.$v)[key];
						if (input.includes('$')) return false;
						if (!this.$v[input].required) {
							if (input === 'email') {
								this.$toast.error('이메일을 입력해주세요');
							} else if (input === 'password') {
								this.$toast.error('비밀번호를 입력해주세요');
							}
							break;
						} else if (!this.$v[input].minLength) {
							if (input === 'email') {
								this.$toast.error(
									'이메일의 길이는 3 이상이어야 합니다',
								);
							} else if (input === 'password') {
								this.$toast.error(
									'비밀번호의 길이는 8 이상이어야 합니다',
								);
							}
							break;
						} else if (!this.$v[input].maxLength) {
							if (input === 'email') {
								this.$toast.error(
									'이메일의 길이는 100 이하여야 합니다',
								);
							} else if (input === 'password') {
								this.$toast.error(
									'비밀번호의 길이는 100 이하여야 합니다',
								);
							}
							break;
						} else if (!this.$v[input].email) {
							if (input === 'email') {
								this.$toast.error('이메일 형식이어야 합니다');
							}
							break;
						}
					}
				} else {
					const signupDto = {
						email: this.email,
						password: this.password,
						nickname: this.nickname,
					};
					this.userDto = await signup(signupDto);
					// this.closeModal();
					this.loginAction();
				}
			} catch (error) {
				this.logMessage = error.response.data;
				if (this.logMessage.errors.length === 0) {
					this.$toast.error(this.logMessage.message);
				} else {
					this.$toast.error(
						this.logMessage.errors[0].field +
							' ' +
							this.logMessage.errors[0].reason,
					);
				}
				this.initPassword();
			}
		},
		initPassword() {
			this.password = '';
		},
		setVuex(email, tokenDto) {
			this.$store.commit('setEmail', email);
			this.$store.commit('setAccessToken', tokenDto.data.accessToken);
			this.$store.commit('setRefreshToken', tokenDto.data.refreshToken);
			this.$store.commit('setNickname', tokenDto.data.nickname);
		},
		closeModal() {
			this.$emit('close-modal');
		},
	},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* Modal */
.modal {
	display: block !important;
}

.modal,
.overlay {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
}
.overlay {
	opacity: 0.5;
	background-color: black;
}
.modal-card {
	position: relative;
	max-width: 400px;
	margin: auto;
	margin-top: 30px;
	padding: 20px;
	min-height: 500px;
	z-index: 10;
	opacity: 1;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Poppins', sans-serif;
}

body {
	background: #ecf0f3;
}

.wrapper {
	max-width: 350px;
	min-height: 500px;
	margin: 80px auto;
	padding: 40px 30px 30px 30px;
	background-color: #ecf0f3;
	border-radius: 15px;
}

.logo {
	width: 80px;
	margin: auto;
}

.logo img {
	width: 100%;
	height: 80px;
	object-fit: cover;
	border-radius: 50%;
	box-shadow: 0px 0px 3px #5f5f5f, 0px 0px 0px 5px #ecf0f3,
		8px 8px 15px #a7aaa7, -8px -8px 15px #fff;
}

.wrapper .name {
	font-weight: 600;
	font-size: 1.4rem;
	letter-spacing: 1.3px;
	padding-left: 10px;
	color: #555;
}

.wrapper .form-field input {
	width: 100%;
	display: block;
	border: none;
	outline: none;
	background: none;
	font-size: 1.2rem;
	color: #666;
	padding: 10px 15px 10px 10px;
}

.wrapper .form-field {
	padding-left: 10px;
	margin-bottom: 20px;
	border-radius: 20px;
	box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
	color: #555;
}

.wrapper .btn {
	box-shadow: none;
	width: 100%;
	height: 40px;
	background-color: #03a9f4;
	color: #fff;
	border-radius: 25px;
	box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
	letter-spacing: 1.3px;
}

.wrapper .btn:hover {
	background-color: #039be5;
}

.wrapper span {
	text-decoration: none;
	font-size: 0.8rem;
	color: #03a9f4;
	cursor: pointer;
}

.wrapper span:hover {
	color: #039be5;
}

@media (max-width: 380px) {
	.wrapper {
		margin: 30px 20px;
		padding: 40px 15px 15px 15px;
	}
}
</style>
