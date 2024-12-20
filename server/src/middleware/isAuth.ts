import { authRepository } from '../repositories/AuthRepository';
import { TrpcContext } from '../router';
import { TRPCError } from '@trpc/server';

export async function isAuth(opts: { ctx: TrpcContext; next: (opts: { ctx: TrpcContext }) => Promise<any> }) {
    const { ctx } = opts;
    if (!ctx.token) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const clerkUser = await authRepository.validateJWT(ctx.token);
    if (!clerkUser) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const context = {
        token: ctx.token,
        clerkId: clerkUser.userId,
        userId: null,
        user: null,
    };

    return opts.next({
        ctx: context,
    });
}
