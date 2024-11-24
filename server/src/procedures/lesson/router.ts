import { router } from '../../router';
import { createTheoreticalLesson } from './createTheoreticalLesson';

export const setupLessonRouter = () =>
    router({
        createTheoreticalLesson: createTheoreticalLesson(),
    });
