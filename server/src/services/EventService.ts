import { theoreticalEventRepository } from '../repositories/TheoreticalEventRepository';
import { practicalEventRepository } from '../repositories/PracticalEventRepository';
import { PracticalEventForm, TheoreticalEventForm } from '@osk-car/models';

class EventService {
    async createTheoreticalEvent(event: TheoreticalEventForm) {
        return await theoreticalEventRepository.createEvent({
            startsAt: event.startsAt,
            endsAt: event.endsAt,
            groupId: event.groupId,
            classroomId: event.classroomId,
            instructorId: event.instructorId,
        });
    }

    async createPracticalEvent(event: PracticalEventForm) {
        return await practicalEventRepository.createEvent({
            startsAt: event.startsAt,
            endsAt: event.endsAt,
            instructorId: event.instructorId,
            studentId: event.studentId,
        });
    }

    async getAllEventsForStudent(userId: number) {
        const result = await Promise.all([
            theoreticalEventRepository.findAllForStudent(userId),
            practicalEventRepository.findAllForStudent(userId),
        ]);
        return result.flat();
    }

    async getAllEventsForInstructor(instructorId: number) {
        const result = await Promise.all([
            theoreticalEventRepository.findAllForInstructor(instructorId),
            practicalEventRepository.findAllForInstructor(instructorId),
        ]);
        return result.flat();
    }

    async retrieveTheoreticalEvent(eventId: string) {
        const result = await theoreticalEventRepository.findById(eventId);
        if (!result) throw new Error('Event not found');
        return result;
    }

    async retrievePracticalEvent(eventId: string) {
        const result = await practicalEventRepository.findById(eventId);
        if (!result) throw new Error('Event not found');
        return result;
    }

    async deleteTheoreticalEvent(eventId: string) {
        return await theoreticalEventRepository.deleteById(eventId);
    }

    async deletePracticalEvent(eventId: string) {
        return await practicalEventRepository.deleteById(eventId);
    }
}

export const eventService = new EventService();
