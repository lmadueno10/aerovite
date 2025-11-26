import axios from "axios";
import type { User } from "../types/user";

export const userService = {
    async getUser(id: number): Promise<User> {
        const response = await axios.get<User>(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        return response.data;
    },
};
