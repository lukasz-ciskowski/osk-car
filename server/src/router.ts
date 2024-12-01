import { initTRPC } from '@trpc/server';
import { setupUserRouter } from './procedures/user/router';
import { isAuth } from './middleware/isAuth';
import { setupRoleRouter } from './procedures/role/router';
import { setupEventRouter } from './procedures/event/router';
import { ensureUser } from './middleware/ensureUser';
import { setupGroupRouter } from './procedures/group/router';
import { setupClassroomRouter } from './procedures/classroom/router';
import { User } from '@prisma/client';

export interface TrpcContext {
    token: string | null;
    clerkId: string | null;
    userId: number | null;
    user: User | null;
}

const t = initTRPC.context<TrpcContext>().create();

export const publicProcedure = t.procedure;
export const router = t.router;
export const authProcedure = t.procedure.use(isAuth);
export const authUserProcedure = authProcedure.use(ensureUser);

export const appRouter = router({
    user: setupUserRouter(),
    role: setupRoleRouter(),
    event: setupEventRouter(),
    groups: setupGroupRouter(),
    classrooms: setupClassroomRouter(),
});

export const createCaller = t.createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
