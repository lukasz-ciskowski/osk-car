import { authUserProcedure } from '../../router';
import { TRPCError } from '@trpc/server';

export const getCurrentUser = () =>
    authUserProcedure.query((opts) => {
        const user = opts.ctx.user;
        if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });
        return user;
    });
