import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { format, setHours } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import LessonForm from '@/features/lesson/ui/LessonForm';
import { LessonSchema, LessonForm as LessonFormState } from '@osk-car/models';
import { getCurrentUser } from '@/entities/user/api/getCurrentUser';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLesson } from '@/entities/lesson/api/createLesson';
import { trpcClient } from '@/lib/trpcClient';
import { FormProvider } from '@/components/ui/form';
import { SelectedDateSlot } from '../model/lessonModal';
import { lessonsQueryObject } from '@/entities/lesson/api/getAllLessons';

const resolver = zodResolver(LessonSchema);

interface Props {
    dates: SelectedDateSlot;
    currentUser: Awaited<ReturnType<typeof getCurrentUser>>;
    canSeeInstructorsList: boolean;
    onClose: () => void;
}

function AddLessonModal({ dates, currentUser, canSeeInstructorsList, onClose }: Props) {
    const { mutate, isPending } = useMutation({
        mutationFn: createLesson,
    });
    const queryClient = useQueryClient();

    const startsAt = useMemo(() => {
        if ('startDate' in dates) return dates.startDate;
        if ('equal' in dates) return setHours(dates.equal, 16);
        return setHours(new Date(), 16);
    }, []);

    const endsAt = useMemo(() => {
        if ('endDate' in dates) return dates.startDate;
        if ('equal' in dates) return setHours(dates.equal, 17);
        return setHours(new Date(), 17);
    }, []);

    const formMethods = useForm<LessonFormState>({
        resolver,
        defaultValues: {
            startsAt,
            endsAt,
            instructorId: currentUser?.id ?? 0,
        },
    });

    const handleAddNewLesson = (data: LessonFormState) => {
        mutate(
            {
                data,
                trpc: trpcClient,
            },
            {
                onSuccess: () => {
                    queryClient.refetchQueries({
                        queryKey: lessonsQueryObject(trpcClient).queryKey,
                    });
                    onClose();
                },
            },
        );
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>Dodaj zajęcia</DialogTitle>
                    <DialogDescription>{format(startsAt, "'Nowe zajęcia na dzień ' dd.MM.yyyy")}</DialogDescription>
                </DialogHeader>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(handleAddNewLesson)}>
                        <LessonForm canSeeInstructorsList={canSeeInstructorsList} currentUser={currentUser} />
                        <DialogFooter className="mt-4">
                            <Button className="btn" type="submit" isLoading={isPending}>
                                Dodaj
                            </Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
export default AddLessonModal;
