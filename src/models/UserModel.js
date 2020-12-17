export class UserModel {
    constructor(id, email, firstName, lastName, avatarURL) {
        this._id = id;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._avatarURL = avatarURL;
    }

    getID() {
        return this._id;
    }

    getEmail() {
        return this._email;
    }

    getFirstName() {
        return this._firstName;
    }

    getLastName() {
        return this._lastName;
    }

    getAvatarURL() {
        return this._avatarURL;
    }
}