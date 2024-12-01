import { authUserProcedure } from '../../router';
import { eventService } from '../../services/EventService';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const retrieveInput = z.object({
    eventId: z.string(),
});

export const retrievePracticalEvent = () =>
    authUserProcedure.input(retrieveInput).query(async (query) => {
        const event = await eventService.retrievePracticalEvent(query.input.eventId);
        if (event.instructorId !== query.ctx.user?.id && event.studentId !== query.ctx.user?.id)
            throw new TRPCError({ code: 'UNAUTHORIZED' });

        return event;
    });
