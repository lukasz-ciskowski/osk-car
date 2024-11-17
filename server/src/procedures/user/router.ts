import { router } from '../../router';
import { ensureCreatedUser } from './ensureCreated';

export const setupUserRouter = () =>
    router({
        ensureCreated: ensureCreatedUser(),
    });
