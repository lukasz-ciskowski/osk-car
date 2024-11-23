import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { appRouter } from './router';
import { roleRepository } from './repositories/RoleRepository';
import { authRepository } from './repositories/AuthRepository';
import { cors } from 'hono/cors';

export interface AppEnv extends Record<string, unknown> {
    DATABASE_URL: string;
    CERBOS_URL: string;
    CLERK_KEY: string;
}
const app = new Hono();

app.use(logger());
app.use(async (c, next) => {
    await roleRepository.connect(c);
    await authRepository.connect(c);
    await next();
});

app.get('/', async (c) => {
    return c.text('Hello Hono!');
});

app.use('/*', cors());
app.use(
    '/trpc/*',
    trpcServer({
        router: appRouter,
        createContext: ({ req }) => {
            const token = req.headers.get('Authorization')?.replace('Bearer ', '');
            return {
                token,
            };
        },
    }),
);

export default app;
