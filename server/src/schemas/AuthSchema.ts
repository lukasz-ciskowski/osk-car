import { z } from 'zod';

export const PlannerModuleSchema = z.object({
    kind: z.literal('planner'),
    actions: z.array(z.union([z.literal('read'), z.literal('write')])),
});

export const GroupsModuleSchema = z.object({
    kind: z.literal('groups'),
    actions: z.array(z.union([z.literal('read'), z.literal('write')])),
});

export const InstructorsListModuleSchema = z.object({
    kind: z.literal('instructors_list'),
    actions: z.array(z.literal('read')),
});

export const ModulesSchema = z.union([PlannerModuleSchema, GroupsModuleSchema, InstructorsListModuleSchema]);
