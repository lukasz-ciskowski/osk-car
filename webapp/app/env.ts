import { TrpcInstance } from './lib/trpc';

declare module 'react-router' {
    // Your AppLoadContext used in v2
    interface AppLoadContext {
        trpcServer: TrpcInstance;
    }
}

export {}; // necessary for TS to treat this as a module
