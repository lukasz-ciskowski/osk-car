import { z } from 'zod';
import {
    GroupsModuleSchema,
    StudentsListModuleSchema,
    ModulesSchema,
    PlannerModuleSchema,
} from '../schemas/AuthSchema';

export type PlannerModule = z.infer<typeof PlannerModuleSchema>;
export type GroupsModule = z.infer<typeof GroupsModuleSchema>;
export type InstructorsListModule = z.infer<typeof StudentsListModuleSchema>;

export type Modules = z.infer<typeof ModulesSchema>;
