import { PropsWithChildren, useMemo } from 'react';
import { useAuth } from '@clerk/remix';
import { createTRPCProxyClient } from '@trpc/client';
import { AppRouter } from '../../../server/src/router';
import { setupTrpc, TrpcInstance } from './trpc';

// @ts-ignore
export let trpcClient: TrpcInstance = null;

function TrpcProvider({ children }: PropsWithChildren) {
    const { getToken } = useAuth();

    useMemo(() => {
        trpcClient = setupTrpc({ getToken });
    }, []);

    return <>{children}</>;
}
export default TrpcProvider;
