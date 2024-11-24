import { Outlet, useLoaderData } from '@remix-run/react';
import Header from './header';
import { SignedIn } from '@clerk/remix';
import { LoaderFunctionArgs } from '@remix-run/node';

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;

    const result = await trpcServer.role.checkRole.query({
        kind: 'groups',
        actions: ['write', 'read'],
    });

    return {
        role: result,
    };
};

function Layout() {
    const result = useLoaderData<typeof loader>();
    console.log('🚀 ~ Layout ~ result:', result);

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
