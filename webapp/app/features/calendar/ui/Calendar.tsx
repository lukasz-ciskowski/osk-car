import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { Calendar as ReactCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { pl } from 'date-fns/locale/pl';
import { getAllLessons, lessonsQueryObject } from '@/entities/lesson/api/getAllLessons';
import CustomToolbar from './CustomToolbar';
import { SelectedDateSlot } from '@/features/lesson/model/lessonModal';
import { useWaitForClient } from '@/hooks/useWaitForClient';
import { useSuspenseQuery } from '@tanstack/react-query';
import { trpcClient } from '@/lib/trpcClient';
import FullscreenSpinner from '@/components/ui/fullscreenSpinner';
import CustomEvent from './CustomEvent';

interface Props {
    onSelectedDateSlot: (date: SelectedDateSlot) => void;
    onSelectedEvent: (id: string) => void;
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
    const { data: lessons, fetchStatus } = useSuspenseQuery(lessonsQueryObject(trpcClient));

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
                events={lessons.map((lesson) => ({
                    id: lesson.id,
                    lesson,
                    start: new Date(lesson.startsAt),
                    end: new Date(lesson.endsAt),
                }))}
                onSelectEvent={(event) => {
                    onSelectedEvent(event.id);
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
