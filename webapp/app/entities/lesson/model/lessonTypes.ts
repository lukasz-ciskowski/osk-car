import { trpcClient } from '@/lib/trpcClient';

export type LessonTypesResponse = Awaited<ReturnType<typeof trpcClient.lesson.getLessonTypes.query>>;
