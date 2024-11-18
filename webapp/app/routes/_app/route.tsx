import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import Header from './header';
import { authorizedTrpc } from '@/lib/trpc';
import { getAuthToken } from '@/actions/token';
import { SignedIn } from '@clerk/remix';

export const loader = async (args: LoaderFunctionArgs) => {
    const token = await getAuthToken(args);
    await authorizedTrpc(token).user.ensureCreated.mutate();

    return {};
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
