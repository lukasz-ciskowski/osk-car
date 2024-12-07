import { authUserProcedure, createCaller } from '../../router';
import { groupService } from '../../services/GroupService';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const getGroupsSchema = z.object({
    startsAt: z.string(),
    endsAt: z.string(),
});

export const getAvailableGroups = () =>
    authUserProcedure.input(getGroupsSchema).query(async ({ input, ctx }) => {
        const caller = createCaller(ctx);
        const hasAccess = await caller.role.checkRole({ kind: 'groups', actions: ['read'] });
        if (!hasAccess) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return groupService.getAvailableGroups(new Date(input.startsAt), new Date(input.endsAt));
    });
