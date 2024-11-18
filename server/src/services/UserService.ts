import { userRepository } from '../repositories/UserRepository';

class UserService {
    async findOrCreate(clerkId: string) {
        const user = await userRepository.findUserByClerkId(clerkId);
        if (!user) return await userRepository.createUser({ clerkId, type: 'Student' });

        return user;
    }
}

export const userService = new UserService();
