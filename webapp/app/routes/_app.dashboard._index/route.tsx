import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LoaderFunctionArgs } from '@remix-run/node';
import { getAuthToken } from '@/actions/token';
import { authorizedTrpc } from '@/lib/trpc';
import { useLoaderData } from '@remix-run/react';

export const loader = async (args: LoaderFunctionArgs) => {
    const token = await getAuthToken(args);

    const result = await authorizedTrpc(token).role.checkRole.query({
        kind: 'planner',
        actions: ['write', 'read'],
    });

    return result;
};

function Dashboard() {
    const result = useLoaderData<typeof loader>();
    console.log('🚀 ~ Dashboard ~ result:', result);

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale={'pl'}
                headerToolbar={{
                    left: 'title',
                    right: 'prev,next',
                }}
            />
        </>
    );
}
export default Dashboard;
