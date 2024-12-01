import { User } from '@prisma/client';
import { Modules } from '../models/AuthModel';
import { roleRepository } from '../repositories/RoleRepository';

class RoleService {
    async checkRole(user: User, module: Modules) {
        return roleRepository.checkRole(user, module);
    }
}

export const roleService = new RoleService();
