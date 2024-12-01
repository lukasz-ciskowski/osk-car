import { classroomRepository } from '../repositories/ClassroomRepository';

class ClassroomService {
    async getAllClassrooms() {
        return await classroomRepository.getClassrooms();
    }
    async getAvailableClassrooms(startDate: Date, endDate: Date) {
        return await classroomRepository.getClassrooms();
    }
}

export const classroomService = new ClassroomService();
