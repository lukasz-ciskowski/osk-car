import { LessonTypesResponse } from '../model/lessonTypes';

export const lessonTypesDictionary: Record<LessonTypesResponse[number], string> = {
    Teoretical: 'Zajęcia teoretyczne',
    Practical: 'Zajęcia praktyczne',
    PreDrivingTest: 'Zajęcia przed egzaminem praktycznym',
};
