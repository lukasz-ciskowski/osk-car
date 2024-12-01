import { userRepository } from '../repositories/UserRepository';
import { authRepository } from '../repositories/AuthRepository';
import { User } from '@prisma/client';

class UserService {
    private cached_users: Record<string, User> = {};

    async findOrCreate(clerkId: string) {
        const user = this.cached_users[clerkId] ?? (await userRepository.findUserByClerkId(clerkId));
        if (!user) {
            const userInfo = await authRepository.getClerkUserContext(clerkId);

            const newUser = await userRepository.createUser({
                clerkId,
                type: 'Student',
                firstName: userInfo.firstName ?? '',
                lastName: userInfo.lastName ?? '',
            });

            this.cached_users[clerkId] = newUser;
            return newUser;
        }
        return user;
    }

    async findUserById(id: number) {
        return await userRepository.findUserById(id);
    }

    async getStudents() {
        return await userRepository.getStudents();
    }
}

export const userService = new UserService();
