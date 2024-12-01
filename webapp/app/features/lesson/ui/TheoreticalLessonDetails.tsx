import { TextLabel, TextLabelContainer, TextLabelValue } from '@/components/ui/textLabel';
import { retrieveLesson } from '@/entities/lesson/api/retrieveLesson';

interface Props {
    lesson: Awaited<ReturnType<typeof retrieveLesson>>;
}

function TheoreticalLessonDetails({ lesson }: Props) {
    return (
        <>
            <TextLabelContainer>
                <TextLabel>Sala</TextLabel>
                <TextLabelValue>{lesson.classroom.name}</TextLabelValue>
            </TextLabelContainer>
            <TextLabelContainer>
                <TextLabel>Grupa</TextLabel>
                <TextLabelValue>{lesson.group.name}</TextLabelValue>
            </TextLabelContainer>
            <TextLabelContainer>
                <TextLabel>Prowadzący</TextLabel>
                <TextLabelValue>{`${lesson.instructor.firstName} ${lesson.instructor.lastName}`}</TextLabelValue>
            </TextLabelContainer>
        </>
    );
}
export default TheoreticalLessonDetails;
