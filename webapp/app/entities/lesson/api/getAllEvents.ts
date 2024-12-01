import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

export function getAllEventsForInstructor(trpc: TrpcInstance) {
    return trpc.event.getAllEventsForInstructor.query();
}

export const eventForInstructorQueryObject = (trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['eventForInstructor'],
        queryFn: () => getAllEventsForInstructor(trpc),
    });

export function getAllEventsForStudent(trpc: TrpcInstance) {
    return trpc.event.getAllEventsForStudent.query();
}

export const eventForStudentQueryObject = (trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['eventForStudent'],
        queryFn: () => getAllEventsForStudent(trpc),
    });
