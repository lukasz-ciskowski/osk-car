import { authUserProcedure } from '../../router';
import { classroomService } from '../../services/ClassroomService';
import { z } from 'zod';

const getClassroomsSchema = z.object({
    startsAt: z.string(),
    endsAt: z.string(),
});

export const getClassrooms = () =>
    authUserProcedure.input(getClassroomsSchema).query(({ input }) => {
        return classroomService.getAvailableClassrooms(new Date(input.startsAt), new Date(input.endsAt));
    });
