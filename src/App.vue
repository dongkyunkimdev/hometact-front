<template>
	<div id="app">
		<Header />
		<div id="content">
			<router-view></router-view>
		</div>
		<vue-confirm-dialog></vue-confirm-dialog>
	</div>
</template>

<script>
import Header from '@/components/layout/Header.vue';

export default {
	name: 'App',
	components: {
		Header,
	},
	onIdle() {
		if (this.$store.getters.isLogin) {
			this.$store.commit('logout', '');
			this.$confirm({
				title: '자동 로그아웃',
				message: '일정 시간 응답이 없어 로그아웃 되었습니다',
				button: {
					yes: '확인',
				},
			});
		}
	},
};
</script>
