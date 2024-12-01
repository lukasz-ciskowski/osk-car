import { EventProps } from 'react-big-calendar';
import { EventData } from './types';
import { lessonTypesDictionary } from '@/entities/lesson/lib/lessonTypes';
import { format } from 'date-fns';

interface Props extends EventProps<EventData> {}

function CustomEvent({ event, ...rest }: Props) {
    if (!('slotStart' in rest && 'slotEnd' in rest)) {
        // shows weekly view
        return <span>{lessonTypesDictionary[event.lesson.type]}</span>;
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <small className="text-xs">{`${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}`}</small>
            </div>
            <span>{lessonTypesDictionary[event.lesson.type]}</span>
        </div>
    );
}

export default CustomEvent;
