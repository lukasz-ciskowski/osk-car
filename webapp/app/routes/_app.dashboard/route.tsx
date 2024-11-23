import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { trpcServer } from '@/lib/trpc.server';
import { Outlet, useLoaderData, useNavigate, useOutlet } from '@remix-run/react';
import './fullcalendar.css';
import { cn } from '@/lib/utils';
import { getLessonTypesQuery } from '../../entities/lesson/api/getLessonTypes';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { queryClient } from '@/queryClient';
import { Dialog } from '@/components/ui/dialog';

export const loader = async (args: LoaderFunctionArgs) => {
    const server = await trpcServer(args);
    if (!server) return redirect('/sign-in');

    const result = await server.role.checkRole.query({
        kind: 'planner',
        actions: ['write', 'read'],
    });
    await queryClient.prefetchQuery(getLessonTypesQuery(server));

    return {
        role: result,
        dehydratedState: dehydrate(queryClient),
    };
};

function Dashboard() {
    const result = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const inOutlet = !!useOutlet();

    const onClose = () => {
        navigate('/dashboard');
    };

    return (
        <HydrationBoundary state={result.dehydratedState}>
            <div className="p-4">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={'pl'}
                    dateClick={(e) =>
                        navigate({
                            pathname: '/dashboard/add-lesson',
                            search: `?date=${e.dateStr}`,
                        })
                    }
                    headerToolbar={{
                        left: 'title',
                        right: 'prev,next',
                    }}
                    dayCellClassNames={cn('day-cell', result.role.planner?.write ? 'editable' : undefined)}
                />
                <Dialog open onOpenChange={onClose}>
                    <Outlet />
                </Dialog>
            </div>
        </HydrationBoundary>
    );
}
export default Dashboard;
