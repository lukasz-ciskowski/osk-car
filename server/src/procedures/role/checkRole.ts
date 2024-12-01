import { ModulesSchema } from '@osk-car/models';
import { authUserProcedure } from '../../router';
import { roleService } from '../../services/RoleService';
import { TRPCError } from '@trpc/server';

export const checkRole = () =>
    authUserProcedure.input(ModulesSchema).query((opts) => {
        const user = opts.ctx.user;
        if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

        const module = opts.input;
        return roleService.checkRole(user, module);
    });
