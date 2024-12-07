import { z } from 'zod';

export const AddStudentSchema = z.object({
    studentId: z.coerce.number(),
});

export type AddStudentForm = z.infer<typeof AddStudentSchema>;
