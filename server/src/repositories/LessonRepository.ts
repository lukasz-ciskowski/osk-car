import { prisma } from '../prisma';
import { TheoreticalLessonInput } from '../models/LessonModel';

class LessonRepository {
    async createTheoreticalLesson(lesson: TheoreticalLessonInput) {
        return await prisma.theoreticalLesson.create({
            data: lesson,
        });
    }
}

export const lessonRepository = new LessonRepository();
