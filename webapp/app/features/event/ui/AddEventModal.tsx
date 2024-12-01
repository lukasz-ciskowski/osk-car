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
import EventFormContent from '@/features/event/ui/EventFormContent';
import { getCurrentUserQueryObject } from '@/entities/user/api/getCurrentUser';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createEvent } from '@/entities/lesson/api/createEvent';
import { trpcClient } from '@/lib/trpcClient';
import { FormProvider } from '@/components/ui/form';
import { SelectedDateSlot } from '../model/slot';
import { eventForInstructorQueryObject } from '@/entities/lesson/api/getAllEvents';
import { EventForm, EventSchema } from '@osk-car/models';

const resolver = zodResolver(EventSchema);

interface Props {
    dates: SelectedDateSlot;
    onClose: () => void;
}

function AddEventModal({ dates, onClose }: Props) {
    const { mutate, isPending } = useMutation({
        mutationFn: createEvent,
    });
    const queryClient = useQueryClient();
    const currentUser = useSuspenseQuery(getCurrentUserQueryObject(trpcClient)).data;

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

    const formMethods = useForm<EventForm>({
        resolver,
        defaultValues: {
            startsAt,
            endsAt,
            instructorId: currentUser?.id ?? 0,
        },
    });

    const handleAddEvent = (data: EventForm) => {
        mutate(
            {
                data,
                trpc: trpcClient,
            },
            {
                onSuccess: () => {
                    queryClient.refetchQueries({
                        queryKey: eventForInstructorQueryObject(trpcClient).queryKey,
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
                    <form onSubmit={formMethods.handleSubmit(handleAddEvent)}>
                        <EventFormContent currentUser={currentUser} />
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
export default AddEventModal;
