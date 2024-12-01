import { getAllEventsForInstructor } from '@/entities/event/api/getAllEvents';

export interface EventData {
    id: string;
    event: Awaited<ReturnType<typeof getAllEventsForInstructor>>[number];
    start: Date;
    end: Date;
}
