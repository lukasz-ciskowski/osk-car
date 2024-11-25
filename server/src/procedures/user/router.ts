import { router } from '../../router';
import { ensureCreatedUser } from './ensureCreated';
import { getCurrentUser } from './getCurrentUser';

export const setupUserRouter = () =>
    router({
        ensureCreated: ensureCreatedUser(),
        getCurrentUser: getCurrentUser(),
    });
