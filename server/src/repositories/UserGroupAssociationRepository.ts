import { prisma } from '../prisma';

type StudentGroupInput = { studentId: number; groupId: number };

class UserGroupAssociationRepository {
    async getUsersByGroupId(groupId: number) {
        return await prisma.userGroupAssociation.findMany({
            where: {
                groupId: groupId,
            },
            select: {
                user: true,
            },
        });
    }
    async getByUserIdAndGroupId({ studentId, groupId }: StudentGroupInput) {
        return await prisma.userGroupAssociation.findFirst({
            where: {
                userId: studentId,
                groupId: groupId,
            },
        });
    }
    async addStudentToGroup({ studentId, groupId }: StudentGroupInput) {
        return await prisma.userGroupAssociation.create({
            data: {
                groupId: groupId,
                userId: studentId,
            },
        });
    }
}

export const userGroupAssociationRepository = new UserGroupAssociationRepository();
