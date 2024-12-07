import { router } from '../../router';
import { addStudentToGroup } from './addStudentToGroup';
import { getAllGroups } from './getAllGroups';
import { getAvailableGroups } from './getAvailableGroups';
import { getStudentsToApplyToGroup } from './getStudentsToApplyToGroup';
import { retrieveGroupWithStudents } from './retrieveGroupWithStudents';

export const setupGroupRouter = () =>
    router({
        getAllGroups: getAllGroups(),
        getAvailableGroups: getAvailableGroups(),
        retrieveGroupWithStudents: retrieveGroupWithStudents(),
        getStudentsToApplyToGroup: getStudentsToApplyToGroup(),
        addStudentToGroup: addStudentToGroup(),
    });
