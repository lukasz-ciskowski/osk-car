import { User } from '@prisma/client';
import { createCaller, TrpcContext } from '../router';

export const ensureUser = async (opts: { ctx: TrpcContext; next: (opts: { ctx: TrpcContext }) => Promise<any> }) => {
    const { ctx } = opts;

    const caller = createCaller(ctx);
    const user: User = await caller.user.ensureCreated();
    const userId = Number(user.id);

    return opts.next({
        ctx: {
            ...ctx,
            user,
            userId,
        } as TrpcContext,
    });
};
