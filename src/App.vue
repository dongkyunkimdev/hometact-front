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
};
</script>
