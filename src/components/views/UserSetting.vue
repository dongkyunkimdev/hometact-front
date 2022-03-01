<template>
	<div class="modal">
		<div class="overlay" @click="$emit('close-modal')"></div>
		<div class="modal-card">
			<div class="wrapper">
				<div class="text-center name">설정</div>
				<form class="p-3 mt-3">
					<div class="form-field d-flex align-items-center">
						<span class="fas fa-key"></span>
						<input
							v-model="originalPassword"
							type="password"
							name="originalPassword"
							id="originalPassword"
							placeholder="기존 비밀번호"
						/>
					</div>
					<div class="form-field d-flex align-items-center">
						<span class="fas fa-key"></span>
						<input
							v-model="newPassword"
							type="password"
							name="newPassword"
							id="newPassword"
							placeholder="변경 비밀번호"
						/>
					</div>
					<button
						type="button"
						class="btn mb-40"
						@click="updatePasswordAction"
					>
						비밀번호 변경
					</button>
					<div class="form-field d-flex align-items-center">
						<span class="fas fa-key"></span>
						<input
							v-model="nickname"
							type="text"
							name="nickname"
							id="nickname"
							:placeholder="getNickname"
						/>
					</div>
					<button
						type="button"
						class="btn"
						@click="updateNicknameAction"
					>
						닉네임 변경
					</button>
				</form>
				<div class="text-center fs-6">
					<span @click="withdrawalAction">회원 탈퇴</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { updateNickname, updatePassword, withdrawal } from '@/api/index';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
	data: function () {
		return {
			originalPassword: '',
			newPassword: '',
			nickname: '',
			logMessage: '',
		};
	},
	validations: {
		originalPassword: {
			required,
			minLength: minLength(8),
			maxLength: maxLength(100),
		},
		newPassword: {
			required,
			minLength: minLength(8),
			maxLength: maxLength(100),
		},
		nickname: {
			required,
			minLength: minLength(3),
			maxLength: maxLength(20),
		},
	},
	methods: {
		closeModal() {
			this.$emit('close-modal');
		},
		async updateNicknameAction() {
			try {
				this.$v.$touch();
				if (this.$v.nickname.$invalid) {
					if (!this.$v.nickname.required) {
						this.$toast.error('닉네임을 입력해주세요');
					} else if (!this.$v.nickname.minLength) {
						this.$toast.error(
							'닉네임의 길이는 3 이상이어야 합니다',
						);
					} else if (!this.$v.nickname.maxLength) {
						this.$toast.error('닉네임의 길이는 20 이하여야 합니다');
					}
				} else {
					const updateDto = {
						nickname: this.nickname,
					};
					await updateNickname(updateDto);
					this.setVuexNickname(this.nickname);
					this.closeModal();
					this.$emit('nickname-update-toast');
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
			}
		},
		async updatePasswordAction() {
			try {
				this.$v.$touch();
				if (
					this.$v.originalPassword.$invalid ||
					this.$v.newPassword.$invalid
				) {
					if (!this.$v.originalPassword.required) {
						this.$toast.error('기존 비밀번호를 입력해주세요');
					} else if (!this.$v.originalPassword.minLength) {
						this.$toast.error(
							'기존 비밀번호의 길이는 8 이상이어야 합니다',
						);
					} else if (!this.$v.originalPassword.maxLength) {
						this.$toast.error(
							'기존 비밀번호의 길이는 길이는 100 이하여야 합니다',
						);
					} else if (!this.$v.newPassword.required) {
						this.$toast.error('변경할 비밀번호를 입력해주세요');
					} else if (!this.$v.newPassword.minLength) {
						this.$toast.error(
							'변경할 비밀번호의 길이는 8 이상이어야 합니다',
						);
					} else if (!this.$v.newPassword.maxLength) {
						this.$toast.error(
							'변경할 비밀번호의 길이는 100 이하여야 합니다',
						);
					}
				} else {
					const updateDto = {
						originalPassword: this.originalPassword,
						newPassword: this.newPassword,
					};
					await updatePassword(updateDto);
					this.closeModal();
					this.$emit('password-update-toast');
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
			}
		},
		setVuexNickname(nickname) {
			this.$store.commit('setNickname', nickname);
		},
		withdrawalAction() {
			this.$confirm({
				message: '관련된 데이터가 모두 삭제됩니다. 탈퇴하시겠습니까?',
				button: {
					no: '아니오',
					yes: '예',
				},
				callback: async confirm => {
					if (confirm) {
						try {
							await withdrawal();
							this.$emit('withdrawal-toast');
						} catch (error) {
							this.logMessage = error.response.data;
							this.$toast.error(this.logMessage.message);
						}
					}
				},
			});
		},
	},
	computed: {
		getNickname() {
			return this.$store.getters.getNickname;
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
	line-break: anywhere;
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
	color: #ff0505;
	cursor: pointer;
}

.wrapper span:hover {
	color: #cc0707;
}

@media (max-width: 380px) {
	.wrapper {
		margin: 30px 20px;
		padding: 40px 15px 15px 15px;
	}
}
</style>
