import { authUserProcedure } from '../../router';
import { TRPCError } from '@trpc/server';
import { lessonService } from '../../services/LessonService';

export const getAllLessons = () =>
    authUserProcedure.query((query) => {
        const userId = query.ctx.userId;
        if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
        return lessonService.getAllLessons(userId);
    });
