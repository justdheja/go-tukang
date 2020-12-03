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
			<b-navbar-item tag="button" @click="logOut" class="button is-success">
				Log Out
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

	methods: {
		logOut() {
			window.location.reload()
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
	display: flex;
	align-items: center;
	&:hover {
		background: transparent;
		color: #000;
	}
}

button {
	border-radius: 50px;
	display: block;
	margin: auto 2px;
}
</style>
