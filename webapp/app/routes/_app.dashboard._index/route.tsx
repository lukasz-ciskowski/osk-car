import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Dashboard() {
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
