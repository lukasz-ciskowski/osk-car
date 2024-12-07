import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

export const getAllGroupsQueryObject = (trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['groups'],
        queryFn: () => trpc.groups.getAllGroups.query(),
    });
