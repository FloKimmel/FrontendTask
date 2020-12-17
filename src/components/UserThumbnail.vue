<template>
	<b-card :title="name" :img-src="avatarURL" img-alt="Card image" img-left>
		<b-card-text>
			<b>E-mail:</b> {{ email }}
			<br>
			<b>ID:</b> {{ id }}
		</b-card-text>
	</b-card>
</template>

<script>
import {UserModel} from '../models/UserModel';

export default {
	name: 'UserThumbnail',
	props: {
		userModel: {
			type: UserModel,
			default: function() {
				return new UserModel(-1, 'example@mail.com', 'forname', 'lastname', 'avatar');
			}
		}
	},
	data: function() {
		return {
			id: this.userModel.getID(),
			email: this.userModel.getEmail(),
			firstName: this.userModel.getFirstName(),
			lastName: this.userModel.getLastName(),
			avatarURL: this.userModel.getAvatarURL()
		}
	},
	computed: {
		name: function() {
			return this.firstName + ' ' + this.lastName;
		}
	}
}
</script>


<style scoped>

</style>
