import { TrpcInstance } from '@/lib/trpc';
import { LessonForm, LessonType } from '@osk-car/models';

interface Args {
    trpc: TrpcInstance;
    data: LessonForm;
}

export const createLesson = async ({ trpc, data }: Args) => {
    if (data.type === LessonType.Theoretical) {
        await trpc.lesson.createTheoreticalLesson.mutate(data);
    }
};
