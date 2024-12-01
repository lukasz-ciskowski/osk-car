import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { Calendar as ReactCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { pl } from 'date-fns/locale/pl';
import CustomToolbar from './CustomToolbar';
import { SelectedDateSlot } from '@/features/event/model/slot';
import { useWaitForClient } from '@/hooks/useWaitForClient';
import { useSuspenseQuery } from '@tanstack/react-query';
import { trpcClient } from '@/lib/trpcClient';
import FullscreenSpinner from '@/components/ui/fullscreenSpinner';
import CustomEvent from './CustomEvent';
import { ListEvent } from '@/entities/event/model/event';
import { eventsQueryObject } from '@/entities/event/api/getAllEvents';
import { getCurrentUser, getCurrentUserQueryObject } from '@/entities/user/api/getCurrentUser';

interface Props {
    onSelectedDateSlot: (date: SelectedDateSlot) => void;
    onSelectedEvent: (event: ListEvent) => void;
    canWriteLessons: boolean;
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {
        pl,
    },
});

function Calendar({ canWriteLessons, onSelectedDateSlot, onSelectedEvent }: Props) {
    const isClientReady = useWaitForClient();
    const { data: user } = useSuspenseQuery(getCurrentUserQueryObject(trpcClient));
    const { data: events, fetchStatus } = useSuspenseQuery(eventsQueryObject(trpcClient, user));

    if (!isClientReady) return null;

    return (
        <>
            {fetchStatus === 'fetching' && <FullscreenSpinner />}
            <ReactCalendar
                localizer={localizer}
                culture="pl"
                defaultDate={new Date()}
                scrollToTime={new Date()}
                style={{ height: 1200 }}
                events={events.map((event) => ({
                    id: event.id,
                    event,
                    start: new Date(event.startsAt),
                    end: new Date(event.endsAt),
                }))}
                onSelectEvent={(selected) => {
                    onSelectedEvent(selected.event);
                }}
                onSelectSlot={(slotInfo) => {
                    if (!canWriteLessons) return;
                    if (slotInfo.end.getHours() !== slotInfo.start.getHours()) {
                        onSelectedDateSlot({
                            startDate: slotInfo.start,
                            endDate: slotInfo.start,
                        });
                    } else {
                        onSelectedDateSlot({
                            equal: slotInfo.start,
                        });
                    }
                }}
                views={[Views.WEEK, Views.MONTH]}
                selectable={canWriteLessons}
                messages={{
                    month: 'Miesiąc',
                    week: 'Tydzień',
                    showMore: (total) => `+${total} więcej`,
                }}
                components={{
                    toolbar: CustomToolbar,
                    event: CustomEvent,
                }}
            />
        </>
    );
}
export default Calendar;
