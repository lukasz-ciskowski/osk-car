import { z } from 'zod';

export const PlannerModuleSchema = z.object({
    kind: z.literal('planner'),
    actions: z.array(z.literal('write')),
});

export const GroupsModuleSchema = z.object({
    kind: z.literal('groups'),
    actions: z.array(z.union([z.literal('read'), z.literal('write')])),
});

export const StudentsListModuleSchema = z.object({
    kind: z.literal('students_list'),
    actions: z.array(z.literal('read')),
});

export const ModulesSchema = z.union([PlannerModuleSchema, GroupsModuleSchema, StudentsListModuleSchema]);
