<template>
	<div>
		<b-form-group label="Filter Users" class="mb-5" v-slot="{ ariaDescribedby }">
			<b-form-input v-model="searchString" placeholder="Filter by forname, lastname or id" class="mb-2"></b-form-input>
			Filter by:
			<b-form-radio-group
				v-model="selectedSearchOption"
				:options="searchOptions"
				:aria-describedby="ariaDescribedby"
				name="radio-inline"
				class="d-inline ml-4"
			></b-form-radio-group>
		</b-form-group>
		<UserThumbnail v-for='user in filteredUsers' :key='user.getID()' :userModel='user' class="mb-2" />
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
			users: [],
			searchString: '',
			selectedSearchOption: 0,
			searchOptions: [
				{ text: 'Forename', value: 0 },
				{ text: 'Lastname', value: 1 },
				{ text: 'ID', value: 2 }
			]

		}
	},
	computed: {
		name: function() {
			return this.firstName + ' ' + this.lastName;
		},
		filteredUsers: function() {
			const ref = this;
			return this.users.filter(function(user) {
				if(ref.selectedSearchOption === 0) {
					// Filter by forename
					return user.getFirstName().toLowerCase().includes(ref.searchString.toLowerCase());
					
				} else if(ref.selectedSearchOption === 1) {
					// Filter by lastname
					return user.getLastName().toLowerCase().includes(ref.searchString.toLowerCase());

				} else if(ref.selectedSearchOption === 2) {
					// Filter by ID
					if(ref.searchString === '')
						return true;
					
					return user.getID() === parseInt(ref.searchString);

				} else {
					// Don't filter at all
					return true;
				}
			});
		}
	},
	mounted: function() {
		this.onPageChange(1);
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
