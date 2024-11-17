import { initTRPC } from '@trpc/server';
import { setupUserRouter } from './procedures/user/router';

const t = initTRPC.create();

export const publicProcedure = t.procedure;
export const router = t.router;

export const appRouter = router({
    user: setupUserRouter(),
});

export type AppRouter = typeof appRouter;
