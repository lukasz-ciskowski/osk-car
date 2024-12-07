import { authUserProcedure, createCaller } from '../../router';
import { groupService } from '../../services/GroupService';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const getGroupsSchema = z.object({
    groupId: z.number(),
});

export const retrieveGroupWithStudents = () =>
    authUserProcedure.input(getGroupsSchema).query(async ({ input, ctx }) => {
        const caller = createCaller(ctx);
        const hasAccess = await caller.role.checkRole({ kind: 'groups', actions: ['read'] });
        if (!hasAccess) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return groupService.retrieveGroupWithStudents(input.groupId);
    });
