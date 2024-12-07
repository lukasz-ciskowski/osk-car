import { authUserProcedure, createCaller } from '../../router';
import { groupService } from '../../services/GroupService';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const schema = z.object({
    groupId: z.number(),
});

export const getStudentsToApplyToGroup = () =>
    authUserProcedure.input(schema).query(async ({ input, ctx }) => {
        const caller = createCaller(ctx);
        const hasAccess = await caller.role.checkRole({ kind: 'students_list', actions: ['read'] });
        if (!hasAccess) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return groupService.getStudentsToApplyToGroup(input.groupId);
    });
