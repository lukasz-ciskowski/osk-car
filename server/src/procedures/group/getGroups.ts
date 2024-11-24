import { authUserProcedure } from '../../router';
import { groupService } from '../../services/GroupService';
import { z } from 'zod';

const getGroupsSchema = z.object({
    startsAt: z.string(),
    endsAt: z.string(),
});

export const getGroups = () =>
    authUserProcedure.input(getGroupsSchema).query(({ input }) => {
        return groupService.getAvailableGroups(new Date(input.startsAt), new Date(input.endsAt));
    });
