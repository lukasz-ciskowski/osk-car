import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigate, useNavigation, useOutlet } from '@remix-run/react';
import './fullcalendar.css';
import { cn } from '@/lib/utils';
import { Dialog } from '@/components/ui/dialog';
import FullscreenSpinner from '@/components/ui/fullscreenSpinner';

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;

    const result = await trpcServer.role.checkRole.query({
        kind: 'planner',
        actions: ['write', 'read'],
    });

    return {
        role: result,
    };
};

export function shouldRevalidate() {
    // ensure that the user is created only once
    return false;
}

function Dashboard() {
    const result = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const inOutlet = !!useOutlet();

    const navigation = useNavigation();

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
                    result.role.planner?.write &&
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
            {navigation.state === 'loading' && !inOutlet && <FullscreenSpinner />}
            <Dialog open={inOutlet} onOpenChange={onClose}>
                <Outlet />
            </Dialog>
        </div>
    );
}
export default Dashboard;
