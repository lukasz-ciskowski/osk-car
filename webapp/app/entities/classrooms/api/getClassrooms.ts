import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

interface GetClassroomsQuery {
    startsAt: string;
    endsAt: string;
}

export const getClassroomsQueryObject = (q: GetClassroomsQuery, trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['classrooms', q],
        queryFn: () => trpc.classrooms.getClassrooms.query(q),
    });
