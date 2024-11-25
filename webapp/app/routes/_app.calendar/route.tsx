import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigate, useNavigation, useOutlet } from '@remix-run/react';
import { Dialog } from '@/components/ui/dialog';
import FullscreenSpinner from '@/components/ui/fullscreenSpinner';
import { getAllLessons } from '@/entities/lesson/api/getAllLessons';
import Calendar from '@/features/calendar/ui/Calendar';
import { Button } from '@/components/ui/button';

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;

    const roleResult = await trpcServer.role.checkRole.query({
        kind: 'planner',
        actions: ['write', 'read'],
    });

    const userLessons = await getAllLessons(trpcServer);

    return {
        role: roleResult,
        userLessons,
    };
};

export const meta: MetaFunction = () => {
    return [{ title: 'Kalendarz | OSK-Car' }];
};

function Dashboard() {
    const result = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const inOutlet = !!useOutlet();

    const onClose = () => {
        navigate('/calendar');
    };

    return (
        <div className="p-4">
            <Calendar lessons={result.userLessons} canWriteLessons={!!result.role.planner?.write} />
            <Dialog open={inOutlet} onOpenChange={onClose}>
                <Outlet />
            </Dialog>
        </div>
    );
}
export default Dashboard;
