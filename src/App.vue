<template>
	<div id="app">
		<div class="container">
			<UserList />
		</div>
	</div>
</template>

<script>
import UserList from './components/UserList';

export default {
	name: 'App',
	components: {
		UserList
	},
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
