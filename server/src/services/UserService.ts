import { userRepository } from '../repositories/UserRepository';
import { authRepository } from '../repositories/AuthRepository';

class UserService {
    async findOrCreate(clerkId: string) {
        const user = await userRepository.findUserByClerkId(clerkId);
        if (!user) {
            const userInfo = await authRepository.getUser(clerkId);

            return await userRepository.createUser({
                clerkId,
                type: 'Instructor',
                firstName: userInfo.firstName ?? '',
                lastName: userInfo.lastName ?? '',
            });
        }
        return user;
    }

    async findUser(clerkId: string) {
        return await userRepository.findUserByClerkId(clerkId);
    }
}

export const userService = new UserService();
