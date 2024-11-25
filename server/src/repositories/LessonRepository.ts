import { prisma } from '../prisma';
import { TheoreticalLessonInput } from '../models/LessonModel';
import { LessonType } from '@osk-car/models';

class LessonRepository {
    async createTheoreticalLesson(lesson: TheoreticalLessonInput) {
        return await prisma.theoreticalLesson.create({
            data: lesson,
        });
    }

    async findAllLessonsForInstructor(instructorId: number) {
        const theoreticalLessons = await prisma.theoreticalLesson.findMany({
            where: {
                instructorId,
            },
        });

        return theoreticalLessons.map((lesson) => ({
            ...lesson,
            type: LessonType.Theoretical,
        }));
    }
}

export const lessonRepository = new LessonRepository();
