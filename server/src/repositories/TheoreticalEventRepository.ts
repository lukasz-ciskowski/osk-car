import { prisma } from '../prisma';
import { TheoreticalEventInput } from '../models/EventModel';
import { TheoreticalEvent } from '@prisma/client';
import { EventType } from '@osk-car/models';

class TheoreticalEventRepository {
    async createEvent(event: TheoreticalEventInput) {
        return await prisma.theoreticalEvent.create({
            data: event,
        });
    }

    async findAllForInstructor(instructorId: number) {
        const data = await prisma.theoreticalEvent.findMany({
            where: {
                instructorId,
            },
        });
        return data.map(this._map);
    }

    async findById(id: string) {
        const result = await prisma.theoreticalEvent.findUnique({
            where: {
                id: id,
            },
            include: {
                instructor: true,
                group: true,
                classroom: true,
            },
        });
        if (!result) return null;
        return this._map(result);
    }

    _map<T extends TheoreticalEvent>(event: T): T & { type: EventType.Theoretical } {
        return {
            ...event,
            type: EventType.Theoretical,
        };
    }
}

export const theoreticalEventRepository = new TheoreticalEventRepository();
