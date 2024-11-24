import { User } from '@prisma/client';
import { Modules, PlannerModule } from '../models/AuthModel';
import { userRepository } from '../repositories/UserRepository';
import { roleRepository } from '../repositories/RoleRepository';

class RoleService {
    private cached_users: Record<string, User> = {};

    async checkRole(clerkId: string, module: Modules) {
        const userCached = !!this.cached_users[clerkId];

        if (!userCached) {
            const user = await userRepository.findUserByClerkId(clerkId);
            if (!user) throw new Error('User not found');
            this.cached_users[clerkId] = user;
        }

        return roleRepository.checkRole(this.cached_users[clerkId], module);
    }
}

export const roleService = new RoleService();
