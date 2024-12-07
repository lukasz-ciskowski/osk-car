import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

export const getStudentsToApplyToGroup = (groupId: number, trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['studentsForGroup', groupId],
        queryFn: () => trpc.groups.getStudentsToApplyToGroup.query({ groupId }),
    });
