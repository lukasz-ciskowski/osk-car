import { router } from '../../router';
import { getGroups } from './getGroups';

export const setupGroupRouter = () =>
    router({
        getGroups: getGroups(),
    });
