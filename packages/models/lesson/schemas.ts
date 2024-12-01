import { z } from 'zod';
import { EventType } from './models';

const BaseEventSchema = z.object({
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
    instructorId: z.coerce.number(),
});

export const TheoreticalSchema = BaseEventSchema.extend({
    type: z.literal(EventType.Theoretical),
    classroomId: z.coerce.number(),
    groupId: z.coerce.number(),
});

export const PracticalSchema = BaseEventSchema.extend({
    type: z.literal(EventType.Practical),
    studentId: z.coerce.number(),
});

export const EventSchema = z.discriminatedUnion('type', [TheoreticalSchema, PracticalSchema]);

export type EventTypes = z.infer<typeof EventSchema>['type'];

export type TheoreticalEventForm = z.infer<typeof TheoreticalSchema>;
export type PracticalEventForm = z.infer<typeof PracticalSchema>;
export type EventForm = z.infer<typeof EventSchema>;
