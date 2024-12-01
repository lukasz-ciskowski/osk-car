import { router } from '../../router';
import { createTheoreticalLesson } from './createTheoreticalLesson';
import { getAllLessons } from './getAllLessons';
import { retrieveLesson } from './retrieveLesson';

export const setupLessonRouter = () =>
    router({
        createTheoreticalLesson: createTheoreticalLesson(),
        getAllLessons: getAllLessons(),
        retrieveLesson: retrieveLesson(),
    });
