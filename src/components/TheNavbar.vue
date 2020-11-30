<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				<img src="../assets/logo_navbar.png" alt="" />
			</b-navbar-item>
		</template>
		<template slot="start"> </template>

		<template slot="end">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				<i>Welcome, {{ username }}</i>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
export default {
	computed: {
		username(){
			return this.$store.state.username
		}
	},
}
</script>

<style lang="scss" scoped>
.navbar {
	padding: 0 20px;
	background: transparent;
}

.navbar-item,
.navbar-link {
	&:hover {
		background: transparent;
		color: #000;
	}
}
</style>
