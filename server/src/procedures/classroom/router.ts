import { router } from '../../router';
import { getClassrooms } from './getClassRooms';

export const setupClassroomRouter = () =>
    router({
        getClassrooms: getClassrooms(),
    });
