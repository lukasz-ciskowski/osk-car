import { TrpcInstance } from '@/lib/trpc';
import { EventType } from '@osk-car/models';
import { queryOptions } from '@tanstack/react-query';
import { RetrievedEvent } from '../model/event';

export function retrieveTheoreticalEvent(eventId: string, trpc: TrpcInstance) {
    return trpc.event.retrieveTheoreticalEvent.query({ eventId });
}

export function retrievePracticalEvent(eventId: string, trpc: TrpcInstance) {
    return trpc.event.retrievePracticalEvent.query({ eventId });
}

export const retrieveEvent = (eventId: string, eventType: EventType, trpc: TrpcInstance) => {
    switch (eventType) {
        case EventType.Practical:
            return retrievePracticalEvent(eventId, trpc);
        case EventType.Theoretical:
            return retrieveTheoreticalEvent(eventId, trpc);
        default:
            throw new Error('Unknown event type');
    }
};

export const retrieveEventQueryObject = (eventId: string, eventType: EventType, trpc: TrpcInstance) =>
    queryOptions<RetrievedEvent>({
        queryKey: ['event', eventId, eventType],
        queryFn: () => retrieveEvent(eventId, eventType, trpc),
    });
