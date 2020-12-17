import { UserModel } from '../models/UserModel';


export class UserService {
    constructor() {
        this._baseURL = 'https://reqres.in/api/users';
    }

    get(page = 1) {
        const requestURL = this._baseURL + '?page=' + page.toString();
        const request = new Request(requestURL);
        const promise = fetch(request)
            .then(function(response) {
                if(response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Oops! Something went wrong while fetching the users!');
                }
            })
            .then(function(data) {
                return new UserServiceResponse(data);
            });

        return promise;
    }
}

export class UserServiceResponse {
    constructor(data) {
        this._page = data.page;
        this._usersPerPage = data.per_page;
        this._totalUsers = data.total;
        this._totalPages = data.total_pages;
        this._users = this._retrieveUsers(data);
    }

    getPage() {
        return this._page;
    }

    getUsersPerPage() {
        return this._usersPerPage;
    }

    getTotalUsers() {
        return this._totalUsers;
    }

    getTotalPages() {
        return this._totalPages;
    }

    getUsers() {
        return this._users;
    }

    _retrieveUsers(data) {
        return data.data.map(user => {
            return new UserModel(
                user.id,
                user.email,
                user.first_name,
                user.last_name,
                user.avatar
            );
        });
    }
}