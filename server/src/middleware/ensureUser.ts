import { createCaller, TrpcContext } from '../router';

export const ensureUser = async (opts: { ctx: TrpcContext; next: (opts: { ctx: TrpcContext }) => Promise<any> }) => {
    const { ctx } = opts;

    const caller = createCaller(ctx);
    await caller.user.ensureCreated();

    return opts.next({
        ctx: ctx,
    });
};
