import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { pl } from 'date-fns/locale/pl';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { ToolbarProps, View } from 'react-big-calendar';
import { EventData } from './types';

export default function CustomToolbar({
    localizer: { messages },
    onNavigate,
    onView,
    view,
    views,
    date,
}: ToolbarProps<EventData>) {
    const startWeek = startOfWeek(date, { locale: pl });
    const endWeek = endOfWeek(date, { locale: pl });

    return (
        <div className="flex justify-between mb-2 items-center">
            <div className="flex gap-1">
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => onNavigate('PREV')}
                    aria-label={messages.previous}
                >
                    &lt;
                </Button>
                <Button variant="outline" type="button" onClick={() => onNavigate('TODAY')} aria-label={messages.today}>
                    Dziś
                </Button>
                <Button variant="outline" type="button" onClick={() => onNavigate('NEXT')} aria-label={messages.next}>
                    &gt;
                </Button>
            </div>

            <span className="capitalize text-xl font-semibold">
                {view === 'month'
                    ? format(date, 'LLLL yyyy', { locale: pl })
                    : `${format(startWeek, 'dd MMM', { locale: pl })} - ${format(endWeek, 'dd MMM', { locale: pl })}`}
            </span>
            <div className="flex gap-2">
                {Object.values(views).map((name: View) => (
                    <Button
                        key={name}
                        onClick={() => onView(name)}
                        variant="outline"
                        className={cn(view === name ? 'border-primary border-2' : '')}
                    >
                        {messages[name]}
                    </Button>
                ))}
            </div>
        </div>
    );
}
