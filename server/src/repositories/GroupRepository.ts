import { prisma } from '../prisma';

class GroupRepository {
    getGroups() {
        return prisma.group.findMany();
    }
}

export const groupRepository = new GroupRepository();
