import { prisma } from '../prisma';

class ClassroomRepository {
    getClassrooms() {
        return prisma.classroom.findMany();
    }
}

export const classroomRepository = new ClassroomRepository();
