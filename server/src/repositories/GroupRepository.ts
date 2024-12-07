import { prisma } from '../prisma';

class GroupRepository {
    getGroups() {
        return prisma.group.findMany();
    }
    getGroupById(groupId: number) {
        return prisma.group.findUnique({
            where: {
                id: groupId,
            },
        });
    }
}

export const groupRepository = new GroupRepository();
