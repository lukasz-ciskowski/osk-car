import { authProcedure } from '../../router';
import { PlannerModuleSchema } from '../../schemas/AuthSchema';
import { roleService } from '../../services/RoleService';
import { TRPCError } from '@trpc/server';

export const checkRole = () =>
    authProcedure.input(PlannerModuleSchema).query((opts) => {
        const id = opts.ctx.clerkId;
        if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' });

        const module = opts.input;
        return roleService.checkRole(id, module);
    });
