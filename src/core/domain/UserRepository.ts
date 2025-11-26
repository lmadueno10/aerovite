import type { User } from "./User";

export interface UserRepository {
    getUser(id: number): Promise<User>;
}
