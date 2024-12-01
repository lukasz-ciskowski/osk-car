import { TextLabel, TextLabelContainer, TextLabelValue } from '@/components/ui/textLabel';
import { RetrievedTheoreticalEvent } from '@/entities/lesson/model/event';

interface Props {
    event: RetrievedTheoreticalEvent;
}

function TheoreticalEventDetails({ event }: Props) {
    return (
        <>
            <TextLabelContainer>
                <TextLabel>Sala</TextLabel>
                <TextLabelValue>{event.classroom.name}</TextLabelValue>
            </TextLabelContainer>
            <TextLabelContainer>
                <TextLabel>Grupa</TextLabel>
                <TextLabelValue>{event.group.name}</TextLabelValue>
            </TextLabelContainer>
            <TextLabelContainer>
                <TextLabel>Prowadzący</TextLabel>
                <TextLabelValue>{`${event.instructor.firstName} ${event.instructor.lastName}`}</TextLabelValue>
            </TextLabelContainer>
        </>
    );
}
export default TheoreticalEventDetails;
