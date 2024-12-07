import { authUserProcedure, createCaller } from '../../router';
import { groupService } from '../../services/GroupService';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { AddStudentSchema } from '@osk-car/models';

const schema = AddStudentSchema.extend({
    groupId: z.number(),
});

export const addStudentToGroup = () =>
    authUserProcedure.input(schema).mutation(async ({ input, ctx }) => {
        const caller = createCaller(ctx);
        const hasAccess = await caller.role.checkRole({ kind: 'groups', actions: ['write'] });
        if (!hasAccess) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return groupService.addStudentToGroup(input.groupId, input.studentId);
    });
