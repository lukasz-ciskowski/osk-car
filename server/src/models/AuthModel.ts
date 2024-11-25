import { z } from 'zod';
import {
    GroupsModuleSchema,
    InstructorsListModuleSchema,
    ModulesSchema,
    PlannerModuleSchema,
} from '../schemas/AuthSchema';

export type PlannerModule = z.infer<typeof PlannerModuleSchema>;
export type GroupsModule = z.infer<typeof GroupsModuleSchema>;
export type InstructorsListModule = z.infer<typeof InstructorsListModuleSchema>;

export type Modules = z.infer<typeof ModulesSchema>;
