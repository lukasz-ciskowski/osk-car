import { TheoreticalSchema } from '@osk-car/models';
import { authUserProcedure } from '../../router';
import { lessonService } from '../../services/LessonService';

export const createTheoreticalLesson = () =>
    authUserProcedure.input(TheoreticalSchema).mutation(({ input }) => {
        return lessonService.createTheoreticalLesson(input);
    });
