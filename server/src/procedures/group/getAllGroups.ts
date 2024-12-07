import { authUserProcedure, createCaller } from '../../router';
import { groupService } from '../../services/GroupService';
import { TRPCError } from '@trpc/server';

export const getAllGroups = () =>
    authUserProcedure.query(async (opts) => {
        const caller = createCaller(opts.ctx);
        const hasAccess = await caller.role.checkRole({ kind: 'groups', actions: ['read'] });
        if (!hasAccess) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return groupService.getAllGroups();
    });
