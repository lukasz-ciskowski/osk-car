import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunction } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';
import Header from './header';
import { trpcServer } from '@/lib/trpc';

export const loader: LoaderFunction = async (args) => {
    const { userId } = await getAuth(args);
    if (!userId) {
        return redirect('/sign-in');
    }

    await trpcServer.user.ensureCreated.mutate({ userId });

    return {};
};

function Layout() {
    return (
        <>
            <Header />
            <div className="max-w-screen-2xl mx-auto p-2">
                <Outlet />
            </div>
        </>
    );
}
export default Layout;
