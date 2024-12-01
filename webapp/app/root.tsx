import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { LoaderFunction, MetaFunction } from 'react-router';

import './tailwind.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { plPL } from '@clerk/localizations';
import TrpcProvider from './lib/trpcClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

export const meta: MetaFunction = () => {
    return [{ title: 'OSK-Car' }];
};

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider
                publishableKey={'pk_test_ZW5oYW5jZWQtY29yYWwtNDIuY2xlcmsuYWNjb3VudHMuZGV2JA'}
                afterSignOutUrl="/sign-in"
                localization={plPL}
            >
                <TrpcProvider>
                    <Outlet />
                </TrpcProvider>
            </ClerkProvider>
        </QueryClientProvider>
    );
}
