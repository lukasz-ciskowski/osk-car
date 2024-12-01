import { authUserProcedure } from '../../router';
import { TRPCError } from '@trpc/server';
import { eventService } from '../../services/EventService';

export const getAllEventsForInstructor = () =>
    authUserProcedure.query(async (query) => {
        const user = query.ctx.user;
        if (user?.type !== 'Instructor') throw new TRPCError({ code: 'UNAUTHORIZED' });

        return eventService.getAllEventsForInstructor(user.id);
    });
