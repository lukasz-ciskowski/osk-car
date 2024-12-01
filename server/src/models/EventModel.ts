import { PracticalEvent, TheoreticalEvent } from '@prisma/client';

export type TheoreticalEventInput = Omit<TheoreticalEvent, 'id'>;
export type PracticalEventInput = Omit<PracticalEvent, 'id'>;
