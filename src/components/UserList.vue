<template>
	<div>
		<UserThumbnail v-for='user in users' :key='user.getID()' :userModel='user' class="mb-2" />
		<b-pagination v-model="page" :total-rows="totalUsers" :per-page="usersPerPage" @change="onPageChange" align="center" class="my-5"></b-pagination>
	</div>
</template>

<script>
import UserThumbnail from './UserThumbnail';
import {UserService} from '../services/UserService';

export default {
	name: 'UserList',
	components: {
		UserThumbnail
	},
	data: function() {
		return {
			userService: new UserService(),
			page: 1,
			usersPerPage: 6,
			totalUsers: 12,
			users: []
		}
	},
	computed: {
		name: function() {
			return this.firstName + ' ' + this.lastName;
		}
	},
	mounted: function() {
		const ref = this;
		this.userService.get(1).then(response => ref.onResponse(response));
	},
	methods: {
		onResponse: function(response) {
			this.page = response.getPage();
			this.usersPerPage = response.getUsersPerPage();
			this.totalUsers = response.getTotalUsers();
			this.users = response.getUsers();
		},
		onPageChange: function(page) {
			const ref = this;
			this.userService.get(page).then(response => ref.onResponse(response));
		}
	}
}
</script>


<style scoped>

</style>
