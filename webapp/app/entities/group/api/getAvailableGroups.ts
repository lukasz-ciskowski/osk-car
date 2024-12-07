import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

interface GetGroupsQuery {
    startsAt: string;
    endsAt: string;
}

export const getAvailableGroupsQueryObject = (q: GetGroupsQuery, trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['available-groups', q],
        queryFn: () => trpc.groups.getAvailableGroups.query(q),
    });
