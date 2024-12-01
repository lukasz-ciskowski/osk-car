import { MetaFunction } from 'react-router';
import { eventForInstructorQueryObject } from '@/entities/lesson/api/getAllEvents';
import Calendar from '@/features/calendar/ui/Calendar';
import { SelectedDateSlot } from '@/features/event/model/slot';
import { useState } from 'react';
import AddEventModal from '@/features/event/ui/AddEventModal';
import { queryClient } from '@/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import EventInfoModal from '@/features/event/ui/EventInfoModal';
import { ListEvent } from '@/entities/lesson/model/event';
import { Route } from '../calendar/+types/route';

export const loader = async (args: Route.LoaderArgs) => {
    const trpcServer = args.context.trpcServer;

    const [plannerRole] = await Promise.all([
        trpcServer.role.checkRole.query({
            kind: 'planner',
            actions: ['write'],
        }),
        await queryClient.prefetchQuery(eventForInstructorQueryObject(trpcServer)),
    ]);

    return {
        role: {
            plannerRole: plannerRole,
        },
        dehydratedState: dehydrate(queryClient),
    };
};

export const meta: MetaFunction = () => {
    return [{ title: 'Kalendarz | OSK-Car' }];
};

function Dashboard({ loaderData }: Route.ComponentProps) {
    const [selectedDateSlot, setSelectedDateSlot] = useState<SelectedDateSlot | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<ListEvent | null>(null);

    const [shouldDelayReopenModal, setShouldDelayReopenModal] = useState<boolean>(false);

    const handleDelayReopenModal = (cb: () => void) => {
        setShouldDelayReopenModal(true);
        cb();
        // due to weird behavior of triggering onSelectSlot event after closing modal
        setTimeout(() => {
            setShouldDelayReopenModal(false);
        }, 300);
    };

    const handleCloseSlot = () => {
        handleDelayReopenModal(() => setSelectedDateSlot(null));
    };
    const handleCloseEvent = () => {
        handleDelayReopenModal(() => setSelectedEvent(null));
    };

    return (
        <div className="p-4" id="calendar-wrapper">
            <HydrationBoundary state={loaderData.dehydratedState}>
                <Calendar
                    canWriteLessons={!!loaderData.role.plannerRole.planner?.write && !shouldDelayReopenModal}
                    onSelectedDateSlot={setSelectedDateSlot}
                    onSelectedEvent={setSelectedEvent}
                />
                {selectedDateSlot && <AddEventModal dates={selectedDateSlot} onClose={handleCloseSlot} />}
                {selectedEvent && <EventInfoModal event={selectedEvent} onClose={handleCloseEvent} />}
            </HydrationBoundary>
        </div>
    );
}
export default Dashboard;
