import { router } from '../../router';
import { checkRole } from './checkRole';

export const setupRoleRouter = () =>
    router({
        checkRole: checkRole(),
    });
