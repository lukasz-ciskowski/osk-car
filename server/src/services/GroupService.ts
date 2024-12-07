import { groupRepository } from '../repositories/GroupRepository';
import { userGroupAssociationRepository } from '../repositories/UserGroupAssociationRepository';
import { userRepository } from '../repositories/UserRepository';

class GroupService {
    getAllGroups() {
        return groupRepository.getGroups();
    }
    getAvailableGroups(startsAt: Date, endsAt: Date) {
        return groupRepository.getGroups();
    }
    async retrieveGroupWithStudents(groupId: number) {
        const group = await groupRepository.getGroupById(groupId);
        if (!group) throw new Error('Group not found');

        const usersGroup = await userGroupAssociationRepository.getUsersByGroupId(groupId);
        return {
            group,
            students: usersGroup.map((userGroup) => userGroup.user),
        };
    }
    async getStudentsToApplyToGroup(groupId: number) {
        const students = await userRepository.getStudents();
        const alreadyInGroup = await userGroupAssociationRepository.getUsersByGroupId(groupId);

        const _ids = alreadyInGroup.map((userGroup) => userGroup.user.id);
        return students.filter((user) => !_ids.includes(user.id));
    }
    async addStudentToGroup(groupId: number, studentId: number) {
        const alreadyInGroup = await userGroupAssociationRepository.getByUserIdAndGroupId({ studentId, groupId });
        if (alreadyInGroup) throw new Error('User is already in group');

        return await userGroupAssociationRepository.addStudentToGroup({ studentId, groupId });
    }
}

export const groupService = new GroupService();
