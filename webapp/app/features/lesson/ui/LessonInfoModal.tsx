import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { retrieveLessonQueryObject } from '@/entities/lesson/api/retrieveLesson';
import { trpcClient } from '@/lib/trpcClient';
import { useQuery } from '@tanstack/react-query';
import LessonDetails from './LessonDetails';
import { Spinner } from '@/components/ui/spinner';

interface Props {
    onClose: () => void;
    lessonId: string;
}

function LessonInfoModal({ onClose, lessonId }: Props) {
    const { isLoading, data } = useQuery({
        ...retrieveLessonQueryObject(lessonId, trpcClient),
        staleTime: 1000 * 60 * 30,
    });

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>Informacje o zajęciach</DialogTitle>
                </DialogHeader>
                {isLoading && !data ? (
                    <div className="flex justify-center w-full">
                        <Spinner />
                    </div>
                ) : (
                    <LessonDetails lesson={data!} />
                )}
            </DialogContent>
        </Dialog>
    );
}
export default LessonInfoModal;
