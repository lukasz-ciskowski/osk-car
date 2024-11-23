import { z } from 'zod';

export const lessonSchema = z.object({
    type: z.string(),
});

export type LessonFormState = z.infer<typeof lessonSchema>;
