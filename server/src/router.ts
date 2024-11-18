import { initTRPC } from '@trpc/server';
import { setupUserRouter } from './procedures/user/router';
import { isAuth } from './middleware/isAuth';
import { setupRoleRouter } from './procedures/roles/router';

export interface TrpcContext {
    token: string | null;
    clerkId: string | null;
}

const t = initTRPC.context<TrpcContext>().create();

export const publicProcedure = t.procedure;
export const router = t.router;
export const authProcedure = t.procedure.use(isAuth);

export const appRouter = router({
    user: setupUserRouter(),
    role: setupRoleRouter(),
});

export type AppRouter = typeof appRouter;
