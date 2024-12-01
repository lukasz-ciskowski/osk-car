import { router } from '../../router';
import { ensureCreatedUser } from './ensureCreated';
import { getCurrentUser } from './getCurrentUser';
import { getStudents } from './getStudents';

export const setupUserRouter = () =>
    router({
        ensureCreated: ensureCreatedUser(),
        getCurrentUser: getCurrentUser(),
        getStudents: getStudents(),
    });
