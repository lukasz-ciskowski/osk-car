import { authUserProcedure, createCaller } from '../../router';
import { userService } from '../../services/UserService';
import { TRPCError } from '@trpc/server';

export const getStudents = () =>
    authUserProcedure.query(async (opts) => {
        const caller = createCaller(opts.ctx);
        const hasAccess = await caller.role.checkRole({ kind: 'planner', actions: ['write'] });
        if (!hasAccess) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return userService.getStudents();
    });
