import { TextLabel, TextLabelContainer, TextLabelValue } from '@/components/ui/textLabel';
import { retrieveLesson } from '@/entities/lesson/api/retrieveLesson';
import { lessonTypesDictionary } from '@/entities/lesson/lib/lessonTypes';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale/pl';
import TheoreticalLessonDetails from './TheoreticalLessonDetails';

interface Props {
    lesson: Awaited<ReturnType<typeof retrieveLesson>>;
}

function LessonDetails({ lesson }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <TextLabelContainer>
                <TextLabel>Rodzaj zajęć</TextLabel>
                <TextLabelValue>{lessonTypesDictionary[lesson.type]}</TextLabelValue>
            </TextLabelContainer>
            <div className="flex gap-8">
                <TextLabelContainer>
                    <TextLabel>Data</TextLabel>
                    <TextLabelValue>{format(lesson.startsAt, 'dd MMMM yyyy', { locale: pl })}</TextLabelValue>
                </TextLabelContainer>
                <TextLabelContainer>
                    <TextLabel>Godzina</TextLabel>
                    <TextLabelValue>{`${format(lesson.startsAt, 'HH:mm')} - ${format(
                        lesson.endsAt,
                        'HH:mm',
                    )}`}</TextLabelValue>
                </TextLabelContainer>
            </div>
            <span className="mt-2" />
            <TheoreticalLessonDetails lesson={lesson} />
        </div>
    );
}
export default LessonDetails;
