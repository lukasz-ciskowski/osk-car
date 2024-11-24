import { z } from 'zod';
import { LessonType } from './models';

const TeorethicalSchema = z.object({
    type: z.literal(LessonType.Teoretical),
    groupId: z.string(),
});

const PracticalSchema = z.object({
    type: z.literal(LessonType.Practical),
    userId: z.string(),
});

const PreDrivingTestSchema = z.object({
    type: z.literal(LessonType.PreDrivingTest),
    userId: z.string(),
});

export const LessonSchema = z.discriminatedUnion('type', [TeorethicalSchema, PracticalSchema, PreDrivingTestSchema]);

export type LessonTypes = z.infer<typeof LessonSchema>['type'];

export type LessonForm = z.infer<typeof LessonSchema>;
