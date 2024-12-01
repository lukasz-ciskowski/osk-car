import { TheoreticalSchema } from '@osk-car/models';
import { authUserProcedure, createCaller } from '../../router';
import { eventService } from '../../services/EventService';
import { TRPCError } from '@trpc/server';

export const createTheoreticalEvent = () =>
    authUserProcedure.input(TheoreticalSchema).mutation(async ({ input, ctx }) => {
        const caller = createCaller(ctx);
        const hasAccess = await caller.role.checkRole({ kind: 'planner', actions: ['write'] });
        if (!hasAccess) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return eventService.createTheoreticalEvent(input);
    });
