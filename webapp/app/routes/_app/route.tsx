import { LoaderFunctionArgs, redirect, redirectDocument } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import Header from './header';
import { trpcServer } from '@/lib/trpc.server';
import { SignedIn } from '@clerk/remix';

export function shouldRevalidate() {
    // ensure that the user is created only once
    return false;
}

export const loader = async (args: LoaderFunctionArgs) => {
    const server = await trpcServer(args);
    if (!server) return redirect('/sign-in');

    await server.user.ensureCreated.mutate();

    return { ok: true };
};

function Layout() {
    return (
        <SignedIn>
            <Header />
            <div className="max-w-screen-2xl mx-auto p-2">
                <Outlet />
            </div>
        </SignedIn>
    );
}
export default Layout;
