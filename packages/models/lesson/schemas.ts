import { z } from 'zod';
import { LessonType } from './models';

const BaseLessonSchema = z.object({
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
});

export const TheoreticalSchema = BaseLessonSchema.extend({
    type: z.literal(LessonType.Theoretical),
    classroomId: z.coerce.number(),
    groupId: z.coerce.number(),
});

export const PracticalSchema = BaseLessonSchema.extend({
    type: z.literal(LessonType.Practical),
    userId: z.coerce.string(),
});

export const PreDrivingTestSchema = BaseLessonSchema.extend({
    type: z.literal(LessonType.PreDrivingTest),
    userId: z.coerce.string(),
});

export const LessonSchema = z.discriminatedUnion('type', [TheoreticalSchema, PracticalSchema, PreDrivingTestSchema]);

export type LessonTypes = z.infer<typeof LessonSchema>['type'];

export type TheoreticalLessonForm = z.infer<typeof TheoreticalSchema>;
export type PracticalLessonForm = z.infer<typeof PracticalSchema>;
export type PreDrivingTestLessonForm = z.infer<typeof PreDrivingTestSchema>;
export type LessonForm = z.infer<typeof LessonSchema>;
