import { router } from '../../router';
import { createTheoreticalLesson } from './createTheoreticalLesson';
import { getAllLessons } from './getAllLessons';

export const setupLessonRouter = () =>
    router({
        createTheoreticalLesson: createTheoreticalLesson(),
        getAllLessons: getAllLessons(),
    });
