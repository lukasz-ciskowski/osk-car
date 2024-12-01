import { User } from '@prisma/client';
import { roleRepository } from '../repositories/RoleRepository';
import { Modules } from '@osk-car/models';

class RoleService {
    async checkRole(user: User, module: Modules) {
        return roleRepository.checkRole(user, module);
    }
}

export const roleService = new RoleService();
