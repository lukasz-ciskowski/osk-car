import { TheoreticalLesson } from '@prisma/client';

export type TheoreticalLessonInput = Omit<TheoreticalLesson, 'id'>;
