import { CourseType } from '@prisma/client';
import { authProcedure } from '../../router';

export const getLessonTypes = () =>
    authProcedure.query(() => {
        return [CourseType.Teoretical, CourseType.Practical, CourseType.PreDrivingTest];
    });
