import { groupRepository } from '../repositories/GroupRepository';

class GroupService {
    getAvailableGroups(startsAt: Date, endsAt: Date) {
        return groupRepository.getGroups();
    }
}

export const groupService = new GroupService();
