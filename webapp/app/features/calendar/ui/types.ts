import { getAllLessons } from '@/entities/lesson/api/getAllLessons';

export interface EventData {
    id: string;
    lesson: Awaited<ReturnType<typeof getAllLessons>>[number];
    start: Date;
    end: Date;
}
