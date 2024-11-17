import { User } from '@prisma/client';
import { UserInput } from '../models/UserModel';
import { prisma } from '../prisma';

class UserRepository {
    async createUser(userInput: UserInput): Promise<User> {
        return await prisma.user.create({
            data: userInput,
        });
    }

    async findUserByUserId(clerkId: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                clerkId: clerkId,
            },
        });
    }
}

export const userRepository = new UserRepository();
