import { router } from '../../router';
import { getLessonTypes } from './getLessonTypes';

export const setupLessonRouter = () =>
    router({
        getLessonTypes: getLessonTypes(),
    });
