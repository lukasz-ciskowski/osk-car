import { createHonoServer } from 'react-router-hono-server/node';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Context } from 'hono';
import { setupTrpc, TrpcInstance } from './lib/trpc';

const unsecuredPaths = ['/sign-in'];

declare module '@remix-run/node' {
    interface AppLoadContext {
        readonly trpcServer: TrpcInstance;
    }
}

class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized');
    }
}

export const server = await createHonoServer({
    configure: (server) => {
        server.use('*', clerkMiddleware());
        server.use('*', async (c, next) => {
            const isUnsecured = unsecuredPaths.some((path) => c.req.path.startsWith(path));
            const auth = getAuth(c);

            // user goes to secured path without being signed in
            if (!isUnsecured && !auth?.userId) throw new UnauthorizedError();

            await next();
        });
        server.onError((err, c): any => {
            if (err instanceof UnauthorizedError) {
                return c.redirect('/sign-in');
            }
            return c.text('Unexpected error', 500);
        });
    },
    async getLoadContext(c) {
        const trpcServerInstance = await _setupTrpcServer(c);
        return {
            trpcServer: trpcServerInstance,
        };
    },
});

const _setupTrpcServer = async (c: Context) => {
    return setupTrpc({ getToken: () => _requestToken(c) });
};

const _requestToken = async (c: Context) => {
    const auth = getAuth(c);
    const token = await auth?.getToken();
    if (!token) throw new UnauthorizedError();

    return token;
};
