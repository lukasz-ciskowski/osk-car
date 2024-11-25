import { UserInput } from '../models/UserModel';
import { prisma } from '../prisma';

class UserRepository {
    async createUser(userInput: UserInput) {
        return await prisma.user.create({
            data: userInput,
        });
    }

    async findUserByClerkId(clerkId: string) {
        return await prisma.user.findUnique({
            where: {
                clerkId: clerkId,
            },
        });
    }

    async findUserById(id: number) {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }
}

export const userRepository = new UserRepository();
