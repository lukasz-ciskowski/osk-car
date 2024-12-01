import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { retrieveEventQueryObject } from '@/entities/lesson/api/retrieveEvent';
import { trpcClient } from '@/lib/trpcClient';
import { useQuery } from '@tanstack/react-query';
import EventDetails from './EventDetails';
import { Spinner } from '@/components/ui/spinner';
import { ListEvent } from '@/entities/lesson/model/event';

interface Props {
    onClose: () => void;
    event: ListEvent;
}

function EventInfoModal({ onClose, event }: Props) {
    const { isLoading, data } = useQuery({
        ...retrieveEventQueryObject(event.id, event.type, trpcClient),
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
                    <EventDetails event={data!} />
                )}
            </DialogContent>
        </Dialog>
    );
}
export default EventInfoModal;
