import { z } from 'zod';
import { GroupsModuleSchema, ModulesSchema, PlannerModuleSchema } from '../schemas/AuthSchema';

export type PlannerModule = z.infer<typeof PlannerModuleSchema>;
export type GroupsModule = z.infer<typeof GroupsModuleSchema>;

export type Modules = z.infer<typeof ModulesSchema>;
