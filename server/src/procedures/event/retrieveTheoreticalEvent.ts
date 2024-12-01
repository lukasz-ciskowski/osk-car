import { authUserProcedure } from '../../router';
import { eventService } from '../../services/EventService';
import { z } from 'zod';

const retrieveInput = z.object({
    eventId: z.string(),
});

export const retrieveTheoreticalEvent = () =>
    authUserProcedure.input(retrieveInput).query((query) => {
        return eventService.retrieveTheoreticalEvent(query.input.eventId);
    });
