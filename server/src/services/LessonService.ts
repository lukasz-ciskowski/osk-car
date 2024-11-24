import { TheoreticalLessonForm } from '@osk-car/models';
import { lessonRepository } from '../repositories/LessonRepository';

class LessonService {
    async createTheoreticalLesson(lesson: TheoreticalLessonForm) {
        return await lessonRepository.createTheoreticalLesson({
            startsAt: lesson.startsAt,
            endsAt: lesson.endsAt,
            groupId: lesson.groupId,
            classroomId: lesson.classroomId,
        });
    }
}

export const lessonService = new LessonService();
