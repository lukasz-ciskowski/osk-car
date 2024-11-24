import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../server/src/router';

interface Args {
    getToken: () => Promise<string>;
}

export const setupTrpc = ({ getToken }: Args) => {
    return createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: 'http://localhost:3000/trpc',
                async headers() {
                    const token = await getToken();
                    return {
                        authorization: token,
                    };
                },
            }),
        ],
    });
};

export type TrpcInstance = ReturnType<typeof setupTrpc>;
