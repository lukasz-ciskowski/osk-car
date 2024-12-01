import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

export function getAllLessons(trpc: TrpcInstance) {
    return trpc.lesson.getAllLessons.query();
}

export const lessonsQueryObject = (trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['lessons'],
        queryFn: () => getAllLessons(trpc),
    });
