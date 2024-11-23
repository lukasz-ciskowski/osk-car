import { TrpcInstance } from '@/lib/trpc';
import { isServer, queryOptions } from '@tanstack/react-query';

export const getLessonTypesQuery = (trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['lessonTypes'],
        queryFn: () => trpc.lesson.getLessonTypes.query(),
    });
