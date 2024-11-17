import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import './tailwind.css';
import { queryClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { ClerkApp } from '@clerk/remix';
import { plPL } from '@clerk/localizations';

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <style data-fullcalendar />
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

export default ClerkApp(
    function App() {
        return (
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        );
    },
    {
        localization: plPL,
    },
);
