<template>
	<div class="page-wrap d-flex flex-row align-items-center">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-12 text-center">
					<span class="display-1 d-block">404</span>
					<div class="mb-4 lead">
						The page you are looking for was not found.
					</div>
					<button @click="toHome" class="btn btn-link">
						Back to Home
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		toHome() {
			this.$router.push('/');
		},
	},
};
</script>

<style>
.page-wrap {
	min-height: 80vh;
}
</style>
