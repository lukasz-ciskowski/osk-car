import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigate, useOutlet } from '@remix-run/react';
import './fullcalendar.css';
import { cn } from '@/lib/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { queryClient } from '@/queryClient';
import { Dialog } from '@/components/ui/dialog';

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;

    const result = await trpcServer.role.checkRole.query({
        kind: 'planner',
        actions: ['write', 'read'],
    });

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
            <Dialog open={inOutlet} onOpenChange={onClose}>
                <Outlet />
            </Dialog>
        </div>
    );
}
export default Dashboard;
