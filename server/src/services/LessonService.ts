import { TheoreticalLessonForm } from '@osk-car/models';
import { lessonRepository } from '../repositories/LessonRepository';
import { userRepository } from '../repositories/UserRepository';

class LessonService {
    async createTheoreticalLesson(lesson: TheoreticalLessonForm) {
        return await lessonRepository.createTheoreticalLesson({
            startsAt: lesson.startsAt,
            endsAt: lesson.endsAt,
            groupId: lesson.groupId,
            classroomId: lesson.classroomId,
            instructorId: lesson.instructorId,
        });
    }

    async getAllLessons(userId: number) {
        const user = await userRepository.findUserById(userId);
        if (user?.type === 'Instructor') {
            return await lessonRepository.findAllLessonsForInstructor(userId);
        }
        return [];
    }

    async retrieveLesson(lessonId: string) {
        return await lessonRepository.findById(lessonId);
    }
}

export const lessonService = new LessonService();
