import { authUserProcedure } from '../../router';
import { TRPCError } from '@trpc/server';
import { eventService } from '../../services/EventService';

export const getAllEventsForStudent = () =>
    authUserProcedure.query((query) => {
        const user = query.ctx.user;
        if (user?.type !== 'Student') throw new TRPCError({ code: 'UNAUTHORIZED' });
        return eventService.getAllEventsForStudent(user.id);
    });
