import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import Header from './header';
import { SignedIn } from '@clerk/remix';

export function shouldRevalidate() {
    // ensure that the user is created only once
    return false;
}

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;
    await trpcServer.user.ensureCreated.mutate();

    return {};
};

function Layout() {
    const result = useLoaderData<typeof loader>();
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
