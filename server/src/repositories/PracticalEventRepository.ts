import { prisma } from '../prisma';
import { PracticalEventInput } from '../models/EventModel';
import { PracticalEvent } from '@prisma/client';
import { EventType } from '@osk-car/models';

class PracticalEventRepository {
    async createEvent(event: PracticalEventInput) {
        return await prisma.practicalEvent.create({
            data: event,
        });
    }

    async findAllForInstructor(instructorId: number) {
        const data = await prisma.practicalEvent.findMany({
            where: {
                instructorId,
            },
        });
        return data.map(this._map);
    }

    async findById(id: string) {
        const result = await prisma.practicalEvent.findUnique({
            where: {
                id: id,
            },
            include: {
                instructor: true,
                student: true,
            },
        });
        if (!result) return null;
        return this._map(result);
    }

    _map<T extends PracticalEvent>(event: T): T & { type: EventType.Practical } {
        return {
            ...event,
            type: EventType.Practical,
        };
    }
}

export const practicalEventRepository = new PracticalEventRepository();
