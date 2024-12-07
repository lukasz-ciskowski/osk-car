import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

export const retrieveGroupWithStudentsQueryObject = (id: number, trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['group', id],
        queryFn: () => trpc.groups.retrieveGroupWithStudents.query({ groupId: id }),
    });
