import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

interface Args {
    trpc: TrpcInstance;
}

export function getCurrentUser(args: Args) {
    return args.trpc.user.getCurrentUser.query();
}

export const getCurrentUserQueryObject = (trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['user'],
        queryFn: () => getCurrentUser({ trpc }),
        staleTime: Infinity,
    });
