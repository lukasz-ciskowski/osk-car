import { EventProps } from 'react-big-calendar';
import { EventData } from './types';
import { eventTypesDictionary } from '@/entities/event/lib/evenTypes';
import { format } from 'date-fns';

interface Props extends EventProps<EventData> {}

function CustomEvent({ event, ...rest }: Props) {
    if (!('slotStart' in rest && 'slotEnd' in rest)) {
        // shows weekly view
        return <span>{eventTypesDictionary[event.event.type]}</span>;
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <small className="text-xs">{`${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}`}</small>
            </div>
            <span>{eventTypesDictionary[event.event.type]}</span>
        </div>
    );
}

export default CustomEvent;
