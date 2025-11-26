import type { User } from "@/core/domain/User";
import type { UserRepository } from "@/core/domain/UserRepository";

export class GetUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: number): Promise<User> {
        return this.userRepository.getUser(id);
    }
}
