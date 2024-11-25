import { TrpcInstance } from '@/lib/trpc';

export function getAllLessons(trpc: TrpcInstance) {
    return trpc.lesson.getAllLessons.query();
}
