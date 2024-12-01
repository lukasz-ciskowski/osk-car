import { authProcedure, authUserProcedure, createCaller } from '../../router';
import { userService } from '../../services/UserService';
import { TRPCError } from '@trpc/server';

export const getCurrentUser = () =>
    authUserProcedure.query((opts) => {
        const userId = opts.ctx.userId;
        if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return userService.findUserById(userId);
    });
