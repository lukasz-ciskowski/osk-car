import { useNavigate } from '@remix-run/react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { lessonTypesDictionaryShort } from '@/entities/lesson/lib/lessonTypes';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { Calendar as ReactCalendar, dateFnsLocalizer, Views, ToolbarProps } from 'react-big-calendar';
import { pl } from 'date-fns/locale/pl';
import { useWaitForClient } from '@/hooks/useWaitForClient';
import { getAllLessons } from '@/entities/lesson/api/getAllLessons';
import CustomToolbar from './CustomToolbar';
import { ComponentType } from 'react';

interface Props {
    lessons: Awaited<ReturnType<typeof getAllLessons>>;
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

function Calendar({ lessons, canWriteLessons }: Props) {
    const isClientReady = useWaitForClient();
    const navigate = useNavigate();

    if (!isClientReady) return <></>;

    return (
        <ReactCalendar
            localizer={localizer}
            culture="pl"
            defaultDate={new Date()}
            scrollToTime={new Date()}
            style={{ height: 800 }}
            events={lessons.map((lesson) => ({
                id: lesson.id,
                title: lessonTypesDictionaryShort[lesson.type],
                start: new Date(lesson.startsAt),
                end: new Date(lesson.endsAt),
            }))}
            onSelectEvent={(event) => {
                navigate(`/calendar/edit-lesson/${event.id}`);
            }}
            onSelectSlot={(slotInfo) => {
                navigate({
                    pathname: '/calendar/add-lesson',
                    search: `?date=${slotInfo.start}`,
                });
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
            }}
        />
    );
}
export default Calendar;
