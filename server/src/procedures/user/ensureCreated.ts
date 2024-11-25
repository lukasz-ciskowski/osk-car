import { User } from '@clerk/backend';
import { authProcedure } from '../../router';
import { userService } from '../../services/UserService';
import { TRPCError } from '@trpc/server';

export const ensureCreatedUser = () =>
    authProcedure.mutation((opts) => {
        const id = opts.ctx.clerkId;
        if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' });
        return userService.findOrCreate(id);
    });
