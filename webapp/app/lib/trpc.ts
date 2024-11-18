import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src/router';

export const unauthorizedTrpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
        }),
    ],
});

export const authorizedTrpc = (token: string) => {
    return createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: 'http://localhost:3000/trpc',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        ],
    });
};
