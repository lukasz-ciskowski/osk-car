import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { contextStorage, getContext } from 'hono/context-storage';
import { logger } from 'hono/logger';
import { appRouter } from './router';
import { authRepository } from './repositories/AuthRepository';

export interface AppEnv extends Record<string, unknown> {
    DATABASE_URL: string;
    AUTHZED_TOKEN: string;
}
const app = new Hono();

app.use(logger());
app.use(async (c, next) => {
    await authRepository.connect(c);
    await next();
});

app.get('/', (c) => {
    // authRepository.check();
    return c.text('Hello Hono!');
});

app.use(
    '/trpc/*',
    trpcServer({
        router: appRouter,
    }),
);

export default app;
