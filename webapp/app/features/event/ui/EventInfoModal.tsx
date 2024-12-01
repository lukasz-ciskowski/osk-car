import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { retrieveEventQueryObject } from '@/entities/event/api/retrieveEvent';
import { trpcClient } from '@/lib/trpcClient';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import EventDetails from './EventDetails';
import { Spinner } from '@/components/ui/spinner';
import { ListEvent } from '@/entities/event/model/event';
import { Button } from '@/components/ui/button';
import { deleteEvent } from '@/entities/event/api/deleteEvent';
import { eventsQueryObject } from '@/entities/event/api/getAllEvents';
import { getCurrentUserQueryObject } from '@/entities/user/api/getCurrentUser';

interface Props {
    onClose: () => void;
    event: ListEvent;
    canDelete: boolean;
}

function EventInfoModal({ onClose, event, canDelete }: Props) {
    const { isLoading, data } = useQuery({
        ...retrieveEventQueryObject(event.id, event.type, trpcClient),
        staleTime: 1000 * 60 * 30,
    });
    const client = useQueryClient();
    const currentUser = useSuspenseQuery(getCurrentUserQueryObject(trpcClient)).data;

    const { mutate, isPending } = useMutation({
        mutationFn: deleteEvent,
    });

    const handleDelete = () => {
        mutate(
            {
                trpc: trpcClient,
                eventId: event.id,
                type: event.type,
            },
            {
                onSuccess: () => {
                    onClose();
                    client.invalidateQueries({
                        queryKey: eventsQueryObject(trpcClient, currentUser).queryKey,
                    });
                },
            },
        );
    };

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
                    <EventDetails event={data!} />
                )}
                {canDelete && (
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleDelete} isLoading={isPending}>
                            Usuń
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
export default EventInfoModal;
