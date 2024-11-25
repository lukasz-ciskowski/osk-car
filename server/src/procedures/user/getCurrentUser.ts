import { authProcedure, authUserProcedure, createCaller } from '../../router';
import { userService } from '../../services/UserService';
import { TRPCError } from '@trpc/server';

export const getCurrentUser = () =>
    authUserProcedure.query((opts) => {
        const clerkId = opts.ctx.clerkId;
        if (!clerkId) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return userService.findUser(clerkId);
    });
