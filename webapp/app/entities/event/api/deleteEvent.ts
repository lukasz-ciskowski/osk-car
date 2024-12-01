import { TrpcInstance } from '@/lib/trpc';
import { EventType } from '@osk-car/models';

interface Args {
    trpc: TrpcInstance;
    eventId: string;
}

const deleteTheoreticalEvent = async ({ trpc, eventId }: Args) => {
    await trpc.event.deleteTheoreticalEvent.mutate({ eventId });
};

const deletePracticalEvent = async ({ trpc, eventId }: Args) => {
    await trpc.event.deletePracticalEvent.mutate({ eventId });
};

export const deleteEvent = async ({
    trpc,
    eventId,
    type,
}: Args & {
    type: EventType;
}) => {
    if (type === EventType.Theoretical) {
        await deleteTheoreticalEvent({ trpc, eventId });
    } else {
        await deletePracticalEvent({ trpc, eventId });
    }
};
