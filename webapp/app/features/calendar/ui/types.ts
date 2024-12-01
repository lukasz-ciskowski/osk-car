import { getAllEventsForInstructor } from '@/entities/lesson/api/getAllEvents';

export interface EventData {
    id: string;
    event: Awaited<ReturnType<typeof getAllEventsForInstructor>>[number];
    start: Date;
    end: Date;
}
