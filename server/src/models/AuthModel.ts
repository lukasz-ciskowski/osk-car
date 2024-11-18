import { z } from 'zod';
import { PlannerModuleSchema } from '../schemas/AuthSchema';

export type PlannerModule = z.infer<typeof PlannerModuleSchema>;

const ModulesSchema = PlannerModuleSchema;

export type Modules = z.infer<typeof ModulesSchema>;
