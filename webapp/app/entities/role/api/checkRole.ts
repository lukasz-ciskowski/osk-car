import { TrpcInstance } from '@/lib/trpc';
import { Modules } from '@osk-car/models';
import { queryOptions } from '@tanstack/react-query';

interface Args {
    trpc: TrpcInstance;
    query: Modules;
}

export function checkRole(args: Args) {
    return args.trpc.role.checkRole.query(args.query);
}

export function checkRoleQueryObject(args: Args) {
    return queryOptions({
        queryKey: ['role', args.query],
        queryFn: () => checkRole(args),
    });
}
