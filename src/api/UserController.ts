import {IUser, UsercontrollersDTO} from "@/api/interfaces";

export class UserController {
    static async fetchUsers(username: string, page: number): Promise<UsercontrollersDTO> {
        return fetch(`https://api.github.com/search/users?q=${username}&page=${page}`).then(res => res.json());
    }

    static async fetchUserByName(username: string): Promise<IUser> {
        return fetch(`https://api.github.com/users/${username}`).then(res => res.json());
    }
}