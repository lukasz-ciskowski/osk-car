import { LessonType } from '@osk-car/models';

export const lessonTypesDictionary: Record<LessonType, string> = {
    Theoretical: 'Zajęcia teoretyczne',
    Practical: 'Zajęcia praktyczne',
    PreDrivingTest: 'Zajęcia przed egzaminem praktycznym',
};

export const lessonTypesDictionaryShort: Record<LessonType, string> = {
    Theoretical: 'Teoria',
    Practical: 'Praktyka',
    PreDrivingTest: 'Przed egzaminem',
};
