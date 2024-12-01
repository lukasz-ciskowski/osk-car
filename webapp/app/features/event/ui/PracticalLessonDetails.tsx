import { TextLabel, TextLabelContainer, TextLabelValue } from '@/components/ui/textLabel';
import { RetrievedPracticalEvent, RetrievedTheoreticalEvent } from '@/entities/event/model/event';

interface Props {
    event: RetrievedPracticalEvent;
}

function PracticalLessonDetails({ event }: Props) {
    return (
        <>
            <TextLabelContainer>
                <TextLabel>Prowadzący</TextLabel>
                <TextLabelValue>{`${event.instructor.firstName} ${event.instructor.lastName}`}</TextLabelValue>
            </TextLabelContainer>
            <TextLabelContainer>
                <TextLabel>Kursant</TextLabel>
                <TextLabelValue>{`${event.student.firstName} ${event.student.lastName}`}</TextLabelValue>
            </TextLabelContainer>
        </>
    );
}
export default PracticalLessonDetails;
