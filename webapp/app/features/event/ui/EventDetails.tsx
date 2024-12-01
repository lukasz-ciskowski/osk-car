import { TextLabel, TextLabelContainer, TextLabelValue } from '@/components/ui/textLabel';
import { eventTypesDictionary } from '@/entities/lesson/lib/evenTypes';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale/pl';
import TheoreticalEventDetails from './TheoreticalLessonDetails';
import { EventType } from '@osk-car/models';
import { RetrievedEvent } from '@/entities/lesson/model/event';
import PracticalLessonDetails from './PracticalLessonDetails';

interface Props {
    event: RetrievedEvent;
}

function EventDetails({ event }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <TextLabelContainer>
                <TextLabel>Rodzaj zajęć</TextLabel>
                <TextLabelValue>{eventTypesDictionary[event.type]}</TextLabelValue>
            </TextLabelContainer>
            <div className="flex gap-8">
                <TextLabelContainer>
                    <TextLabel>Data</TextLabel>
                    <TextLabelValue>{format(event.startsAt, 'dd MMMM yyyy', { locale: pl })}</TextLabelValue>
                </TextLabelContainer>
                <TextLabelContainer>
                    <TextLabel>Godzina</TextLabel>
                    <TextLabelValue>{`${format(event.startsAt, 'HH:mm')} - ${format(
                        event.endsAt,
                        'HH:mm',
                    )}`}</TextLabelValue>
                </TextLabelContainer>
            </div>
            <span className="mt-2" />
            {event.type === EventType.Theoretical && <TheoreticalEventDetails event={event} />}
            {event.type === EventType.Practical && <PracticalLessonDetails event={event} />}
        </div>
    );
}
export default EventDetails;
