import { publicProcedure } from '../../router';
import * as z from 'zod';
import { userService } from '../../services/UserService';

const ensureCreatedInput = z.object({
    userId: z.string(),
});

export type EnsureCreatedInput = z.infer<typeof ensureCreatedInput>;

export const ensureCreatedUser = () =>
    publicProcedure.input(ensureCreatedInput).mutation((query) => {
        return userService.findOrCreate(query.input.userId);
    });
