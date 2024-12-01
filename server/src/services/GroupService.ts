import { groupRepository } from '../repositories/GroupRepository';

class GroupService {
    getAllGroups() {
        return groupRepository.getGroups();
    }
    getAvailableGroups(startsAt: Date, endsAt: Date) {
        return groupRepository.getGroups();
    }
}

export const groupService = new GroupService();
