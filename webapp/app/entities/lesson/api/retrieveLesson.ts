import { TrpcInstance } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

export function retrieveLesson(lessonId: string, trpc: TrpcInstance) {
    return trpc.lesson.retrieveLesson.query({ lessonId });
}

export const retrieveLessonQueryObject = (lessonId: string, trpc: TrpcInstance) =>
    queryOptions({
        queryKey: ['lesson', lessonId],
        queryFn: () => retrieveLesson(lessonId, trpc),
    });
