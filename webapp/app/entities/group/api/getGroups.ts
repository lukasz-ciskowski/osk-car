import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

interface GetGroupsQuery {
    startsAt: string;
    endsAt: string;
}

export const getGroupsQueryObject = (q: GetGroupsQuery, trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['groups', q],
        queryFn: () => trpc.groups.getGroups.query(q),
    });
