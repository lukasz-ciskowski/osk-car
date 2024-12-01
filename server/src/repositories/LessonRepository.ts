import { prisma } from '../prisma';
import { TheoreticalLessonInput } from '../models/LessonModel';
import { LessonType } from '@osk-car/models';
import { TheoreticalLesson } from '@prisma/client';

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

        return theoreticalLessons.map(this._mapToTheoreticalLesson);
    }

    async findById(id: string) {
        const response = await prisma.theoreticalLesson.findUnique({
            where: {
                id: id,
            },
            include: {
                instructor: true,
                group: true,
                classroom: true,
            },
        });
        if (!response) throw new Error('Not found');
        return this._mapToTheoreticalLesson(response);
    }

    _mapToTheoreticalLesson<T extends TheoreticalLesson>(lesson: T) {
        return {
            ...lesson,
            type: LessonType.Theoretical,
        };
    }
}

export const lessonRepository = new LessonRepository();
