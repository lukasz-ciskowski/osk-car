import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAllLessons, lessonsQueryObject } from '@/entities/lesson/api/getAllLessons';
import Calendar from '@/features/calendar/ui/Calendar';
import { getCurrentUser } from '@/entities/user/api/getCurrentUser';
import { SelectedDateSlot } from '@/features/lesson/model/lessonModal';
import { useState } from 'react';
import AddLessonModal from '@/features/lesson/ui/AddLessonModal';
import { queryClient } from '@/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import LessonInfoModal from '@/features/lesson/ui/LessonInfoModal';

export const loader = async (args: LoaderFunctionArgs) => {
    const trpcServer = args.context.trpcServer;

    const [plannerRole, instructorsListRole, currentUser] = await Promise.all([
        trpcServer.role.checkRole.query({
            kind: 'planner',
            actions: ['write', 'read'],
        }),
        trpcServer.role.checkRole.query({
            kind: 'instructors_list',
            actions: ['read'],
        }),
        getCurrentUser(args),
        await queryClient.prefetchQuery(lessonsQueryObject(trpcServer)),
    ]);

    return {
        role: {
            plannerRole: plannerRole,
            instructorsListRole: instructorsListRole,
        },
        currentUser,
        dehydratedState: dehydrate(queryClient),
    };
};

export const meta: MetaFunction = () => {
    return [{ title: 'Kalendarz | OSK-Car' }];
};

function Dashboard() {
    const result = useLoaderData<typeof loader>();
    const [selectedDateSlot, setSelectedDateSlot] = useState<SelectedDateSlot | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

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
            <HydrationBoundary state={result.dehydratedState}>
                <Calendar
                    canWriteLessons={!!result.role.plannerRole.planner?.write && !shouldDelayReopenModal}
                    onSelectedDateSlot={setSelectedDateSlot}
                    onSelectedEvent={setSelectedEvent}
                />
                {selectedDateSlot && (
                    <AddLessonModal
                        dates={selectedDateSlot}
                        currentUser={result.currentUser}
                        canSeeInstructorsList={!!result.role.instructorsListRole.instructors_list?.read}
                        onClose={handleCloseSlot}
                    />
                )}

                {selectedEvent && <LessonInfoModal lessonId={selectedEvent} onClose={handleCloseEvent} />}
            </HydrationBoundary>
        </div>
    );
}
export default Dashboard;
