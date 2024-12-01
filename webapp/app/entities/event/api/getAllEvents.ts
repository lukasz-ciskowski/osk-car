import { User } from '@/entities/user/model/user';
import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

export function getAllEventsForInstructor(trpc: TrpcInstance) {
    return trpc.event.getAllEventsForInstructor.query();
}

export function getAllEventsForStudent(trpc: TrpcInstance) {
    return trpc.event.getAllEventsForStudent.query();
}

export const eventsQueryObject = (trpc: TrpcInstance, user: User) =>
    queryOptions({
        queryKey: ['events'],
        queryFn: () => {
            if (user.type === 'Instructor') {
                return getAllEventsForInstructor(trpc);
            }
            if (user.type === 'Student') {
                return getAllEventsForStudent(trpc);
            }

            return [];
        },
    });
