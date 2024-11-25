import { Outlet, useLoaderData, useNavigation } from '@remix-run/react';
import Header from './header';
import { SignedIn } from '@clerk/remix';
import { LoaderFunctionArgs } from '@remix-run/node';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useEffect, useRef } from 'react';
import { useWaitForClient } from '@/hooks/useWaitForClient';

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;

    const groupsResult = await trpcServer.role.checkRole.query({
        kind: 'groups',
        actions: ['read'],
    });
    const plannerResult = await trpcServer.role.checkRole.query({
        kind: 'planner',
        actions: ['read'],
    });

    return {
        role: { groupsResult, plannerResult },
    };
};

export function shouldRevalidate() {
    return false;
}

function Layout() {
    const result = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const loadingBar = useRef<LoadingBarRef>(null);
    const isClientReady = useWaitForClient();

    useEffect(() => {
        if (navigation.state === 'loading') {
            loadingBar.current?.staticStart();
        } else {
            loadingBar.current?.complete();
        }
    }, [loadingBar, navigation]);

    return (
        <SignedIn>
            {isClientReady && <LoadingBar color="#f11946" ref={loadingBar} />}
            <Header
                canAccessCalendar={!!result.role.plannerResult.planner?.read}
                canAccessGroups={!!result.role.groupsResult.groups?.read}
            />
            <div className="max-w-screen-2xl mx-auto p-2">
                <Outlet />
            </div>
        </SignedIn>
    );
}
export default Layout;
