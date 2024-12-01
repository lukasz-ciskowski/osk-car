import { router } from '../../router';
import { getClassrooms } from './getClassrooms';

export const setupClassroomRouter = () =>
    router({
        getClassrooms: getClassrooms(),
    });
