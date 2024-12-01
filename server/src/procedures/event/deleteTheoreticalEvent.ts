import { authUserProcedure, createCaller } from '../../router';
import { eventService } from '../../services/EventService';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const schema = z.object({
    eventId: z.string(),
});

export const deleteTheoreticalEvent = () =>
    authUserProcedure.input(schema).mutation(async ({ input, ctx }) => {
        const caller = createCaller(ctx);
        const hasAccess = await caller.role.checkRole({ kind: 'planner', actions: ['write'] });
        if (!hasAccess) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return eventService.deleteTheoreticalEvent(input.eventId);
    });
