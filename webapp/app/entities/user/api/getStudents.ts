import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

interface Args {
    trpc: TrpcInstance;
}

export function getStudents(args: Args) {
    return args.trpc.user.getStudents.query();
}

export const getStudentsQueryObject = (trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['students'],
        queryFn: () => getStudents({ trpc }),
        staleTime: 1000 * 60 * 5,
    });
