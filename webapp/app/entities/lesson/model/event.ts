import { getAllEventsForInstructor, getAllEventsForStudent } from '../api/getAllEvents';
import { retrievePracticalEvent, retrieveTheoreticalEvent } from '../api/retrieveEvent';

export type RetrievedPracticalEvent = Awaited<ReturnType<typeof retrievePracticalEvent>>;
export type RetrievedTheoreticalEvent = Awaited<ReturnType<typeof retrieveTheoreticalEvent>>;
export type RetrievedEvent = RetrievedPracticalEvent | RetrievedTheoreticalEvent;

export type InstructorEvent = Awaited<ReturnType<typeof getAllEventsForInstructor>>[number];
export type StudentEvent = Awaited<ReturnType<typeof getAllEventsForStudent>>[number];
export type ListEvent = InstructorEvent | StudentEvent;
