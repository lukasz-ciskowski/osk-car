import { TrpcInstance } from '@/lib/trpc';
import { EventForm, EventType, PracticalEventForm, TheoreticalEventForm } from '@osk-car/models';

interface TheoreticalArgs {
    trpc: TrpcInstance;
    data: TheoreticalEventForm;
}

const createTheoreticalEvent = async ({ trpc, data }: TheoreticalArgs) => {
    await trpc.event.createTheoreticalEvent.mutate(data);
};

interface PracticalArgs {
    trpc: TrpcInstance;
    data: PracticalEventForm;
}

const createPracticalEvent = async ({ trpc, data }: PracticalArgs) => {
    await trpc.event.createPracticalEvent.mutate(data);
};

export const createEvent = async ({ trpc, data }: { trpc: TrpcInstance; data: EventForm }) => {
    if (data.type === EventType.Theoretical) {
        await createTheoreticalEvent({ trpc, data: data as TheoreticalEventForm });
    } else {
        await createPracticalEvent({ trpc, data: data as PracticalEventForm });
    }
};
