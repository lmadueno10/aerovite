import axios from "axios";
import type { User } from "@/core/domain/User";
import type { UserRepository } from "@/core/domain/UserRepository";

export class UserApiRepository implements UserRepository {
    async getUser(id: number): Promise<User> {
        const response = await axios.get<User>(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        return response.data;
    }
}
