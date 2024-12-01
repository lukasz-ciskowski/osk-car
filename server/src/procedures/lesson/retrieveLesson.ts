import { authUserProcedure } from '../../router';
import { lessonService } from '../../services/LessonService';
import { z } from 'zod';

const retrieveInput = z.object({
    lessonId: z.string(),
});

export const retrieveLesson = () =>
    authUserProcedure.input(retrieveInput).query((query) => {
        return lessonService.retrieveLesson(query.input.lessonId);
    });
