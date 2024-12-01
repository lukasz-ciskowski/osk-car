import { Outlet, useLoaderData, useNavigation } from '@remix-run/react';
import Header from './header';
import { SignedIn } from '@clerk/remix';
import { LoaderFunctionArgs } from '@remix-run/node';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useEffect, useRef } from 'react';
import { useWaitForClient } from '@/hooks/useWaitForClient';
import { getCurrentUserQueryObject } from '@/entities/user/api/getCurrentUser';
import { queryClient } from '@/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;

    const [groupsResult, studentsResult, plannerResult] = await Promise.all([
        trpcServer.role.checkRole.query({
            kind: 'groups',
            actions: ['read'],
        }),
        trpcServer.role.checkRole.query({
            kind: 'students_list',
            actions: ['read'],
        }),
        trpcServer.role.checkRole.query({
            kind: 'planner',
            actions: ['write'],
        }),
        await queryClient.prefetchQuery(getCurrentUserQueryObject(trpcServer)),
    ]);

    return {
        role: { groupsResult, plannerResult, studentsResult },
        dehydratedState: dehydrate(queryClient),
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
        <HydrationBoundary state={result.dehydratedState}>
            <SignedIn>
                {isClientReady && <LoadingBar color="#f11946" ref={loadingBar} />}
                <Header
                    canAccessGroups={!!result.role.groupsResult.groups?.read}
                    canAccessStudents={!!result.role.studentsResult.students_list?.read}
                />
                <div className="max-w-screen-2xl mx-auto p-2">
                    <Outlet />
                </div>
            </SignedIn>
        </HydrationBoundary>
    );
}
export default Layout;
