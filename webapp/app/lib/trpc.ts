import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../server/src/router';
import { SessionExpiryError } from '@/errors/SessionExpiryError';

interface Args {
    getToken: () => Promise<string | null>;
}

export const setupTrpc = ({ getToken }: Args) => {
    return createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: 'http://localhost:3000/trpc',
                async headers() {
                    const token = await getToken();
                    if (!token) throw new SessionExpiryError();
                    return {
                        authorization: token,
                    };
                },
            }),
        ],
    });
};

export type TrpcInstance = ReturnType<typeof setupTrpc>;
